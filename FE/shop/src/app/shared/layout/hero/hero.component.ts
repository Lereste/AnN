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
    // SwiperComponent,
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
        'assets/image/carousel/sale.png',
      imageAlt: 'Piano background',
      content: {
        title: 'Đàn Piano',
        description:
          'Còn gì tuyệt vời hơn khi biết chơi đàn Piano?',
      },
    },
    {
      id: 2,
      imageSrc:
        'assets/image/carousel/suachuamaygiat.jpg',
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
        'assets/image/carousel/sale.png',
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
        'assets/image/carousel/suachuamaygiat.jpg',
      imageAlt: 'Đàn Ukulele',
      content: {
        title: 'Đàn Ukulele',
        description:
          'Còn gì tuyệt vời hơn khi biết chơi đàn Ukulele?',
      },
    },
    {
      id: 5,
      imageSrc:
        'assets/image/carousel/sale.png',
      imageAlt: 'Đàn Kalimba',
      content: {
        title: 'Đàn Kalimba',
        description:
          'Còn gì tuyệt vời hơn khi biết chơi đàn Kalimba?',
      },
    },
    // {
    //   id: 6,
    //   imageSrc:
    //     'assets/image/carousel/sale.png',
    //   imageAlt: 'Đàn Violin',
    //   content: {
    //     title: 'Đàn Violin',
    //     description:
    //       'Còn gì tuyệt vời hơn khi biết chơi đàn Violin?',
    //   },
    // },
  ];



  ngOnInit(): void {
    // register();
  }
}
