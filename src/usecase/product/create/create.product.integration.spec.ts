import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Test create product use case", () => {
    let sequelize: Sequelize

    beforeEach(async() => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        });

        await sequelize.addModels([ProductModel])
        await sequelize.sync();
    });

    afterEach(async() => {
        await sequelize.close();
    });

    it("should create a product", async() => {
        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        const product = new Product("123", "Product A", 45.36);
        await productRepository.create(product)

        const input = {
          name: "Propduct A",
          type: "a",
          price: 45.36,
        };

        const result = await usecase.execute(input)
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name)
        expect(result.price).toBe(input.price);
    }) 
})