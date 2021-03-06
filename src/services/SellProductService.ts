import { Service } from "typedi";
import { SellProduct } from "../models/SellProduct";
import BaseService from "./BaseService";
import { getConnection } from "typeorm";

@Service()
export default class SellProductService extends BaseService<SellProduct> {

    modelName(): string {
        return SellProduct.name;
    }

    public async findSellProductrById(id: number): Promise<SellProduct> {
        try {
            const sellProduct = await getConnection()
                .getRepository(SellProduct)
                .createQueryBuilder("sellProduct")
                .leftJoinAndSelect("sellProduct.SKU", "SKU")
                .leftJoinAndSelect("sellProduct.product", "product")
                .where(`sellProduct.id = :id `, { id })
                .getOne();
            return sellProduct;
        } catch (error) {
            throw error;
        }
    }

    public async deleteSellProduct(id: number) {
        try {
            const result = await this.entityManager.createQueryBuilder(SellProduct, 'sellProduct')
                .delete()
                .where("id = :id", { id })
                .execute();
            if (result.affected === 0) {
                throw new Error(`This product don't found`);
            }
        } catch (error) {
            throw error;
        }
    }

}
