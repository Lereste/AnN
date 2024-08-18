import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { ProductItemComponent } from '../product-item/product-item.component';
import { Products } from 'src/app/core/models/product/product.model';

export enum PRODUCT_TYPE {
  GUITAR = 'GUITAR',
  PIANO = 'PIANO',
  ORGAN = 'ORGAN',
}

@Component({
  selector: 'app-products-type',
  standalone: true,
  imports: [MatTabsModule, ProductItemComponent, NgIf, NgSwitch, NgSwitchDefault, NgSwitchCase],
  templateUrl: './products-type.component.html',
  styleUrl: './products-type.component.scss',
})
export class ProductsTypeComponent {
  PRODUCT_TYPE = PRODUCT_TYPE;
  selectedProduct: string = PRODUCT_TYPE.GUITAR;

  guitarProducts: Products[] = [];
  pianoProducts: Products[] = [];
  organProducts: Products[] = [];
  
  constructor() {
    this.guitarProducts = [
      {
        id: 1,
        imageSrc:
          'assets/image/products/guitar/Đàn Guitar Acoustic Martin 000Jr-10.jpg',
        imageAlt: 'Đàn Guitar Acoustic Martin 000Jr-10',
        productName: 'Đàn Guitar Acoustic Martin 000Jr-10',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: 14600000,
        // productSalePrice: "13.990.000"
      },
      {
        id: 2,
        imageSrc:
          'assets/image/products/guitar/Đàn Guitar Cordoba C1M-CE.jpg',
        imageAlt: 'Đàn Guitar Cordoba C1M-CE',
        productName: 'Đàn Guitar Cordoba C1M-CE',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: 7940000,
        // productSalePrice: "3.270.000"

      },
      {
        id: 3,
        imageSrc:
          'assets/image/products/guitar/Đàn Guitar Kapok-ld-14.jpg',
        imageAlt: 'Đàn Guitar Kapok-ld-14',
        productName: 'Đàn Guitar Kapok-ld-14',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: 2190000,
        // productSalePrice: "1.890.000"
      },
      {
        id: 4,
        imageSrc:
          'assets/image/products/guitar/Đàn Guitar Tanglewood TWBB SFCE.jpg',
        imageAlt: 'Đàn Guitar Tanglewood TWBB SFCE',
        productName: 'Đàn Guitar Tanglewood TWBB SFCE',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: 6240000,
        // productSalePrice: "	1.099.000"
      },
      {
        id: 5,
        imageSrc:
          'assets/image/products/guitar/Đàn Guitar Suzuki-SDG-6NL.jpg',
        imageAlt: 'Đàn Guitar Suzuki SDG-6NL',
        productName: 'Đàn Guitar Suzuki SDG-6NL',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: 3450000,
        // productSalePrice: "5.790.000"
      },
      {
        id: 6,
        imageSrc:
          'assets/image/products/guitar/Đàn Guitar Kapok-D-118AC.jpg',
        imageAlt: 'Đàn Guitar Kapok-D-118AC',
        productName: 'Đàn Guitar Kapok-D-118AC',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: 2720000,
        // productSalePrice: "2.950.000"
      },
      {
        id: 7,
        imageSrc:
          'assets/image/products/guitar/Đàn Guitar Tanglewood twcr dce crossroads.jpg',
        imageAlt: 'Đàn Guitar Tanglewood twcr dce crossroads',
        productName: 'Đàn Guitar Tanglewood twcr dce crossroads',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: 4150000,
        // productSalePrice: "3.150.000"
      },
    ];

    this.pianoProducts = [
      {
        id: 1,
        imageSrc:
          'assets/image/products/piano/Đàn Piano Điện Bora BX5 – 88 Phím.jpg',
        imageAlt: 'Đàn Piano Điện Bora BX5 – 88 Phím',
        productName: 'Đàn Piano Điện Bora BX5 – 88 Phím',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: 6490000,
        // productSalePrice: "13.990.000"
      },
      {
        id: 2,
        imageSrc:
          'assets/image/products/piano/Alesis 88 key Virtue WSB Đàn Piano Điện.jpg',
        imageAlt: 'Alesis 88 key Virtue WSB Đàn Piano Điện',
        productName: 'Alesis 88 key Virtue WSB Đàn Piano Điện',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: 11750000,
        // productSalePrice: "3.270.000"

      },
      {
        id: 3,
        imageSrc:
          'assets/image/products/piano/Đàn Piano Điện Alesis Concert.jpg',
        imageAlt: 'Đàn Piano Điện Alesis Concert',
        productName: 'Đàn Piano Điện Alesis Concert',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: 7290000,
        // productSalePrice: "1.890.000"
      },
      {
        id: 4,
        imageSrc:
          'assets/image/products/piano/Đàn Piano Điện Yamaha P-S500.jpg',
        imageAlt: 'Đàn Piano Điện Yamaha P-S500 Black / White',
        productName: 'Đàn Piano Điện Yamaha P-S500 Black / White',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: 39200000,
        // productSalePrice: "	1.099.000"
      },
      {
        id: 5,
        imageSrc:
          'assets/image/products/piano/Đàn Piano Điện Roland FP-10.jpg',
        imageAlt: 'Đàn Piano Điện Roland FP-10',
        productName: 'Đàn Piano Điện Roland FP-10',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: 15450000,
        // productSalePrice: "5.790.000"
      },
      {
        id: 6,
        imageSrc:
          'assets/image/products/piano/Đàn Piano Điện Yamaha P-125AWH + LP1.jpg',
        imageAlt: 'Đàn Piano Điện Yamaha P-125AWH + LP1',
        productName: 'Đàn Piano Điện Yamaha P-125AWH + LP1',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: 18490000,
        // productSalePrice: "2.950.000"
      },
      {
        id: 7,
        imageSrc:
          'assets/image/products/piano/Đàn Piano Cơ Kawai K-400.jpg',
        imageAlt: 'Đàn Piano Cơ Kawai K-400',
        productName: 'Đàn Piano Cơ Kawai K-400',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: 149500000,
        // productSalePrice: "3.150.000"
      },
    ];

    this.organProducts = [
      {
        id: 1,
        imageSrc:
          'assets/image/products/organ/Đàn Organ Casio CTK-3400.jpg',
        imageAlt: 'Đàn Organ Casio CTK-3400',
        productName: 'Đàn Organ Casio CTK-3400',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: 4190000,
        // productSalePrice: "13.990.000"
      },
      {
        id: 2,
        imageSrc:
          'assets/image/products/organ/Đàn Organ Kurtzman K300S.jpg',
        imageAlt: 'Đàn Organ Kurtzman K300S',
        productName: 'Đàn Organ Kurtzman K300S',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: 5150000,
        // productSalePrice: "3.270.000"

      },
      {
        id: 3,
        imageSrc:
          'assets/image/products/organ/Đàn Organ Roland EX10 – 61 KEY.jpg',
        imageAlt: 'Đàn Organ Roland EX10 – 61 KEY',
        productName: 'Đàn Organ Roland EX10 – 61 KEY',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: 5950000,
        // productSalePrice: "1.890.000"
      },
      {
        id: 4,
        imageSrc:
          'assets/image/products/organ/Đàn Organ Casio CT-X3000.jpg',
        imageAlt: 'Đàn Organ Casio CT-X3000',
        productName: 'Đàn Organ Casio CT-X3000',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: 7190000,
        // productSalePrice: "	1.099.000"
      },
      {
        id: 5,
        imageSrc:
          'assets/image/products/organ/Đàn Organ Kurtzman K360 – Keyboard.jpg',
        imageAlt: 'Đàn Organ Kurtzman K360 – Keyboard',
        productName: 'Đàn Organ Kurtzman K360 – Keyboard',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: 7390000,
        // productSalePrice: "5.790.000"
      },
      {
        id: 6,
        imageSrc:
          'assets/image/products/organ/Đàn Organ Roland BK3.jpg',
        imageAlt: 'Đàn Organ Roland BK3',
        productName: 'Đàn Organ Roland BK3',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: 14290000,
        // productSalePrice: "2.950.000"
      },
      {
        id: 7,
        imageSrc:
          'assets/image/products/organ/Đàn Organ Kurtzman SV800.jpg',
        imageAlt: 'Đàn Organ Kurtzman SV800',
        productName: 'Đàn Organ Kurtzman SV800',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: 16500000,
        // productSalePrice: "3.150.000"
      },
    ];
  }

  toggleGuitarProducts(): void {
    this.selectedProduct = PRODUCT_TYPE.GUITAR
  }

  togglePianoProducts(): void {
    this.selectedProduct = PRODUCT_TYPE.PIANO;
  }

  toggleOrganProducts(): void {
    this.selectedProduct = PRODUCT_TYPE.ORGAN;
  }
}
