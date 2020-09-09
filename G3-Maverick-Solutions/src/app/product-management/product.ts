import { Price } from '../product-management/price';

export class Product {
    ProductID : number;
	ProductCategoryID : number;
	ProdName : string;
	ProdDesciption : string;
	ProdReLevel : number;
	Prices: Price[];
}
