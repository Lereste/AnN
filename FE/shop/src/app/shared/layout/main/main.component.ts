import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { FooterComponent } from './footer/footer.component';
import { LatestProductsComponent } from './latest-products/latest-products.component';
import { GoToTopComponent } from '../../components/go-to-top/go-to-top.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeroComponent, LatestProductsComponent, FooterComponent, GoToTopComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
