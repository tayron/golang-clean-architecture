import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface"
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository"
import { OutputUpdateCustomerDto } from "../../customer/update/update.customer.dto";
import { OutuputFindProductDto } from "../find/find.product.dto";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export class ListProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: InputListProductDto): Promise<OutputListProductDto> {
        const products = await this.productRepository.findAll();  
        return OutputMapper.toOutuput(products);
    }
}

class OutputMapper {
    static toOutuput (product: Product[]) : OutputListProductDto {
        return {
            products: product.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price,
            }))
        }
    }
}