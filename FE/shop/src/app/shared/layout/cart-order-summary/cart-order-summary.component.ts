import { CommonModule, Location, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Cart, CartItem, CartItemDetailed } from 'src/app/core/models/cart/cart.model';
import { Products } from 'src/app/core/models/product/product.model';
import { CartService } from 'src/app/core/service/cart-service/cart.service';
import urlSlug from 'url-slug';

@Component({
  selector: 'app-cart-order-summary',
  standalone: true,
  imports: [FormsModule, CommonModule, NgIf],
  templateUrl: './cart-order-summary.component.html',
  styleUrl: './cart-order-summary.component.scss'
})
export class CartOrderSummaryComponent implements OnInit {
  unSubcribe$: Subject<any> = new Subject();

  cartProducts: Products[] = [];
  cloneCartProducts: Products[] = [];

  totalQuantity?: number;
  totalPrice?: number;

  constructor(
    private cartService: CartService, private router: Router, 
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
    this._getOrderSummary();
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
        this.cloneCartProducts.forEach((productItem: Products) => {
          
          if (productItem.productSlug === cartItem.productSlug) {
            // productItem sẽ là respone trả về của api
            
            _totalQuantity += Number(cartItem.quantity);
            this.totalQuantity = _totalQuantity;
            
            _totalPrice += productItem.productSalePrice ? productItem.productSalePrice * cartItem.quantity : 0;
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
