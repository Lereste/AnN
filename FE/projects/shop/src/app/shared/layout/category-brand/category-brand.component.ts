import { IMAGE_LOADER, ImageLoaderConfig, NgFor, NgIf, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

interface Category {
  id: number;
  brandName: string;
  image: string;
}

@Component({
  selector: 'app-category-brand',
  imports: [
    NgFor,
    CarouselModule,
    // NgOptimizedImage
  ],
  templateUrl: './category-brand.component.html',
  styleUrl: './category-brand.component.scss',
})
export class CategoryMainComponent implements OnInit {
  categoryBrand: Category[] = [];

  customOptions: OwlOptions = {
    autoplay: true,
    autoplaySpeed: 1500,
    lazyLoad: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    margin: 40,
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
      730: {
        items: 3,
      },
      940: {
        items: 6,
      },
      1150: {
        items: 7,
      },
    },
    nav: false,
  };

  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    this.categoryBrand = [
      {
        id: 1,
        brandName: 'Roland',
        image: 'assets/image/brands/roland.jpg',
      },
      {
        id: 2,
        brandName: 'Yamaha',
        image: 'assets/image/brands/yamaha.jpg',
      },
      {
        id: 3,
        brandName: 'Martin',
        image: 'assets/image/brands/martin.png',
      },
      {
        id: 4,
        brandName: 'Marshall',
        image: 'assets/image/brands/marshall.png',
      },
      {
        id: 5,
        brandName: 'Kurtzman',
        image: 'assets/image/brands/kurtzman.png',
      },
      {
        id: 6,
        brandName: 'Nux',
        image: 'assets/image/brands/nux.jpg',
      },
      {
        id: 7,
        brandName: 'Bora',
        image: 'assets/image/brands/bora.png',
      },
      {
        id: 8,
        brandName: 'Boston',
        image: 'assets/image/brands/Boston.png',
      },
      {
        id: 9,
        brandName: 'Hexinstruments',
        image: 'assets/image/brands/hexinstruments.jpg',
      },
      {
        id: 10,
        brandName: 'Tokai',
        image: 'assets/image/brands/tokai.jpg',
      },
    ];
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && window.innerWidth < 1700) {
      this.customOptions.margin = 21;
    }
  }
}
