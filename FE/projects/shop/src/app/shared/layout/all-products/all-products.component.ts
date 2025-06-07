import { Products } from '@core/models/product/product.model';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { ProductItemComponent } from '../product-item/product-item.component';

export enum PRODUCT_TYPE {
  GUITAR = 'GUITAR',
  PIANO = 'PIANO',
  ORGAN = 'ORGAN',
}

@Component({
    selector: 'app-all-products',
    imports: [MatTabsModule, ProductItemComponent, NgSwitch, NgSwitchDefault, NgSwitchCase],
    templateUrl: './all-products.component.html',
    styleUrl: './all-products.component.scss'
})
export class AllProductsComponent {
  PRODUCT_TYPE = PRODUCT_TYPE;
  selectedProduct: string = PRODUCT_TYPE.GUITAR;

  guitarProducts: Products[] = [];
  pianoProducts: Products[] = [];
  organProducts: Products[] = [];

  constructor() {
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
