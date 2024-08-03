import { NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductItemComponent } from '../product-item/product-item.component';

interface SaleProducts {
  id: number;
  imageSrc: string;
  imageAlt: string;
  productName: string;
  productDescription: string;
  productDefaultPrice: string;
  productSalePrice: string;
}

@Component({
  selector: 'app-sale-products',
  standalone: true,
  imports: [NgFor, NgIf, CarouselModule, ProductItemComponent],
  templateUrl: './sale-products.component.html',
  styleUrl: './sale-products.component.scss'
})

export class SaleProductsComponent implements OnInit {
  saleProducts: SaleProducts[] = [];
  scrWidth: number = 0;
  owlCar: any;

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

  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  constructor() {
    this.saleProducts = [
      {
        id: 1,
        imageSrc:
          '../../../../assets/image/products/guitar/Đàn Guitar Acoustic Martin 000Jr-10.jpg',
        imageAlt: 'Đàn Guitar Acoustic Martin 000Jr-10',
        productName: 'Đàn Guitar Acoustic Martin 000Jr-10',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: "	14.600.000",
        productSalePrice: "13.990.000"
      },
      {
        id: 2,
        imageSrc:
          '../../../../assets/image/products/organ/Đàn Organ Casio Casiotone CT-S100.jpg',
        imageAlt: 'Đàn Organ Casio Casiotone CT-S100',

        productName: 'Đàn Organ Casio Casiotone CT-S100',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: "	3.370.000",
        productSalePrice: "3.270.000"

      },
      {
        id: 3,
        imageSrc:
          '../../../../assets/image/products/ukulele/Đàn ukulele Kala KA-ZCT-T Tenor.jpg',
        imageAlt: 'Đàn ukulele Kala KA-ZCT-T Tenor',
        productName: 'Đàn ukulele Kala KA-ZCT-T Tenor',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: "2.000.000",
        productSalePrice: "1.890.000"
      },
      {
        id: 4,
        imageSrc:
          '../../../../assets/image/products/kalima/Đàn Kalimba Gecko 17 Phím K17SD Gỗ Đàn Hương Đỏ.jpg',
        imageAlt: 'Đàn Kalimba Gecko 17 Phím K17SD Gỗ Đàn Hương Đỏ',
        productName: 'Đàn Kalimba Gecko 17 Phím K17SD Gỗ Đàn Hương Đỏ',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: "	1.199.000",
        productSalePrice: "	1.099.000"
      },
      {
        id: 5,
        imageSrc:
          '../../../../assets/image/products/violin/Đàn Violin Amati-1969 VF750 Vân Thật Size 4.jpg',
        imageAlt: 'Đàn Violin Amati-1969 VF750 Vân Thật Size 4/4',
        productName: 'Đàn Violin Amati-1969 VF750 Vân Thật Size 4/4',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: "6.000.000",
        productSalePrice: "5.790.000"
      },
      {
        id: 6,
        imageSrc:
          '../../../../assets/image/products/drum/Trống Cajon Echoslap VC201-MEX (Thái Lan).jpg',
        imageAlt: 'Trống Cajon Echoslap VC201-MEX (Thái Lan)',
        productName: 'Trống Cajon Echoslap VC201-MEX (Thái Lan)',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: "2.400.000",
        productSalePrice: "2.050.000"
      },
      {
        id: 7,
        imageSrc:
          '../../../../assets/image/products/drum/Bộ Trống Cơ Yamaha Jazz Drum TMD-YCR5.jpg',
        imageAlt: 'Bộ Trống Cơ Yamaha Jazz Drum TMD-YCR5',
        productName: 'Bộ Trống Cơ Yamaha Jazz Drum TMD-YCR5',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: "7.700.000",
        productSalePrice: "7.450.000"
      },
    ];
  }

  ngOnInit(): void {
    if (window.innerWidth < 1700) {
      this.customOptions.margin = 8;
    }

    // const now = new Date; // get current date
    // const firstDay = now.getDate() - now.getDay(); // First day is the day of the month - the day of the week
    // console.log('now.getDay()', now.getDay());

    // const lastDay = firstDay + 8; // last day is the first day + 8 ~ The first day (Monday) of next week
    // const firstday = new Date(now.setDate(firstDay)).toUTCString();
    // const getFirstDayOfNextWeek = new Date(now.setDate(lastDay)).toLocaleDateString();

    const today = new Date(); // Get today's date
    const dayOfWeek = today.getDay(); // Get the current day of the week
    let nextMonday;
    if (dayOfWeek === 0) { // If today is Sunday
      nextMonday = today;
    } else {
      const daysUntilMonday = 8 - dayOfWeek; // Calculate how many days until Monday
      nextMonday = new Date(today.getTime() + daysUntilMonday * 24 * 60 * 60 * 1000); // Add those days to today's date
    }
    console.log(nextMonday); // Output the date of next Monday

    this.countDown(nextMonday.toLocaleDateString());
  }

  outputEvent(event: any) {
    this.owlCar = event
  }

  onPrev() {
    this.owlCar.prev()
  }

  stopAutoplay(): void {
    this.owlCar.stopAutoplay();
  }

  startAutoplay(): void {
    this.owlCar.startAutoplay();
  }

  countDown(lastDay: string) {
    const initialInterval = setInterval(() => {
      const second = 1000;
      const minute = 1000 * 60;
      const hour = 1000 * 60 * 60;
      const day = 1000 * 60 * 60 * 24;
      const remainingTime = new Date(lastDay).getTime() - new Date().getTime();

      this.days = Math.floor(remainingTime / (day));
      this.hours = Math.floor((remainingTime % (day)) / (hour));
      this.minutes = Math.floor((remainingTime % (hour)) / (minute));
      this.seconds = Math.floor((remainingTime % (minute)) / second);

      if (remainingTime <= 0) {
        clearInterval(initialInterval);
      }
    }, 1000);
  }
}
