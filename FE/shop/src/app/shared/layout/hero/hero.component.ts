import { CUSTOM_ELEMENTS_SCHEMA, Component, ViewChild, OnInit } from '@angular/core';
import { SwiperComponent } from '../../components/swiper/swiper.component';
import { register } from 'swiper/element/bundle';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { CommonModule, NgFor } from '@angular/common';
import { CategoryHeroComponent } from '../category-hero/category-hero.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [SwiperComponent, CarouselComponent, CategoryHeroComponent, CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class HeroComponent implements OnInit {
  imagesData = [
    {
      imageSrc:
        'https://slp-statics.astockcdn.net/static_assets/staging/24spring/home/curated-collections/card-1.jpg?width=580',
      imageAlt: 'nature1',
    },
    {
      imageSrc:
        'https://cdn.create.vista.com/api/media/small/25753403/stock-photo-wood-floorsunset-dreamscape',
      imageAlt: 'nature2',
    },
    {
      imageSrc:
        'https://cdn.create.vista.com/api/media/small/539753116/stock-photo-beautiful-nature-scene-early-winter-mountains-sierra-nevada-landscapes-usa',
      imageAlt: 'person1',
    },
    {
      imageSrc:
        'https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg',
      imageAlt: 'person2',
    },
  ]

  categoryData = [
    {
      parentCategory: 'Laptop Gaming',
      childCategory: ['ASUS', 'ACER', 'MSI', 'LENOVO', 'DELL', 'HP', 'LG'],
    },
    {
      parentCategory: 'PC',
      childCategory: ['PC Amd', 'Pc Intel', 'Mini Pc'],
    },
    {
      parentCategory: 'Monitor',
      childCategory: ['LG', 'Samsung', 'View sonic'],
    },
    {
      parentCategory: 'Gaming gear',
      childCategory: ['Mouse', 'Keyboard', 'Headphone'],
    }
  ]

  ngOnInit(): void {
    // register();

    
  }
}
