import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  PLATFORM_ID,
  OnInit,
  AfterViewInit,
  DestroyRef,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  of,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductService } from '@core/service/product-service/product.service';
import { Products } from '../../../core/models/product/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class SearchComponent implements OnInit, AfterViewInit {


  private readonly platformId = inject(PLATFORM_ID);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router)
  private readonly productService: ProductService = inject(ProductService);

  @Input() wordArray: string[] = ['Bạn đang muốn tìm gì?', 'Máy lạnh...', 'Tủ lạnh...', 'Máy giặt...'];
  @Input() typingSpeedMilliseconds = 120;
  @Input() deleteSpeedMilliseconds = 90;

  private idx: number = 0;
  textElement: string = '';

  searchControl = new FormControl('');
  products: Products[] = [];
  notFound = false;
  private cache = new Map<string, Products[]>();

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((keyword: string | null) => {
        const trimmed = keyword!.trim();

        // Trường hợp clear input
        if (!trimmed) {
          this.products = [];
          this.notFound = false;
          return;
        }

        // Trường hợp nhập lại y chang lần trước => lấy cache
        if (this.cache.has(trimmed)) {
          this.products = this.cache.get(trimmed) || [];
          this.notFound = this.products.length === 0;
          return;
        }

        // Trường hợp giá trị mới => gọi API
        this.productService.searchProductsByName(trimmed).subscribe({
          next: (response: any) => {
            this.products = response.results.products;
            this.notFound = response.results.products.length === 0;
            this.cache.set(trimmed, response.results.products); // lưu vào cache
          },
          error: () => {
            this.products = [];
            this.notFound = true;
          },
        });
      });
  }


  ngAfterViewInit(): void {
    // Optionally start animation after view init
    if (isPlatformBrowser(this.platformId)) {
      this.startTypingEffect();
    }
  }

  goToProductDetailPage(productItem: Products): void {
    this.router.navigate(['chi-tiet-san-pham/' + productItem.slug]);
  }

  private startTypingEffect(): void {
    timer(500).subscribe(() => this.typingEffect());
  }

  private typingEffect(): void {
    const word = this.wordArray[this.idx].split('');
    const loopTyping = () => {
      if (word.length > 0) {
        this.textElement += word.shift();
      } else {
        this.deletingEffect();
        return;
      }
      this.cdr.detectChanges();
      setTimeout(loopTyping, this.typingSpeedMilliseconds);
    };
    loopTyping();
  }

  private deletingEffect(): void {
    const word = this.wordArray[this.idx].split('');
    const loopDeleting = () => {
      if (word.length > 0) {
        word.pop();
        this.textElement = word.join('');
      } else {
        this.idx = (this.idx + 1) % this.wordArray.length;
        this.typingEffect();
        return;
      }
      this.cdr.detectChanges();
      setTimeout(loopDeleting, this.deleteSpeedMilliseconds);
    };

    if (isPlatformBrowser(this.platformId)) {
      loopDeleting();
    }
  }
}
