import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Cart, CartItem } from '../../models/cart/cart.model';
import { isPlatformBrowser } from '@angular/common';
// import { Cart, CartItem } from '../models/cart';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());
  private readonly platformId = inject(PLATFORM_ID);
  private cart!: Cart;

  constructor() { }

  initCartLocalStorage() {
    const cart: Cart = this.getCart();

    if (!cart) {
      const intialCart = {
        items: []
      }

      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(CART_KEY, JSON.stringify(intialCart));
      }
    }
  }

  clearCart() {
    const intialCart = {
      items: [],
    };

    localStorage.setItem(CART_KEY, JSON.stringify(intialCart));
    this.cart$.next(intialCart);
  }

  getCart(): Cart {
    if (isPlatformBrowser(this.platformId)) {
      const cartJsonString: string = localStorage.getItem(CART_KEY) as string;
      this.cart = JSON.parse(cartJsonString);
      this.cart$.next(this.cart);
    }

    return this.cart;
  }

  setCartItem(cartItem: CartItem, isUpdateItemQuantity?: boolean): void {
    const cart = this.getCart();

    const cartItemExist = cart.items?.find((item) => item.productSlug === cartItem.productSlug);

    if (!cartItemExist) {
      cart.items?.push(cartItem);
    } else {
      cart.items = cart.items?.map(item => {
        if (item.productSlug === cartItem.productSlug) {
          const quantity = isUpdateItemQuantity ? cartItem.quantity : item.quantity + cartItem.quantity;
          return { ...item, quantity };
        }
        return item;
      }) || [];
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    this.cart$.next(cart);
  }

  deleteCartItem(productSlug: string) {
    const cart = this.getCart();

    const filterdCart = cart.items.filter(item => item.productSlug !== productSlug);
    cart.items = filterdCart;

    const cartJsonString = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJsonString);

    this.cart$.next(cart);
  }
}
