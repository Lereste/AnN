import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation, afterNextRender } from '@angular/core';
// import function to register Swiper custom elements
import { SwiperContainer, register } from 'swiper/element/bundle';
// register Swiper custom elements
import { SwiperOptions } from 'swiper/types';
import { CommonModule } from '@angular/common';
// import { SwiperDirective } from './swiper.directive';
import { SWIPER_SLIDE_CONTENTS_DATA } from './swiper-slide-content-data';

@Component({
  selector: 'app-swiper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './swiper.component.html',
  styleUrl: './swiper.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // encapsulation: ViewEncapsulation.None
})
export class SwiperComponent implements OnInit, AfterViewInit {
  @ViewChild('swiperElementRef') swiperElementRef!: ElementRef<SwiperContainer>;
  test: any;

  swiperSlideContents = SWIPER_SLIDE_CONTENTS_DATA;

  customSwiperOptions: SwiperOptions = {
    loop: true,
    speed: 1500, // tốc độ hiệu ứng chuyển silde
    observer: true,
    observeParents: true,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: { clickable: true },
    allowTouchMove: true,
    centeredSlides: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    parallax: true,
    slidesPerView: 1,
    // autoHeight: true,
    // autowidth: true,
    injectStyles: [
      `
        .swiper-button-next,
        .swiper-button-prev {
          background-color: white;
          background-position: center;
          background-size: 40px;
          background-repeat: no-repeat;
          padding: 8px 16px;
          border-radius: 100%;
          border: 2px solid black;
          color: red;
        }

        .swiper-button-prev {
          background-image: url("/box-arrow-in-left.svg");
        }

        .swiper-button-next {
          background-image: url("/box-arrow-in-right.svg");
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          content: "";
        }

        .swiper-pagination-bullet{
          width: 40px;
          height: 40px;
          background-color: red;
        }
    `,
    ],
  };

  constructor() {
    afterNextRender(() => {
      Object.assign(this.swiperElementRef.nativeElement, this.customSwiperOptions);
      this.swiperElementRef.nativeElement.initialize();
    });

  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.swiperElementRef.nativeElement.addEventListener('mouseover', () => {
      this.swiperElementRef.nativeElement.swiper.autoplay.stop();
    });

    this.swiperElementRef.nativeElement.addEventListener('mouseleave', () => {
      this.swiperElementRef.nativeElement.swiper.autoplay.start();
    });
  }
}
