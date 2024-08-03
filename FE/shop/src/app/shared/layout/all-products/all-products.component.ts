import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { ProductItemComponent, Products } from '../product-item/product-item.component';

export enum PRODUCT_TYPE {
  GUITAR = 'GUITAR',
  PIANO = 'PIANO',
  ORGAN = 'ORGAN',
}

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [MatTabsModule, ProductItemComponent, NgIf, NgSwitch, NgSwitchDefault, NgSwitchCase],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss',
})
export class AllProductsComponent {
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
          '../../../../assets/image/products/guitar/Đàn Guitar Acoustic Martin 000Jr-10.jpg',
        imageAlt: 'Đàn Guitar Acoustic Martin 000Jr-10',
        productName: 'Đàn Guitar Acoustic Martin 000Jr-10',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: "14.600.000",
        // productSalePrice: "13.990.000"
      },
      {
        id: 2,
        imageSrc:
          '../../../../assets/image/products/guitar/Đàn Guitar Cordoba C1M-CE.jpg',
        imageAlt: 'Đàn Guitar Cordoba C1M-CE',
        productName: 'Đàn Guitar Cordoba C1M-CE',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: "7.940.000",
        // productSalePrice: "3.270.000"

      },
      {
        id: 3,
        imageSrc:
          '../../../../assets/image/products/guitar/Đàn Guitar Kapok-ld-14.jpg',
        imageAlt: 'Đàn Guitar Kapok-ld-14',
        productName: 'Đàn Guitar Kapok-ld-14',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: "2.190.000",
        // productSalePrice: "1.890.000"
      },
      {
        id: 4,
        imageSrc:
          '../../../../assets/image/products/guitar/Đàn Guitar Tanglewood TWBB SFCE.jpg',
        imageAlt: 'Đàn Guitar Tanglewood TWBB SFCE',
        productName: 'Đàn Guitar Tanglewood TWBB SFCE',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: "	6.240.000",
        // productSalePrice: "	1.099.000"
      },
      {
        id: 5,
        imageSrc:
          '../../../../assets/image/products/guitar/Đàn Guitar Suzuki-SDG-6NL.jpg',
        imageAlt: 'Đàn Guitar Suzuki SDG-6NL',
        productName: 'Đàn Guitar Suzuki SDG-6NL',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: "3.450.000",
        // productSalePrice: "5.790.000"
      },
      {
        id: 6,
        imageSrc:
          '../../../../assets/image/products/guitar/Đàn Guitar Kapok-D-118AC.jpg',
        imageAlt: 'Đàn Guitar Kapok-D-118AC',
        productName: 'Đàn Guitar Kapok-D-118AC',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: "2.720.000",
        // productSalePrice: "2.950.000"
      },
      {
        id: 7,
        imageSrc:
          '../../../../assets/image/products/guitar/Đàn Guitar Tanglewood twcr dce crossroads.jpg',
        imageAlt: 'Đàn Guitar Tanglewood twcr dce crossroads',
        productName: 'Đàn Guitar Tanglewood twcr dce crossroads',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: "4.150.000",
        // productSalePrice: "3.150.000"
      },
    ];

    this.pianoProducts = [
      {
        id: 1,
        imageSrc:
          '../../../../assets/image/products/piano/Đàn Piano Điện Bora BX5 – 88 Phím.jpg',
        imageAlt: 'Đàn Piano Điện Bora BX5 – 88 Phím',
        productName: 'Đàn Piano Điện Bora BX5 – 88 Phím',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: "	6.490.000",
        // productSalePrice: "13.990.000"
      },
      {
        id: 2,
        imageSrc:
          '../../../../assets/image/products/piano/Alesis 88 key Virtue WSB Đàn Piano Điện.jpg',
        imageAlt: 'Alesis 88 key Virtue WSB Đàn Piano Điện',
        productName: 'Alesis 88 key Virtue WSB Đàn Piano Điện',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: "11.750.000",
        // productSalePrice: "3.270.000"

      },
      {
        id: 3,
        imageSrc:
          '../../../../assets/image/products/piano/Đàn Piano Điện Alesis Concert.jpg',
        imageAlt: 'Đàn Piano Điện Alesis Concert',
        productName: 'Đàn Piano Điện Alesis Concert',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: "7.290.000",
        // productSalePrice: "1.890.000"
      },
      {
        id: 4,
        imageSrc:
          '../../../../assets/image/products/piano/Đàn Piano Điện Yamaha P-S500.jpg',
        imageAlt: 'Đàn Piano Điện Yamaha P-S500 Black / White',
        productName: 'Đàn Piano Điện Yamaha P-S500 Black / White',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: "	39.200.000",
        // productSalePrice: "	1.099.000"
      },
      {
        id: 5,
        imageSrc:
          '../../../../assets/image/products/piano/Đàn Piano Điện Roland FP-10.jpg',
        imageAlt: 'Đàn Piano Điện Roland FP-10',
        productName: 'Đàn Piano Điện Roland FP-10',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: "15.450.000",
        // productSalePrice: "5.790.000"
      },
      {
        id: 6,
        imageSrc:
          '../../../../assets/image/products/piano/Đàn Piano Điện Yamaha P-125AWH + LP1.jpg',
        imageAlt: 'Đàn Piano Điện Yamaha P-125AWH + LP1',
        productName: 'Đàn Piano Điện Yamaha P-125AWH + LP1',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: "18.490.000",
        // productSalePrice: "2.950.000"
      },
      {
        id: 7,
        imageSrc:
          '../../../../assets/image/products/piano/Đàn Piano Cơ Kawai K-400.jpg',
        imageAlt: 'Đàn Piano Cơ Kawai K-400',
        productName: 'Đàn Piano Cơ Kawai K-400',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: "149.500.000",
        // productSalePrice: "3.150.000"
      },
    ];

    this.organProducts = [
      {
        id: 1,
        imageSrc:
          '../../../../assets/image/products/organ/Đàn Organ Casio CTK-3400.jpg',
        imageAlt: 'Đàn Organ Casio CTK-3400',
        productName: 'Đàn Organ Casio CTK-3400',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: "	4.190.000",
        // productSalePrice: "13.990.000"
      },
      {
        id: 2,
        imageSrc:
          '../../../../assets/image/products/organ/Đàn Organ Kurtzman K300S.jpg',
        imageAlt: 'Đàn Organ Kurtzman K300S',
        productName: 'Đàn Organ Kurtzman K300S',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: "5.150.000",
        // productSalePrice: "3.270.000"

      },
      {
        id: 3,
        imageSrc:
          '../../../../assets/image/products/organ/Đàn Organ Roland EX10 – 61 KEY.jpg',
        imageAlt: 'Đàn Organ Roland EX10 – 61 KEY',
        productName: 'Đàn Organ Roland EX10 – 61 KEY',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: "5.950.000",
        // productSalePrice: "1.890.000"
      },
      {
        id: 4,
        imageSrc:
          '../../../../assets/image/products/organ/Đàn Organ Casio CT-X3000.jpg',
        imageAlt: 'Đàn Organ Casio CT-X3000',
        productName: 'Đàn Organ Casio CT-X3000',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: "	7.190.000",
        // productSalePrice: "	1.099.000"
      },
      {
        id: 5,
        imageSrc:
          '../../../../assets/image/products/organ/Đàn Organ Kurtzman K360 – Keyboard.jpg',
        imageAlt: 'Đàn Organ Kurtzman K360 – Keyboard',
        productName: 'Đàn Organ Kurtzman K360 – Keyboard',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: "7.390.000",
        // productSalePrice: "5.790.000"
      },
      {
        id: 6,
        imageSrc:
          '../../../../assets/image/products/organ/Đàn Organ Roland BK3.jpg',
        imageAlt: 'Đàn Organ Roland BK3',
        productName: 'Đàn Organ Roland BK3',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: "14.290.000",
        // productSalePrice: "2.950.000"
      },
      {
        id: 7,
        imageSrc:
          '../../../../assets/image/products/organ/Đàn Organ Kurtzman SV800.jpg',
        imageAlt: 'Đàn Organ Kurtzman SV800',
        productName: 'Đàn Organ Kurtzman SV800',
        productDescription:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        productDefaultPrice: "16.500.000",
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
