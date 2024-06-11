import { Component } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { AdvertisingComponent } from '../../layout/advertising/advertising.component';
import { QuickContactsComponent } from '../../layout/quick-contacts/quick-contacts.component';
import { MainComponent } from '../../layout/main/main.component';
import { GoToTopComponent } from '../../components/go-to-top/go-to-top.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    MainComponent,
    AdvertisingComponent,
    QuickContactsComponent,
    GoToTopComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
