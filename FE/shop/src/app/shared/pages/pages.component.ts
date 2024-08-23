import { AfterViewInit, Component } from '@angular/core';
import { HeaderComponent } from '../layout/header/header.component';
import { AdvertisingComponent } from '../layout/advertising/advertising.component';
import { QuickContactsComponent } from '../layout/quick-contacts/quick-contacts.component';
import { GoToTopComponent } from '../components/go-to-top/go-to-top.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../layout/footer/footer.component';
import { MobileNavigateComponent } from '../layout/mobile-navigate/mobile-navigate.component';
import { CartService } from 'src/app/core/service/cart-service/cart.service';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    HeaderComponent,
    AdvertisingComponent,
    QuickContactsComponent,
    GoToTopComponent,
    FooterComponent,
    MobileNavigateComponent,
    RouterOutlet
  ],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss',
})
export class PagesComponent implements AfterViewInit {
  constructor(
    cartService: CartService,
  ) {
    cartService.initCartLocalStorage();
  }

  ngAfterViewInit() {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    })
  }
}
