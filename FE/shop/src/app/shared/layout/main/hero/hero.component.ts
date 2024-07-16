import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ViewChild,
  OnInit,
} from '@angular/core';
import { SwiperComponent } from '../../../components/swiper/swiper.component';
import { register } from 'swiper/element/bundle';
import { CarouselComponent } from './carousel/carousel.component';
import { CommonModule, NgFor } from '@angular/common';
import { CategoryHeroComponent } from './category-hero/category-hero.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    // SwiperComponent,
    CarouselComponent,
    CategoryHeroComponent,
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
        'https://file.hstatic.net/200000722513/file/man_hinh_-_web_slider_800x400_65a0642fcf8349c484dc3f79b71c7deb.png',
      imageAlt: 'Lossless Youths',
      content: {
        title: 'Lossless Youths',
        description:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
      },
    },
    {
      id: 2,
      imageSrc:
        'https://file.hstatic.net/200000722513/file/loa_xin_slider_55571db8742146cd85eef265cf950b35.png',
      imageAlt: 'Estrange Bond',
      content: {
        title: 'Estrange Bond',
        description:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
      },
    },
    {
      id: 3,
      imageSrc:
        'https://file.hstatic.net/200000722513/file/nitro_v_09a10f8a0a1744239976d115c5962505.jpg',
      imageAlt: 'The Gate Keeper',
      content: {
        title: 'The Gate Keeper',
        description:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
      },
    },
    {
      id: 4,
      imageSrc:
        'https://file.hstatic.net/200000722513/file/gearvn-sam-may-moi-he-vui-phoi-phoi-banner_5e36e05190c841f4b9e66710eee5ad85.jpg',
      imageAlt: 'Last Trace Of Us',
      content: {
        title: 'Last Trace Of Us',
        description:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
      },
    },
    {
      id: 5,
      imageSrc:
        'https://file.hstatic.net/200000722513/file/gearvn-sam-laptop-msi-nhan-mo-hinh-katana-cuc-ngau-banner_5127b896ec22483e9a3fd020925b6021.jpg',
      imageAlt: 'Urban Decay',
      content: {
        title: 'Urban Decay',
        description:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
      },
    },
    {
      id: 6,
      imageSrc:
        'https://file.hstatic.net/200000722513/file/banner_web_slider_800x400_laptop_lenovo-edit_95ee3ac03fa44ccf8e1adf2fa264f2a7.jpg',
      imageAlt: 'The Migration',
      content: {
        title: 'The Migration',
        description:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
      },
    },
  ];

  categoryData = [
    {
      parentName: 'Laptop Gaming',
      icon: 'fa-solid fa-laptop',
      childCategory: [
        {
          brandName: 'ASUS',
        },
        {
          brandName: 'ACER',
        },
        {
          brandName: 'MSI',
        },
        {
          brandName: 'LENOVO',
        },
        {
          brandName: 'DELL',
        },
        {
          brandName: 'HP',
        },
        {
          brandName: 'LG',
        },
      ],
    },
    {
      parentName: 'PC Gaming',
      icon: 'fa-solid fa-computer',
      childCategory: [
        {
          brandName: 'PC Amd',
        },
        {
          brandName: 'Pc Intel',
        },
        {
          brandName: 'Mini Pc',
        },
      ],
    },
    {
      parentName: 'Monitor',
      icon: 'fa-solid fa-desktop',
      childCategory: [
        {
          brandName: 'LG',
        },
        {
          brandName: 'Samsung',
        },
        {
          brandName: 'View sonic',
        },
      ],
    },
    {
      parentName: 'Gaming gear',
      icon: 'fa-regular fa-keyboard',
      childCategory: [
        {
          brandName: 'Mouse',
        },
        {
          brandName: 'Keyboard',
        },
        {
          brandName: 'Headphone',
        },
      ],
    },
  ];

  ngOnInit(): void {
    // register();
  }
}
