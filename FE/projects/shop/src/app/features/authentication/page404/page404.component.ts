import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-page404',
    imports: [],
    templateUrl: './page404.component.html',
    styleUrl: './page404.component.scss'
})
export class Page404Component {
  timeLeft: number = 15

  constructor(private router: Router) {
    const downloadTimer = setInterval(() => {
      this.timeLeft--;

      if (this.timeLeft <= 0) {
        this.router.navigate(['/']);
        clearInterval(downloadTimer);
      }
    }, 1000)
  }
}
