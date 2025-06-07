import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component } from '@angular/core';
import { ProductItemComponent } from '../product-item/product-item.component';
import { Products } from '@core/models/product/product.model';

export enum ACCESSORIES_TYPE {
  GUITAR = 'GUITAR',
  PIANO = 'PIANO',
  ORGAN = 'ORGAN',
}

@Component({
    selector: 'app-all-accessories',
    imports: [ProductItemComponent, NgSwitch, NgSwitchDefault, NgSwitchCase],
    templateUrl: './all-accessories.component.html',
    styleUrl: './all-accessories.component.scss'
})

export class AllAccessoriesComponent {
  ACCESSORIES_TYPE = ACCESSORIES_TYPE;
  selectedAccessories: string = ACCESSORIES_TYPE.GUITAR;

  guitarAccessories: Products[] = [];
  pianoAccessories: Products[] = [];
  organAccessories: Products[] = [];

  constructor() {
  }

  toggleGuitarAccessories(): void {
    this.selectedAccessories = ACCESSORIES_TYPE.GUITAR
  }


  togglePianoAccessories(): void {
    this.selectedAccessories = ACCESSORIES_TYPE.PIANO;
  }

  toggleOrganAccessories(): void {
    this.selectedAccessories = ACCESSORIES_TYPE.ORGAN
  }
}
