import { NgFor, NgIf, NgOptimizedImage, provideImageKitLoader } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselComponent, CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import slugify from 'slugify';
import urlSlug from 'url-slug'

export interface Products {
  id: number;
  imageSrc: string;
  imageAlt: string;
  productName: string;
  productDescription?: string;
  productDefaultPrice: string;
  productSalePrice?: string;
  productSlug?: string;
}

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [NgFor, NgIf, CarouselModule, NgOptimizedImage],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent implements AfterViewInit, OnDestroy {
  customOptions: OwlOptions = {
    autoplay: true,
    autoplaySpeed: 1500,
    lazyLoad: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    margin: 20,
    autoWidth: false,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    dots: false,
    navSpeed: 1000,
    responsive: {
      360: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1150: {
        items: 5
      },
    },
    nav: false
  }

  newProductItem: any;

  @ViewChild('owlCar') owlCar: CarouselComponent | undefined;
  @Output() newItemEvent = new EventEmitter<CarouselComponent>();
  @Input() productList: Products[] = [];

  constructor(private router: Router) {
    if (window.innerWidth < 1920) {
      console.log('margin = 8');
      this.customOptions.margin = 8;
    }

  }

  ngAfterViewInit(): void {
    this.newItemEvent.emit(this.owlCar);
  }

  viewProductDetail(productItem: Products): void {
    // console.log('productItem', productItem);

    this.newProductItem = Object.assign({
      // productSlug: slugify(productItem.productName, {lower: true, trim: true}),
      productSlug: urlSlug(productItem.productName, {
        dictionary: {
          'đ': 'd',
          'Đ': 'D'
        }
      }),
      ...productItem
    })

    console.log('aaaaaaaa', this.newProductItem);

    this.router.navigate(['product-detail/' + this.newProductItem.productSlug])
  }

  ngOnDestroy(): void {
    console.log('product item destroy');
  }
}
