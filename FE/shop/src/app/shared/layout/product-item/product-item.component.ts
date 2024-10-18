import { NgFor, NgIf, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { AngularToastifyModule, ToastService } from 'angular-toastify';
import {
  CarouselComponent,
  CarouselModule,
  OwlOptions,
} from 'ngx-owl-carousel-o';
import { CartItem } from 'src/app/core/models/cart/cart.model';
import { Products } from 'src/app/core/models/product/product.model';
import { CartService } from 'src/app/core/service/cart-service/cart.service';
// import slugify from 'slugify';
import urlSlug from 'url-slug';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    CarouselModule,
    NgOptimizedImage,
    AngularToastifyModule,
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent implements OnInit, AfterViewInit, OnDestroy {
  customOptions: OwlOptions = {
    autoplay: true,
    autoplaySpeed: 1500,
    lazyLoad: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    autoplayMouseleaveTimeout: 1000,
    margin: 20,
    autoWidth: false,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    dots: false,
    navSpeed: 1000,
    responsive: {
      360: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
      1150: {
        items: 5,
      },
    },
    nav: false,
  };

  newProductItem!: Products;

  isZoom: boolean = false;
  zoomProductItem!: Products;

  hasExisted: boolean = true;
  private readonly platformId = inject(PLATFORM_ID);


  @ViewChild('owlCar') owlCar: CarouselComponent | undefined;
  @Output() newItemEvent = new EventEmitter<CarouselComponent>();
  @Input() productList: Products[] = [];

  constructor(
    private router: Router,
    private cartService: CartService,
    private toastService: ToastService
  ) {

    if (isPlatformBrowser(this.platformId) && window.innerWidth < 1920) {
      console.log('margin = 8');
      this.customOptions.margin = 8;
    }
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.newItemEvent.emit(this.owlCar);
  }

  goToProductDetailPage(productItem: Products): void {
    const newProduct = this.convertToProductSlug(productItem);
    console.log('newProduct', newProduct);

    this.router.navigate(['chi-tiet-san-pham/' + newProduct.productSlug]);
  }

  previewProductInformation(productItem: Products): void {
    this.isZoom = !this.isZoom;

    this.zoomProductItem = productItem;
    console.log('zoomProductItem', this.zoomProductItem);
  }

  closeImage(): void {
    this.isZoom = false;
  }

  addProductToCart(productItem: Products): void {
    const newProduct = this.convertToProductSlug(productItem);

    const cartItem: CartItem = {
      productSlug: newProduct.productSlug as string,
      quantity: 1,
    };

    // console.log('cartItem', cartItem);

    /*
      Note: Ở đây khi bấm add product vào cart, nó chỉ lấy 1 sản phẩm, còn add nhiều lần thì nó cũng lấy chỉ 1 sản phẩm để hiển thị.
      Khi vào tới trang giỏ hàng thì nó mới hiển thị đầy đủ số lượng sản phẩm ra
    */
    this.cartService.setCartItem(cartItem);

    // check if product is already in cart, if not, show warning message, otherwise, show success message
    const cart = this.cartService.getCart();
    cart.items.forEach((item) => {
      if (item.quantity < 2) {
        this.hasExisted = false;
      } else {
        this.hasExisted = true;
      }
    });

    if (this.hasExisted) {
      // console.log(this.toastService.);

      this.toastService.warn('Sản phẩm đã tồn tại trong giỏ hàng!');
    } else {
      this.toastService.success('Đã thêm sản phẩm vào giỏ hàng.');
    }
  }

  convertToProductSlug(productItem: Products) {
    return (this.newProductItem = Object.assign({
      // productSlug: slugify(productItem.productName, {lower: true, trim: true}),
      productSlug: urlSlug(productItem.productName, {
        dictionary: {
          đ: 'd',
          Đ: 'D',
        },
      }),
      ...productItem,
    }));
  }

  ngOnDestroy(): void {
    console.log('product item destroy');
  }
}
