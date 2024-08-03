import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

interface Category {
  id: number;
  brandName: string;
  image: string;
}

@Component({
  selector: 'app-category-brand',
  standalone: true,
  imports: [NgFor, NgIf, CarouselModule],
  templateUrl: './category-brand.component.html',
  styleUrl: './category-brand.component.scss'
})
export class CategoryMainComponent implements OnInit {
  categoryBrand: Category[] = []
  
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
      740: {
        items: 5
      },
      940: {
        items: 6
      },
      1150: {
        items: 7
      },
    },
    nav: false
  }

  constructor() {
    this.categoryBrand = [
      {
        id: 1,
        brandName: "Dell",
        image: "https://mygear.vn/media/brand/dell.jpg"
      },
      {
        id: 2,
        brandName: "Lenovo",
        image: "https://mygear.vn/media/brand/lenovo.png"
      },
      {
        id: 3,
        brandName: "LG",
        image: "https://mygear.vn/media/brand/lg.jpg"

      },
      {
        id: 4,
        brandName: "Samsung",
        image: "https://mygear.vn/media/brand/samsung.jpg"
      },
      {
        id: 5,
        brandName: "Alienware",
        image: "https://mygear.vn/media/brand/alienware.webp"
      },
      {
        id: 6,
        brandName: "AOC",
        image: "https://mygear.vn/media/brand/aoc.jpg"
      },
      {
        id: 7,
        brandName: "Gigabyte",
        image: "https://mygear.vn/media/brand/gigabyte.jpg"
      },
      {
        id: 8,
        brandName: "Intel",
        image: "https://mygear.vn/media/brand/intel.jpg"
      },
      {
        id: 9,
        brandName: "Dareu",
        image: "https://mygear.vn/media/brand/dareu.jpg"
      },
      {
        id: 10,
        brandName: "Galax",
        image: "https://mygear.vn/media/brand/galax.png"
      },
    ]
  }

  ngOnInit(): void {
    if (window.innerWidth < 1700) {
      this.customOptions.margin = 21;
    }
  }
}
