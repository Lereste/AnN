import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductItemComponent } from '../product-item/product-item.component';
import { Products } from '@core/models/product/product.model';
import { ProductService } from '@core/service/product-service/product.service';

export enum ACCESSORIES_TYPE {
  GUITAR = 'GUITAR',
  PIANO = 'PIANO',
  ORGAN = 'ORGAN',
}

@Component({
    selector: 'app-accessories-type',
    imports: [ProductItemComponent, NgSwitch, NgSwitchDefault, NgSwitchCase],
    templateUrl: './accessories-type.component.html',
    styleUrl: './accessories-type.component.scss'
})

export class AccessoriesTypeComponent implements OnInit {
  ACCESSORIES_TYPE = ACCESSORIES_TYPE;
  selectedAccessories: string = ACCESSORIES_TYPE.GUITAR;

  guitarAccessories: Products[] = [];
  pianoAccessories: Products[] = [];
  organAccessories: Products[] = [];

  constructor(
    private productService: ProductService,
  ) {

  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.guitarAccessories = response.results.data;
        this.pianoAccessories = response.results.data;
        this.organAccessories = response.results.data;
      },
      error: (err) => {
        console.error('Error loading products', err);
      }
    })
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
