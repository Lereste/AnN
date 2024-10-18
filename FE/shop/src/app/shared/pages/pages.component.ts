import { AfterViewInit, Component, PLATFORM_ID, inject } from '@angular/core';
import { HeaderComponent } from '../layout/header/header.component';
import { AdvertisingComponent } from '../layout/advertising/advertising.component';
import { QuickContactsComponent } from '../layout/quick-contacts/quick-contacts.component';
import { GoToTopComponent } from '../components/go-to-top/go-to-top.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../layout/footer/footer.component';
import { MobileNavigateComponent } from '../layout/mobile-navigate/mobile-navigate.component';
import { CartService } from 'src/app/core/service/cart-service/cart.service';
import { isPlatformBrowser } from '@angular/common';

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
  private readonly platformId = inject(PLATFORM_ID);

  constructor(
    cartService: CartService,
  ) {
    cartService.initCartLocalStorage();
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      })
    }
  }
}
