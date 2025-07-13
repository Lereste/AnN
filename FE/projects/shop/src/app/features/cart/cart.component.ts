import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
// import { Products } from '@core/models/product/product.model';
import urlSlug from 'url-slug';
// import { CartService } from '@core/service/cart-service/cart.service';
import { Subject, debounceTime, distinctUntilChanged, of, switchMap, take, takeUntil, tap } from 'rxjs';
import { CartItem, CartItemDetailed } from '../../core/models/cart/cart.model';
import { CommonModule, Location, NgIf, isPlatformBrowser } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { AngularToastifyModule, ToastService } from 'angular-toastify';
import { Product } from '../../core/models/product/product.model';
import { CartService } from '../../core/service/cart-service/cart.service';
import { CartOrderSummaryComponent } from '../../shared/layout/cart-order-summary/cart-order-summary.component';
import { ProductService } from '../../core/service/product-service/product.service';

@Component({
  selector: 'app-cart',
  imports: [MatTableModule, NgIf, CommonModule, FormsModule, AngularToastifyModule, CartOrderSummaryComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['product', 'quantity', 'total', 'action'];

  allProducts: Product[] = [];
  // cloneCartProducts: Products[] = [];
  currentCartDetailItem!: Product;

  unSubscribe$: Subject<unknown> = new Subject();

  // cartCount: number = 0;
  cartDataSource: CartItemDetailed[] = [];
  currentChangedProductSlug: string | undefined;
  isEmptyCart: boolean = false;

  private readonly platformId = inject(PLATFORM_ID);

  inputEvent$ = new Subject<{ event: Event; cartItem: CartItemDetailed }>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private cartService: CartService,
    private toastService: ToastService,
    private changeDetectorRef: ChangeDetectorRef,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this._loadDataAndCart();
    this._checkIsEmptyCart();

    console.log('displayedColumns', this.displayedColumns);

  }

  ngAfterViewInit() {
    // Make scroll to top when navigate to this page
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({
        top: 0,
        behavior: 'instant',
      });
    }
  }

  ngAfterContentChecked() {
    this.changeDetectorRef.detectChanges();
  }

  private _loadDataAndCart(): void {
    this.productService
      .getAllProducts()
      .pipe(
        take(1), // get products once
        tap((response) => {
          this.allProducts = response.results.data;
        }),
        switchMap(() => this.cartService.cart$),
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
        takeUntil(this.unSubscribe$)
      )
      .subscribe((cartResponse) => {
        if (!cartResponse) return;
        this._updateCartData(cartResponse);
      });
  }

  private _updateCartData(cartResponse: any): void {
    this.cartDataSource = []; // reset

    cartResponse.items.forEach((cartItem: any) => {
      const matchedProduct = this.allProducts.find((product) => product.slug === cartItem.productSlug);

      if (!matchedProduct) return;

      const existingIndex = this.cartDataSource.findIndex((item) => item.product.slug === cartItem.productSlug);

      if (existingIndex !== -1 && this.currentChangedProductSlug === cartItem.productSlug) {
        this.currentChangedProductSlug = '-1';
        this.cartDataSource[existingIndex].quantity = cartItem.quantity;
      } else if (existingIndex === -1) {
        this.cartDataSource.push({
          product: matchedProduct,
          quantity: cartItem.quantity,
        });
      }
    });
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

  trackBySlug(index: number, item: CartItemDetailed): string {
    return item.product.slug as string;
  }

  onInputQuantity(event: Event, cartItem: CartItemDetailed): void {
    // this.inputEvent$.next({ event, cartItem });
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

  onBlurQuantity(event: Event, cartItem: CartItemDetailed): void {
    const input = event.target as HTMLInputElement;
    const value = Number(input.value);
    const clamped = this._clampValue(value, 1, 99);

    // Gán lại giá trị vào input nếu người dùng để trống hoặc nhập sai
    input.value = clamped.toString();

    const item: CartItem = {
      productSlug: cartItem.product.slug as string,
      quantity: clamped,
    };

    this.cartService.setCartItem(item, true);
  }

  private _clampValue(value: number, min: number, max: number): number {
    if (isNaN(value) || value < min) return min;
    if (value > max) return max;
    return value;
  }

  getTotalPriceItem(productIndex: number) {
    const cart = this.cartService.getCart();
    const quantity = cart.items[productIndex]?.quantity;
    const price = this.cartDataSource[productIndex]?.product.price;
    return price * quantity;
  }

  deleteCartItem(productItem: CartItemDetailed): void {
    this.cartService.deleteCartItem(productItem.product.slug as string);
    this.cartDataSource = this.cartDataSource.filter((item) => item.product.slug !== productItem.product.slug);
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
