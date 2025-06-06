import { Component } from '@angular/core';
import { GoToTopComponent } from '@components/go-to-top/go-to-top.component';
import { CategoryMainComponent } from '@layout/category-brand/category-brand.component';
import { ProductsTypeComponent } from '@layout/products-type/products-type.component';
import { AccessoriesTypeComponent } from '@layout/accessories-type/accessories-type.component';
import { ServiceSalesComponent } from '@layout/service-sales/service-sales.component';
import { HeroComponent } from '@layout/hero/hero.component';
import { SeoService } from '@core/service/seo/seo.service';
import { environment } from '@environments/environment.production';
import { ServiceProcessComponent } from '@layout/service-process/service-process.component';
import { SalesCommitmentComponent } from '@layout/sales-commitment/sales-commitment.component';
import { SwiperComponent } from '@components/swiper/swiper.component';
import { SaleProductsComponent } from '@layout/sale-products/sale-products.component';

@Component({
    selector: 'app-home',
    imports: [
        HeroComponent,
        // LatestProductsComponent,
        SaleProductsComponent,
        CategoryMainComponent,
        ProductsTypeComponent,
        AccessoriesTypeComponent,
        SalesCommitmentComponent,
        ServiceSalesComponent,
        ServiceProcessComponent,
        SwiperComponent,
        // FooterComponent,
        GoToTopComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
  name = environment.application.name;
  angular = environment.application.angular;
  bootstrap = environment.application.bootstrap;
  fontawesome = environment.application.fontawesome;

  constructor(private seoService: SeoService) {

    const content =
      'This application was developed with ' + this.angular + ' and ' + this.bootstrap +
      'It applies Routing, Lazy loading and Progressive Web App (PWA)';

    const title = 'Shop Title: Home Page';

    this.seoService.setMetaDescription(content);
    this.seoService.setMetaTitle(title);

  }
}
