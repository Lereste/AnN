import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { ToastService, AngularToastifyModule } from 'angular-toastify';
import { Products } from 'src/app/core/models/product/product.model';
import urlSlug from 'url-slug';

enum DESCRIBE_TYPE {
  DESCRIPTION = 'description',
  SPECIFICATION = 'SPECIFICATION',
  VIDEO = 'VIDEO'
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [NgIf, FormsModule, CommonModule, AngularToastifyModule, NgSwitch, NgSwitchDefault, NgSwitchCase],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit, AfterViewInit {
  saleProducts: Products[] = [];
  cloneSaleProducts: Products[] = [];
  currentProductDetailItem: Products | undefined;

  
  decreaseQuantity: number = 0;
  increaseQuantity: number = 0;
  currentInputValue: number = 1; // default quantity product is 1

  DESCRIBE_TYPE = DESCRIBE_TYPE;
  selectedDescribe: string = DESCRIBE_TYPE.DESCRIPTION;

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService
  ) {
    //   this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
    //     this.currentUrl = this.router.routerState.snapshot.url; // get currentURL after change
    // });
    this.saleProducts = [
      {
        id: 1,
        imageSrc:
          'assets/image/products/guitar/Đàn Guitar Acoustic Martin 000Jr-10.jpg',
        imageAlt: 'Đàn Guitar Acoustic Martin 000Jr-10',
        productName: 'Đàn Guitar Acoustic Martin 000Jr-10',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: 14600000,
        productSalePrice: 13990000
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
        productSalePrice: 3270000

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
        productSalePrice: 1890000
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
        productSalePrice: 1099000
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
        productSalePrice: 5790000
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
        productSalePrice: 2050000
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
        productSalePrice: 7450000
      },
    ];

    // Simulator already have api (with productSlug)
    this.saleProducts.forEach(productItem => {
      let temp = Object.assign({
        productSlug: urlSlug(productItem.productName, {
          dictionary: {
            'đ': 'd',
            'Đ': 'D'
          }
        }),
        ...productItem
      })
      this.cloneSaleProducts.push(temp)
    })
  }

  ngOnInit(): void {
    console.log('Url slug: ', this.activatedRoute.snapshot.params['productSlug']);

    this.cloneSaleProducts.forEach(productItem => {
      if (productItem.productSlug === this.activatedRoute.snapshot.params['productSlug']) {
        this.currentProductDetailItem = productItem
      }
    })

    // console.log('currentProductDetailItem', this.currentProductDetailItem);
  }

  ngAfterViewInit() {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    })
  }

  onSelectedQuantity(event: any) {
    // Limit value between 1 and 99
    if (parseInt(event.target.value) < parseInt(event.target.min)) {
      event.target.value = event.target.min;
    }
    if (parseInt(event.target.value) > parseInt(event.target.max)) {
      event.target.value = event.target.max;
    }

    this.currentInputValue = event.target.value;

  }

  onValidate(event: any): void {
    // chỉ có keydown mới validate đc text, keyup thì không
    if (['e', 'E', '+', '-'].includes(event.key)) {
      console.log(event.preventDefault());
      event.stopPropagation();
      event.preventDefault();
    }


    if (this.isEmpty(event.target.value)) {
      console.log('blur');
      
      this.currentInputValue = 1;
    }
  }

  isEmpty(str: string) {
    return !str.trim().length;
  }

  onDecreaseQuantity(): void {
    if (this.currentInputValue > 1 && this.currentInputValue < 100) {
      --this.currentInputValue;
    }
  }

  onIncreaseQuantity(): void {
    if (this.currentInputValue < 99) {
      ++this.currentInputValue;
    }
  }

  addToCart(): void {
    this.toastService.success('Đã thêm sản phẩm vào giỏ hàng!');
  }

  onBuyNow(): void {

  }

  onCallToBuy(): void {
    console.log('Calling to admin...');
  }

  // 
  toggleDescription(): void {
    this.selectedDescribe = DESCRIBE_TYPE.DESCRIPTION;
  }

  toggleSpecifications(): void {
    this.selectedDescribe = DESCRIBE_TYPE.SPECIFICATION;
  }

  toggleVideo(): void {
    this.selectedDescribe = DESCRIBE_TYPE.VIDEO;
  }
}
