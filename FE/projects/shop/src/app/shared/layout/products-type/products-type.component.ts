import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { ProductItemComponent } from '../product-item/product-item.component';
import { Product } from '@core/models/product/product.model';
import { ProductService } from '@core/service/product-service/product.service';

export enum PRODUCT_TYPE {
  GUITAR = 'GUITAR',
  PIANO = 'PIANO',
  ORGAN = 'ORGAN',
}

@Component({
    selector: 'app-products-type',
    imports: [MatTabsModule, ProductItemComponent, NgSwitch, NgSwitchDefault, NgSwitchCase],
    templateUrl: './products-type.component.html',
    styleUrl: './products-type.component.scss'
})
export class ProductsTypeComponent implements OnInit {
  PRODUCT_TYPE = PRODUCT_TYPE;
  selectedProduct: string = PRODUCT_TYPE.GUITAR;

  guitarProducts: Product[] = [];
  pianoProducts: Product[] = [];
  organProducts: Product[] = [];

  constructor(
    private productService: ProductService

  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.guitarProducts = response.results.data;
        this.pianoProducts = response.results.data;
        this.organProducts = response.results.data;
      },
      error: (err) => {
        console.error('Error loading products', err);
      }
    })
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
