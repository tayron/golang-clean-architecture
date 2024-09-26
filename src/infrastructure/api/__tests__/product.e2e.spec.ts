import request from "supertest";
import { app, sequelize } from "../express";



describe("E2E test for customer", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true})
    });

    afterAll(async () => {
        await sequelize.close()
    })

    it("should create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                type: "a",
                name: "Product A",
                price: 15.02
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product A");
        expect(response.body.price).toBe(15.02);
    })

    it ("should not create a customer", async () => {
        const response = await request(app).post("/customer").send({
            name: "Product A"
        })

        expect(response.status).toBe(500);
    })

    it ("should list all product", async () => {
        const response1 = await request(app).post("/product").send({
          type: "a",
          name: "Product A",
          price: 15.02,
        });

        expect(response1.status).toBe(200);

        const response2 = await request(app).post("/product").send({
          type: "b",
          name: "Product B",
          price: 35.66,
        });

        expect(response2.status).toBe(200);        

        const listResponse = await request(app).get("/product").send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);

        const product1 = listResponse.body.products[0];
        expect(product1.name).toBe("Product A")
        expect(product1.price).toBe(15.02);
       
        const product2 = listResponse.body.products[1];
        expect(product2.name).toBe("Product B");
        expect(product2.price).toBe(71.32);
    })
})