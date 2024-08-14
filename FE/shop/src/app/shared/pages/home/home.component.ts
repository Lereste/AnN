import { Component } from '@angular/core';
import { HeroComponent } from '../../layout/hero/hero.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { LatestProductsComponent } from '../../layout/latest-products/latest-products.component';
import { GoToTopComponent } from '../../components/go-to-top/go-to-top.component';
import { CategoryMainComponent } from '../../layout/category-brand/category-brand.component';
import { SaleProductsComponent } from '../../layout/sale-products/sale-products.component';
import { ProductsTypeComponent } from '../../layout/products-type/products-type.component';
import { AccessoriesTypeComponent } from '../../layout/accessories-type/accessories-type.component';
import { FacilityComponent } from '../../layout/facility/facility.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent, 
    LatestProductsComponent, 
    SaleProductsComponent,
    CategoryMainComponent, 
    ProductsTypeComponent,
    AccessoriesTypeComponent,
    FacilityComponent,
    FooterComponent, 
    GoToTopComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
