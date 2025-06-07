import { CommonModule, Location, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Cart, CartItem, CartItemDetailed } from '@core/models/cart/cart.model';
import { Products } from '@core/models/product/product.model';
import { CartService } from '@core/service/cart-service/cart.service';
import { ProductService } from '@core/service/product-service/product.service';
import urlSlug from 'url-slug';

@Component({
  selector: 'app-cart-order-summary',
  imports: [FormsModule, CommonModule, NgIf],
  templateUrl: './cart-order-summary.component.html',
  styleUrl: './cart-order-summary.component.scss'
})
export class CartOrderSummaryComponent implements OnInit {
  unSubcribe$: Subject<any> = new Subject();

  cartProducts: Products[] = [];
  // cloneCartProducts: Products[] = [];

  totalQuantity!: number;
  totalPrice!: number;

  constructor(
    private cartService: CartService, private router: Router,
    private productService: ProductService

  ) {

    // Simulator already have api (with productSlug)
    // this.cartProducts.forEach((productItem) => {
    //   let temp = Object.assign({
    //     productSlug: urlSlug(productItem.productName, {
    //       dictionary: {
    //         đ: 'd',
    //         Đ: 'D',
    //       },
    //     }),
    //     ...productItem,
    //   });
    //   this.cloneCartProducts.push(temp);
    // });
    this._loadData();

  }

  ngOnInit(): void {
    this._getOrderSummary();
  }

  private _loadData(): void {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.cartProducts = response.results.data;
      },
      error: (err) => {
        console.error('Error loading products', err);
      }
    })
  }

  private _getOrderSummary() {
    this.cartService.cart$.pipe(takeUntil(this.unSubcribe$)).subscribe((cartResponse: Cart) => {
      let _totalQuantity = 0;
      let _totalPrice = 0;
      // console.log(cartResponse);

      if (!cartResponse) return;
      cartResponse.items.forEach((cartItem: CartItem) => {

        // chỗ này sẽ đổi thành call api getProductBySlug
        // VD: this.ordersService.getProductBySlug(item.productSlug as string).pipe(takeUntil(this.unSubcribe$)).subscribe(productItem => {})
        this.cartProducts.forEach((productItem: Products) => {

          if (productItem.slug === cartItem.productSlug) {
            // productItem sẽ là respone trả về của api

            _totalQuantity += Number(cartItem.quantity);
            this.totalQuantity = _totalQuantity;
            // console.log('lereste', this.totalQuantity)

            _totalPrice += productItem.priceDiscount ? productItem.priceDiscount * cartItem.quantity : 0;
            this.totalPrice = _totalPrice
          }
        });
        // =========================
      })

    })
  }

  goToCheckOut(): void {
    this.router.navigate(['/thanh-toan-gio-hang'])
  }
}
