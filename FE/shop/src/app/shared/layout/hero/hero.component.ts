import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ViewChild,
  OnInit,
} from '@angular/core';
import { SwiperComponent } from '../../components/swiper/swiper.component';
import { register } from 'swiper/element/bundle';
import { CarouselComponent } from '../carousel/carousel.component';
import { CommonModule, NgFor } from '@angular/common';
import { CategoryHeroComponent } from '../../components/category-hero/category-hero.component';
import { CategoryMobileComponent } from '../../components/category-mobile/category-mobile.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    SwiperComponent,
    CarouselComponent,
    CategoryHeroComponent,
    CategoryMobileComponent,
    CommonModule,
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeroComponent implements OnInit {
  imagesData = [
    {
      id: 1,
      imageSrc:
        'assets/image/carousel/dien-lanh/dienlanhhoaian-banner.png',
      imageAlt: 'Điện lạnh Hoài Ân',
      content: {
        title: 'Điện lạnh Hoài Ân',
        description:
          'Điện lạnh Hoài Ân',
      },
    },
    {
      id: 2,
      imageSrc:
        'assets/image/carousel/dien-lanh/suachuamaygiat.jpg',
      imageAlt: 'Sữa chữa máy giặt, tủ lạnh, máy lạnh',
      content: {
        title: 'Sữa chữa, tủ lạnh, máy lạnh ',
        description:
          'Uy tín, tận tâm, trách nhiệm',
      },
    },
    {
      id: 3,
      imageSrc:
        'assets/image/carousel/dien-lanh/sale.png',
      imageAlt: 'Đàn Guitar',
      content: {
        title: 'Đàn Guitar',
        description:
          'Còn gì tuyệt vời hơn khi biết chơi đàn Guitar?',
      },
    },
    {
      id: 4,
      imageSrc:
        'assets/image/carousel/dien-lanh/dienlanhhoaian-banner.png',
      imageAlt: 'Điện lạnh Hoài Ân',
      content: {
        title: 'Điện lạnh Hoài Ân',
        description:
          'Điện lạnh Hoài Ân',
      },
    },
    {
      id: 5,
      imageSrc:
        'assets/image/carousel/dien-lanh/suachuamaygiat.jpg',
      imageAlt: 'Sữa chữa máy giặt, tủ lạnh, máy lạnh',
      content: {
        title: 'Sữa chữa, tủ lạnh, máy lạnh ',
        description:
          'Uy tín, tận tâm, trách nhiệm',
      },
    },
    {
      id: 6,
      imageSrc:
        'assets/image/carousel/dien-lanh/sale.png',
      imageAlt: 'Đàn Guitar',
      content: {
        title: 'Đàn Guitar',
        description:
          'Còn gì tuyệt vời hơn khi biết chơi đàn Guitar?',
      },
    },
  ];



  ngOnInit(): void {
    // register();
  }
}
