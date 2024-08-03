import { NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { CarouselComponent, CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';

export interface Products {
  id: number | string;
  imageSrc?: string;
  imageAlt?: string;
  productName?: string;
  productDescription?: string;
  productDefaultPrice?: string;
}

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [NgFor, NgIf, CarouselModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent implements AfterViewInit ,OnDestroy {
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
  @ViewChild('owlCar') owlCar: CarouselComponent | undefined;
  // @ViewChild('owlCar', owlCar)
  @Output() newItemEvent = new EventEmitter<CarouselComponent>();



  @Input() productList: Products[] = [];

  constructor() {
    console.log('productList', this.productList);
    if (window.innerWidth < 1920) {
      console.log('margin = 8');
      
      this.customOptions.margin = 8;
    }

    
    
  }

  ngAfterViewInit(): void {
    console.log('owlCar', this.owlCar);
    this.newItemEvent.emit(this.owlCar);
  }

  ngOnDestroy(): void {
      console.log('destroy');
      
  }
}
