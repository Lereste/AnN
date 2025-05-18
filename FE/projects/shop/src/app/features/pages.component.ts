import { AfterViewInit, Component, PLATFORM_ID, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartService } from '@core/service/cart-service/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from '../shared/layout/header/header.component';
import { AdvertisingComponent } from '../shared/layout/advertising/advertising.component';
import { QuickContactsComponent } from '../shared/layout/quick-contacts/quick-contacts.component';
import { GoToTopComponent } from '../shared/components/go-to-top/go-to-top.component';
import { FooterComponent } from '../shared/layout/footer/footer.component';
import { MobileNavigateComponent } from '../shared/layout/mobile-navigate/mobile-navigate.component';

@Component({
  selector: 'app-pages',
  imports: [HeaderComponent, AdvertisingComponent, QuickContactsComponent, GoToTopComponent, FooterComponent, MobileNavigateComponent, RouterOutlet],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss',
})
export class PagesComponent implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);

  constructor(cartService: CartService) {
    cartService.initCartLocalStorage();
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({
        top: 0,
        behavior: 'instant',
      });
    }
  }
}
