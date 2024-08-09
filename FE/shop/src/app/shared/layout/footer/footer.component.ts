import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  options: google.maps.MapOptions = {
    center: {lat: 40, lng: -20},
    zoom: 4
  };
}
