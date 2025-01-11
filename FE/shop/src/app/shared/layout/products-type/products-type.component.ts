import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { ProductItemComponent } from '../product-item/product-item.component';
import { Products } from 'src/app/core/models/product/product.model';
import { ProductService } from 'src/app/core/service/product-service/product.service';

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
export class ProductsTypeComponent implements OnInit {
  PRODUCT_TYPE = PRODUCT_TYPE;
  selectedProduct: string = PRODUCT_TYPE.GUITAR;

  guitarProducts: Products[] = [];
  pianoProducts: Products[] = [];
  organProducts: Products[] = [];
  
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
