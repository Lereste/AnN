import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '@core/models/product/product.model';
import urlSlug from 'url-slug';
import { CartService } from '@core/service/cart-service/cart.service';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  of,
  takeUntil,
  tap,
} from 'rxjs';
import {
  CartItem,
  CartItemDetailed,
} from '@core/models/cart/cart.model';
import { CommonModule, Location, NgIf, isPlatformBrowser } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { AngularToastifyModule, ToastService } from 'angular-toastify';
import { CartOrderSummaryComponent } from '@layout/cart-order-summary/cart-order-summary.component';
import { ProductService } from '@core/service/product-service/product.service';

@Component({
    selector: 'app-cart',
    imports: [
        MatTableModule,
        NgIf,
        CommonModule,
        FormsModule,
        AngularToastifyModule,
        CartOrderSummaryComponent
    ],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'product',
    'price',
    'quantity',
    'total',
    'action',
  ];

  cartProducts: Products[] = [];
  // cloneCartProducts: Products[] = [];
  currentCartDetailItem!: Products;

  unSubscribe$: Subject<unknown> = new Subject();

  // cartCount: number = 0;
  cartDataSource: CartItemDetailed[] = [];
  currentChangedProductSlug: string = '';
  isEmptyCart: boolean = false;

  private inputEvent$ = new Subject<number>();
  private readonly platformId = inject(PLATFORM_ID);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private cartService: CartService,
    private toastService: ToastService,
    private changeDetectorRef: ChangeDetectorRef,
    private productService: ProductService
  ) {

  }

  ngOnInit(): void {
    this._loadData();
    this._getCartDetailList();
    this._checkIsEmptyCart();
  }

  ngAfterViewInit() {
    // Make scroll to top when navigate to this page
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      })
    }
  }

  ngAfterContentChecked() {
    this.changeDetectorRef.detectChanges();
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

  private _checkIsEmptyCart(): void {
    const cart = this.cartService.getCart();
    if (!cart) return;

    if (cart.items.length < 1) {
      this.isEmptyCart = true;
    } else {
      this.isEmptyCart = false;
    }
  }

  onBackToHome(): void {
    this.location.back();
  }


  updateCartItemQuantity(
    event: any,
    cartItem: CartItemDetailed,
    productIndex: number
  ): void {
    // if (event.target.value = 1) {
    //   console.log('a');

    // }
    // console.log('event.target.value 1', event.target.value as number);

    this.inputEvent$.next(event);
    console.log('1===', event.target.value);

    let item: CartItem = {
      productSlug: cartItem.product.slug as string,
      quantity: Number(event.target.value),
    };

    console.log('item', item);


    this.cartService.setCartItem(item, true);

    // Get product item quantity after 300ms when use have already input the value
    this.inputEvent$
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((inputEvent: any) => {
        // console.log('event.target.value 2', event.target.value);

        item.quantity = Number(event.target.value);
        this.cartService.setCartItem(item, true);
      });

    this.currentChangedProductSlug = cartItem.product.slug as string;
  }

  private _getCartDetailList(): void {
    this.cartService.cart$
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((cartResponse) => {
        if (!cartResponse) return;

        // this.cartCount = respCart.items.length ?? 0;
        cartResponse.items.forEach((cartItem) => {
          // chỗ này sẽ đổi thành call api getProductBySlug
          // VD: this.ordersService.getProductBySlug(cartItem.productSlug).subscribe(response => {
          this.cartProducts.forEach((productItem) => {

            if (productItem.slug === cartItem.productSlug) {
              // productItem sẽ là respone trả về của api
              this.currentCartDetailItem = productItem;
            }
          });
          // =========================


          const productIndex = this.cartDataSource.findIndex(
            (cart) => cart.product.slug === cartItem.productSlug
          );

          if (
            productIndex !== -1 &&
            this.currentChangedProductSlug === cartItem.productSlug
          ) {
            this.currentChangedProductSlug = '-1';
            this.cartDataSource[productIndex].quantity = cartItem.quantity;
          } else if (productIndex === -1) {
            this.cartDataSource.push({
              product: this.currentCartDetailItem,
              quantity: cartItem.quantity,
            });
          }
        });
      });
  }

  onValidateKeydown(event: any) {
    // Only keydown can validate text in input, while keyup not
    if (['e', 'E', '+', '-'].includes(event.key)) {
      console.log(event.preventDefault());
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onSelectedQuantity(event: any): void {
    // Limit value between 1 and 99
    if (parseInt(event.target.value) < parseInt(event.target.min)) {
      event.target.value = event.target.min;
    }
    if (parseInt(event.target.value) > parseInt(event.target.max)) {
      event.target.value = event.target.max;
    }
  }

  onValidateBlur(event: any, cartItem: CartItemDetailed): void {

    if (this.isValid(event.target.value)) {
      // If user delete quantity (quantity is empty), set 1 is the default value
      event.target.value = event.target.min;

      const item: CartItem = {
        productSlug: cartItem.product.slug as string,
        quantity: Number(event.target.value),
      };
      this.cartService.setCartItem(item, true);
    }
  }

  isValid(value: string): boolean {
    return !value.trim().length || value === "0";
  }

  getTotalPriceItem(productIndex: number) {
    const cart = this.cartService.getCart();
    const quantity = cart.items[productIndex]?.quantity;
    const price =
      this.cartDataSource[productIndex]?.product.price;
    return price * quantity;
  }

  deleteCartItem(productItem: CartItemDetailed): void {
    console.log(productItem);

    this.cartService.deleteCartItem(productItem.product.slug as string);

    const updateCartItemsDetailed = this.cartDataSource.filter(
      (productItem) => {
        productItem.product.slug !== productItem.product.slug;
      }
    );
    this.cartDataSource = updateCartItemsDetailed;

    this._getCartDetailList();
  }

  clearCartItems() {
    this.cartService.clearCart();
    this._checkIsEmptyCart();
    this.toastService.success('Đã xóa tất cả sản phẩm trong giỏ hàng.');

  }

  ngOnDestroy(): void {
    console.log('cart.component.ts destroy');
  }
}
