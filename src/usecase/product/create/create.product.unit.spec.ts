import Product from "../../../domain/product/entity/product"
import CreateProductUseCase from "./create.product.usecase"

const input = {
    name: "Product 1",
    type: "a",
    price: 19.80
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn()
    }
}

describe("Unit teste create product use case", () => {
    it("should create a product", async() => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        const output = await productCreateUseCase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    });

    it("should throw an error when name is missing", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository)

        input.name = "";
        await expect(productCreateUseCase.execute(input)).rejects.toThrowError(
            "Name is required"
        );
    });

    it("should throw an error where price iss mission", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository)

        input.name = "Product 1"
        input.price = -10;
        await expect(productCreateUseCase.execute(input)).rejects.toThrowError(
          "Price must be greater than zero"
        );
    })
})