import { Products } from "../product/product.model";

export class CartItem {
  // productId!: string;
  productSlug!: string;
  quantity!: number;
}

export class Cart {
  items !: CartItem[];
}

export class CartItemDetailed {
  product!: Products;
  quantity!: number;
}
