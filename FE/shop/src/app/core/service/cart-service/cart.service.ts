import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Cart, CartItem } from '../../models/cart/cart.model';
// import { Cart, CartItem } from '../models/cart';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

  constructor() { }

  initCartLocalStorage() {
    const cart: Cart = this.getCart();

    if (!cart) {
      const intialCart = {
        items: []
      }

      localStorage.setItem(CART_KEY, JSON.stringify(intialCart));
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
    const cartJsonString: string = localStorage.getItem(CART_KEY) as string;
    const cart: Cart = JSON.parse(cartJsonString);
    return cart;
  }

  setCartItem(cartItem: CartItem, isUpdateItemQuantity?: boolean): void {
    const cart = this.getCart();

    console.log('cart', cart);
    
    const cartItemExist = cart.items?.find((item) => item.productSlug === cartItem.productSlug);

    if (!cartItemExist) {
      cart.items?.push(cartItem);
    } else {
      cart.items?.map(item => {
        if (item.productSlug === cartItem.productSlug) {
          if (isUpdateItemQuantity) {
            return item.quantity = cartItem.quantity;
          } else {
            return item.quantity = item.quantity + cartItem.quantity;
          }
        }
        return item;
      });
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
