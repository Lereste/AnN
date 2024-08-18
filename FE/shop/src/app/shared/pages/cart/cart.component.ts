import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/core/models/product/product.model';
import urlSlug from 'url-slug';
import { CartService } from 'src/app/core/service/cart-service/cart.service';
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
} from 'src/app/core/models/cart/cart.model';
import { CommonModule, Location, NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { AngularToastifyModule, ToastService } from 'angular-toastify';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MatTableModule,
    NgIf,
    CommonModule,
    FormsModule,
    AngularToastifyModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = [
    'product',
    'price',
    'quantity',
    'total',
    'action',
  ];
  cartDataSource: any;

  cartProducts: Products[] = [];
  cloneCartProducts: Products[] = [];
  currentCartDetailItem!: Products;

  unSubscribe$: Subject<unknown> = new Subject();

  cartCount: number = 0;
  cartItemsDetailed: CartItemDetailed[] = [];
  currentChangedProductSlug: string = '';
  isEmptyCart: boolean = false;

  private inputEvent$ = new Subject<number>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private cartService: CartService,
    private toastService: ToastService
  ) {
    this.cartProducts = [
      {
        id: 1,
        imageSrc:
          'assets/image/products/guitar/Đàn Guitar Acoustic Martin 000Jr-10.jpg',
        imageAlt: 'Đàn Guitar Acoustic Martin 000Jr-10',
        productName: 'Đàn Guitar Acoustic Martin 000Jr-10',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: 14600000,
        productSalePrice: 13999000,
      },
      {
        id: 2,
        imageSrc:
          'assets/image/products/organ/Đàn Organ Casio Casiotone CT-S100.jpg',
        imageAlt: 'Đàn Organ Casio Casiotone CT-S100',
        productName: 'Đàn Organ Casio Casiotone CT-S100',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: 3370000,
        productSalePrice: 3270000,
      },
      {
        id: 3,
        imageSrc:
          'assets/image/products/ukulele/Đàn ukulele Kala KA-ZCT-T Tenor.jpg',
        imageAlt: 'Đàn ukulele Kala KA-ZCT-T Tenor',
        productName: 'Đàn ukulele Kala KA-ZCT-T Tenor',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: 2000000,
        productSalePrice: 1890000,
      },
      {
        id: 4,
        imageSrc:
          'assets/image/products/kalima/Đàn Kalimba Gecko 17 Phím K17SD Gỗ Đàn Hương Đỏ.jpg',
        imageAlt: 'Đàn Kalimba Gecko 17 Phím K17SD Gỗ Đàn Hương Đỏ',
        productName: 'Đàn Kalimba Gecko 17 Phím K17SD Gỗ Đàn Hương Đỏ',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: 1199000,
        productSalePrice: 1099000,
      },
      {
        id: 5,
        imageSrc:
          'assets/image/products/violin/Đàn Violin Amati-1969 VF750 Vân Thật Size 4.jpg',
        imageAlt: 'Đàn Violin Amati-1969 VF750 Vân Thật Size 4/4',
        productName: 'Đàn Violin Amati-1969 VF750 Vân Thật Size 4/4',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: 6000000,
        productSalePrice: 5790000,
      },
      {
        id: 6,
        imageSrc:
          'assets/image/products/drum/Trống Cajon Echoslap VC201-MEX (Thái Lan).jpg',
        imageAlt: 'Trống Cajon Echoslap VC201-MEX (Thái Lan)',
        productName: 'Trống Cajon Echoslap VC201-MEX (Thái Lan)',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: 2400000,
        productSalePrice: 2050000,
      },
      {
        id: 7,
        imageSrc:
          'assets/image/products/drum/Bộ Trống Cơ Yamaha Jazz Drum TMD-YCR5.jpg',
        imageAlt: 'Bộ Trống Cơ Yamaha Jazz Drum TMD-YCR5',
        productName: 'Bộ Trống Cơ Yamaha Jazz Drum TMD-YCR5',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: 7700000,
        productSalePrice: 7450000,
      },
    ];

    // Simulator already have api (with productSlug)
    this.cartProducts.forEach((productItem) => {
      let temp = Object.assign({
        productSlug: urlSlug(productItem.productName, {
          dictionary: {
            đ: 'd',
            Đ: 'D',
          },
        }),
        ...productItem,
      });
      this.cloneCartProducts.push(temp);
    });
  }

  ngOnInit(): void {
    this._getCartDetailList();
    this._checkIsEmptyCart();

    // element.product.productDefaultPrice * element.quantity
  }

  onBackToHome(): void {
    this.location.back();
  }

  private _checkIsEmptyCart(): void  {
    const cart = this.cartService.getCart();
    if (cart.items.length < 1) {
      this.isEmptyCart = true;
    } else {
      this.isEmptyCart = false;
    }
  }

  updateCartItemQuantity(
    event: any,
    cartItem: CartItemDetailed,
    productIndex: number
  ): void {
    // if (event.target.value = 1) {
    //   console.log('a');

    // }
    console.log('event.target.value 1', event.target.value);

    this.inputEvent$.next(event);
    let item: CartItem = {
      productSlug: cartItem.product.productSlug as string,
      quantity: event.target.value,
    };
    this.cartService.setCartItem(item, true);

    // Get product item quantity after 100ms when use have already input the value
    this.inputEvent$
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((inputEvent: any) => {
        console.log('event.target.value 2', event.target.value);

        item.quantity = event.target.value;
        this.cartService.setCartItem(item, true);
      });

    this.currentChangedProductSlug = cartItem.product.productSlug as string;
  }

  private _getCartDetailList(): void {
    this.cartService.cart$
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((respCart) => {
        this.cartCount = respCart.items.length ?? 0;

        respCart.items.forEach((cartItem) => {
          this.cloneCartProducts.forEach((productItem) => {
            if (productItem.productSlug === cartItem.productSlug) {
              this.currentCartDetailItem = productItem;
            }
          });

          const productIndex = this.cartItemsDetailed?.findIndex(
            (e) => e.product.productSlug === cartItem.productSlug
          );

          if (
            productIndex !== -1 &&
            this.currentChangedProductSlug === cartItem.productSlug
          ) {
            this.currentChangedProductSlug = '-1';
            this.cartItemsDetailed[productIndex].quantity = cartItem.quantity;
          } else if (productIndex === -1) {
            this.cartItemsDetailed.push({
              product: this.currentCartDetailItem,
              quantity: cartItem.quantity,
            });
          }
        });
      });

    this.cartDataSource = this.cartItemsDetailed;

    console.log(this.cartDataSource);
  }

  onValidateKeydown(event: any) {
    // Only keydown can validate text in input, while keyup not
    if (['e', 'E', '+', '-'].includes(event.key)) {
      console.log(event.preventDefault());
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onValidateBlur(event: any, cartItem: CartItemDetailed): void {
    if (this.isEmpty(event.target.value)) {
      // If user delete quantity (quantity is empty), set 1 is the default value
      event.target.value = event.target.min;
      console.log('event.target.value', event.target.value);

      const item: CartItem = {
        productSlug: cartItem.product.productSlug as string,
        quantity: event.target.value,
      };
      this.cartService.setCartItem(item, true);
    }
  }

  isEmpty(str: string) {
    return !str.trim().length;
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

  getTotalPriceItem(productIndex: number) {
    const cart = this.cartService.getCart();
    const quantity = cart.items[productIndex]?.quantity;
    const price =
      this.cartItemsDetailed[productIndex]?.product.productDefaultPrice;

    return price * quantity;
  }

  deleteCartItem(productItem: CartItemDetailed): void {
    console.log(productItem);

    this.cartService.deleteCartItem(productItem.product.productSlug as string);

    const updateCartItemsDetailed = this.cartItemsDetailed.filter(
      (productItem) => {
        productItem.product.productSlug !== productItem.product.productSlug;
      }
    );
    this.cartItemsDetailed = updateCartItemsDetailed;

    this._getCartDetailList();
  }

  clearCartItems() {
    this.cartService.clearCart();
    this._checkIsEmptyCart();
    this.toastService.success('Đã xóa tất cả sản phẩm trong giỏ hàng.');

  }
}
