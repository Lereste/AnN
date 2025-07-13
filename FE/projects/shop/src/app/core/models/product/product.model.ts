export class Product {
  name?: string;
  image?: string;
  imageList?: string;
  description?: string;
  price!: number;
  priceDiscount?: number;
  slug?: string;
}

export interface IProductQueryParams {
  page: number;
  limit: number;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}

export interface IProductResponse {
  result: {
    data: {
      products: Product[];
    }
  }
}
