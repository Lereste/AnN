import { NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductItemComponent, Products } from '../product-item/product-item.component';

@Component({
  selector: 'app-sale-products',
  standalone: true,
  imports: [NgFor, NgIf, CarouselModule, ProductItemComponent],
  templateUrl: './sale-products.component.html',
  styleUrl: './sale-products.component.scss'
})

export class SaleProductsComponent implements OnInit {
  saleProducts: Products[] = [];
  scrWidth: number = 0;
  owlCar: any;

  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  constructor() {
    this.saleProducts = [
      {
        id: 1,
        imageSrc:
          'assets/image/products/guitar/Đàn Guitar Acoustic Martin 000Jr-10.jpg',
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
          'assets/image/products/organ/Đàn Organ Casio Casiotone CT-S100.jpg',
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
          'assets/image/products/ukulele/Đàn ukulele Kala KA-ZCT-T Tenor.jpg',
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
          'assets/image/products/kalima/Đàn Kalimba Gecko 17 Phím K17SD Gỗ Đàn Hương Đỏ.jpg',
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
          'assets/image/products/violin/Đàn Violin Amati-1969 VF750 Vân Thật Size 4.jpg',
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
          'assets/image/products/drum/Trống Cajon Echoslap VC201-MEX (Thái Lan).jpg',
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
          'assets/image/products/drum/Bộ Trống Cơ Yamaha Jazz Drum TMD-YCR5.jpg',
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
    this.countDown(this.getNextMonday());
  }

  getNextMonday() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)

    // Calculate how many days to add to get to the next Monday
    const daysUntilMonday = (8 - dayOfWeek) % 7 || 7;

    // Create a new Date object for the next Monday
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + daysUntilMonday);

    return nextMonday.toLocaleDateString();
}

  outputEvent(event: any) {
    this.owlCar = event
  }

  onPrev() {
    this.owlCar.prev();
  }

  onNext() {
    this.owlCar.next();
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
