import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchComponent } from '../../components/search/search.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private router: Router) {

  }

  goToLogin(): void {
    
    this.router.navigate(['/login']);
  }

  goToHome(): void {
    console.log('clicked');
    this.router.navigate(['/']);
    // this.router.navigateByUrl('/home')
  }
}
