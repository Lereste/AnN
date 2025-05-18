import { Component } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
    // imports: [GoogleMap],
})
export class FooterComponent {
  mapOptions: google.maps.MapOptions = {
    center: { lat: 40, lng: -20 },
    zoom: 4
  };


}
