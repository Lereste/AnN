import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchComponent } from '../../components/search/search.component';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/service/cart-service/cart.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  cartCount: number = 0;

  constructor(private router: Router, private cartService: CartService) {

  }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      if (!cart) return;

      this.cartCount = cart.items.length ?? 0;
    });
  }
 

  goToHome(): void {
    console.log('clicked');
    this.router.navigate(['/']);
    // this.router.navigateByUrl('/home')
  }

  goToAllProducts(): void {
    this.router.navigate(['/tat-ca-san-pham']);
  }
  

  goToAllArticles(): void {
    this.router.navigate(['/tat-ca-bai-viet']);
  }

  goToContact(): void {
    this.router.navigate(['/lien-he']);
  }

  goToCart(): void {
    this.router.navigate(['/gio-hang']);
  }
}
