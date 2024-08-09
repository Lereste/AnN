import { Component } from '@angular/core';
import { HeaderComponent } from '../layout/header/header.component';
import { AdvertisingComponent } from '../layout/advertising/advertising.component';
import { QuickContactsComponent } from '../layout/quick-contacts/quick-contacts.component';
import { GoToTopComponent } from '../components/go-to-top/go-to-top.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../layout/footer/footer.component';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    HeaderComponent,
    AdvertisingComponent,
    QuickContactsComponent,
    GoToTopComponent,
    FooterComponent,
    RouterOutlet
  ],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss',
})
export class PagesComponent {}
