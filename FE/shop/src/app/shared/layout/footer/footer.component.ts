import { Component } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [GoogleMap],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  mapOptions: google.maps.MapOptions = {
    center: { lat: 40, lng: -20 },
    zoom: 4
  };

  
}
