import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchComponent } from '../../components/search/search.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
}
