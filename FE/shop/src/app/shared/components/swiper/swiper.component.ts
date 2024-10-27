import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
// import function to register Swiper custom elements
import { SwiperContainer, register } from 'swiper/element/bundle';
// register Swiper custom elements
import { SwiperOptions } from 'swiper/types';
import { CommonModule } from '@angular/common';
import { SwiperDirective } from './swiper.directive';
import { SWIPER_SLIDE_CONTENTS_DATA } from './swiper-slide-content-data';

@Component({
  selector: 'app-swiper',
  standalone: true,
  imports: [CommonModule, SwiperDirective],
  templateUrl: './swiper.component.html',
  styleUrl: './swiper.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // encapsulation: ViewEncapsulation.None
})
export class SwiperComponent implements OnInit, AfterViewInit {
  @ViewChild('swiperElementRef') swiperElementRef!: ElementRef<SwiperContainer>;

  swiperSlideContents = SWIPER_SLIDE_CONTENTS_DATA;

  customSwiperOptions: SwiperOptions = {
    loop: true,
    speed: 1000, // tốc độ hiệu ứng chuyển silde
    observer: true,
    observeParents: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: { clickable: true },
    allowTouchMove: true,
    centeredSlides: true,
    autoHeight: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    parallax: true,
    slidesPerView: 3,
    width: 300,
  };

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
