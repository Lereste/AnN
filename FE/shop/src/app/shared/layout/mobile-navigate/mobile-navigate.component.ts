import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CategoryMobileComponent } from '../../components/category-mobile/category-mobile.component';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { SearchComponent } from '../../components/search/search.component';
// import 'animate.css'
import { CartComponent } from '../../pages/cart/cart.component';

@Component({
  selector: 'app-mobile-navigate',
  standalone: true,
  imports: [NgIf, CategoryMobileComponent, SearchComponent, CartComponent],
  templateUrl: './mobile-navigate.component.html',
  styleUrl: './mobile-navigate.component.scss'
})
export class MobileNavigateComponent implements OnInit, AfterViewInit {
  isCategory: boolean = false;
  isSearch: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
  }

  goToHomePage(): void {
    this.router.navigate(['/']);

    // hide another
    this.isCategory = false;
    this.isSearch = false;
  }

  showCategory(): void {
    this.isCategory = !this.isCategory;

    console.log('this.isCategory', this.isCategory);

    // hide another
    this.isSearch = false;
  }

  showSearch(): void {
    this.isSearch = !this.isSearch;

    // hide another
    this.isCategory = false;
  }

  goToAccount(): void {
    this.router.navigate(['tai-khoan']);
  }

  goToCart(): void {
    this.router.navigate(['gio-hang']);
  }
}
