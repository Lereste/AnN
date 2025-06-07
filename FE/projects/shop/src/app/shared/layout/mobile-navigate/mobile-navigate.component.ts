import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CategoryMobileComponent } from '../../components/category-mobile/category-mobile.component';
import { NgIf } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { SearchComponent } from '../../components/search/search.component';
import { filter } from 'rxjs';
// import 'animate.css'

@Component({
    selector: 'app-mobile-navigate',
    imports: [NgIf, CategoryMobileComponent, SearchComponent],
    templateUrl: './mobile-navigate.component.html',
    styleUrl: './mobile-navigate.component.scss'
})
export class MobileNavigateComponent implements OnInit {
  activeItem: 'category' | 'search' | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.activeItem = null;
      });
  }

  toggleItem(type: 'category' | 'search'): void {
    this.activeItem = this.activeItem === type ? null : type;
  }

  goToAccount(): void {
    this.router.navigate(['tai-khoan']);
  }

  goToCart(): void {
    this.router.navigate(['gio-hang']);
  }

  goToHomePage(): void {
    this.activeItem = null; // tắt các toggle
    this.router.navigate(['/']);
  }
}
