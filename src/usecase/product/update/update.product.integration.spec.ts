import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";
import Product from "../../../domain/product/entity/product";

describe("Teste update product use case", () => {
    let sequelize: Sequelize

    beforeEach(async() => {
        sequelize = new Sequelize({
          dialect: "sqlite",
          storage: ":memory:",
          logging: false,
          sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async() => {
        await sequelize.close();
    });

    it("should update a product", async() => {
        const productRepository = new ProductRepository();
        const usecase = new UpdateProductUseCase(productRepository);
        const product = ProductFactory.create("a", "Product A", 10.55);
        await productRepository.create(product as Product);

        const products = await productRepository.findAll();
        let productNew = products[0];
        productNew.changeName("Product updated");
        productNew.changePrice(15.98);

        await usecase.execute(productNew);

        const result = await productRepository.find(productNew.id);
        expect(result.id).toBe(productNew.id)
        expect(result.name).toBe(productNew.name);
        expect(result.price).toBe(productNew.price);
    })
});
