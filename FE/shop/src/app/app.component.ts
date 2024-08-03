import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PagesComponent } from './shared/pages/pages.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PagesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'shop';
}
