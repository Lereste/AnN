import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, HostListener, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from '@core/models/product/product.model';
import { ProductService } from '@core/service/product-service/product.service';
import { ProductItemComponent } from '@layout/product-item/product-item.component';

@Component({
    selector: 'app-sale-products',
    templateUrl: './sale-products.component.html',
    styleUrl: './sale-products.component.scss',
    imports: [CarouselModule, ProductItemComponent],
})

export class SaleProductsComponent implements OnInit {
  saleProducts: Product[] = [];
  scrWidth: number = 0;
  owlCar: any;

  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  private readonly platformId = inject(PLATFORM_ID);
  nextMonday!: any;
  private cdr = inject(ChangeDetectorRef); // Inject ChangeDetectorRef

  constructor(
    private productService: ProductService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('nextmonday', this.getNextMonday())
      this.nextMonday = localStorage.getItem('nextmonday')
    }
  }

  ngOnInit(): void {
    this.countDown(this.nextMonday);

    this.loadData();
  }

  loadData(): void {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.saleProducts = response.results.data;
      },
      error: (err) => {
        console.error('Error loading products', err);
      }
    })
  }

  getNextMonday() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)

    // Calculate how many days to add to get to the next Monday
    const daysUntilMonday = (8 - dayOfWeek) % 7 || 7;

    // Create a new Date object for the next Monday
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + daysUntilMonday);

    return nextMonday.toLocaleDateString();
  }

  outputEvent(event: any) {
    this.owlCar = event
  }

  onPrev() {
    this.owlCar.prev();
  }

  onNext() {
    this.owlCar.next();
  }

  stopAutoplay(): void {
    this.owlCar.stopAutoplay();
  }

  startAutoplay(): void {
    this.owlCar.startAutoplay();
  }

  countDown(lastDay: string) {
    const initialInterval = setInterval(() => {
      const second = 1000;
      const minute = 1000 * 60;
      const hour = 1000 * 60 * 60;
      const day = 1000 * 60 * 60 * 24;
      const remainingTime = new Date(lastDay).getTime() - new Date().getTime();

      this.days = Math.floor(remainingTime / (day));
      this.hours = Math.floor((remainingTime % (day)) / (hour));
      this.minutes = Math.floor((remainingTime % (hour)) / (minute));
      this.seconds = Math.floor((remainingTime % (minute)) / second);

      if (remainingTime <= 0) {
        clearInterval(initialInterval);
      }

      this.cdr.detectChanges(); // Trigger change detection manually
    }, 1000);
  }
}
