import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject, AfterViewInit, AfterViewChecked, AfterContentInit } from '@angular/core';
import { ProductService } from '../../core/service/product-service/product.service';
import { IProductQueryParams, Product } from '../../core/models/product/product.model';
import { CategoryService } from '../../core/service/category-service/category.service';
import { Categories } from '../../core/models/category/category.model';
import { BrandService } from '../../core/service/brand-service/brand.service';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFilterComponent, FilterChangeEvent } from './product-filter/product-filter.component';
import { forkJoin } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { switchMap } from 'rxjs';
import { Subject, Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss',
  imports: [ProductListComponent, ProductFilterComponent, MatSelectModule, MatOptionModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllProductsComponent implements OnInit {
  private readonly DEFAULT_PAGE: number = 1;
  private readonly DEFAULT_LIMIT: number = 8;
  private readonly DEFAULT_MIN_PRICE: number = 0;
  private readonly DEFAULT_MAX_PRICE: number = 0;
  private readonly DEFAULT_SORT: string = '-createdAt';

  products: Product[] = [];
  categoryList: Categories[] = [];
  brandList: any[] = [];
  selectedCategories: string[] = [];
  selectedBrands: string[] = [];
  allFilteredProducts: Product[] = [];
  pageIndex: number = this.DEFAULT_PAGE - 1;
  pageSize: number = this.DEFAULT_LIMIT;
  totalProducts = 0;

  currentParams: IProductQueryParams = {
    page: this.DEFAULT_PAGE,
    limit: this.DEFAULT_LIMIT,
    minPrice: this.DEFAULT_MIN_PRICE,
    maxPrice: this.DEFAULT_MAX_PRICE,
    sort: this.DEFAULT_SORT,
  };

  // Thêm biến state cho filter giá
  minPrice: number = 0;
  maxPrice: number = 0;
  selectedMinPrice: number = 0;
  selectedMaxPrice: number = 0;

  private totalProductsRequest$ = new Subject<{ min: number; max: number }>();
  private destroyRef = inject(DestroyRef);

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly productService = inject(ProductService);
  private readonly categoryService = inject(CategoryService);
  private readonly brandService = inject(BrandService);

  ngOnInit(): void {
    this.loadInitialData();
  }


  getTotalProducts(min: number, max: number): void {
    this.totalProductsRequest$.next({ min, max });
  }

  private loadInitialData(): void {
    this.loadPriceRange();
    this.loadCategories();
    this.loadBrands();

    this.loadTotalProducts();
  }

  private loadTotalProducts(): void {
    this.totalProductsRequest$
      .pipe(
        switchMap(({ min, max }) => this.productService.getTotalProductByRangePrice(min, max)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((totals: number) => {
        this.totalProducts = totals;
        this.cdr.markForCheck();
      });
  }

  // Khi khởi tạo, gọi loadProducts với currentParams và subscribe để lấy dữ liệu
  private loadPriceRange(): void {
    this.productService.getMinMaxPriceDiscount().subscribe(({ min, max }) => {
      this.minPrice = min;
      this.maxPrice = max;
      this.selectedMinPrice = min;
      this.selectedMaxPrice = max;

      this.currentParams.minPrice = min;
      this.currentParams.maxPrice = max;
      this.getTotalProducts(min, max);

      this.loadProduct();
      this.cdr.markForCheck();

      // Sau khi có min/max, gọi loadProducts

    });
  }

  loadProduct(): void {
    console.log('this.currentParams.minPrice', this.currentParams.minPrice);

    this.productService
        .getProductsByFilterConditions(
          this.currentParams.page,
          this.currentParams.limit,
          this.currentParams.minPrice,
          this.currentParams.maxPrice,
          this.currentParams.sort
        )
        .subscribe((response: any) => {
          console.log('this.currentParams 1', this.currentParams);

          this.products = response.results?.data || [];
          this.cdr.markForCheck();
        });
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categoryList = res.results.data || [];
      this.cdr.markForCheck();
    });
  }

  loadBrands(): void {
    this.brandService.getAllBrands().subscribe((res) => {
      this.brandList = res.results.data || [];
      this.cdr.markForCheck();
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.currentParams.page = this.pageIndex + this.DEFAULT_PAGE;
    if (this.allFilteredProducts.length > 0) {
      this.products = this.paginate(this.allFilteredProducts);
      this.cdr.markForCheck();
    } else {
      this.productService
        .getProductsByFilterConditions(
        this.currentParams.page,
        this.currentParams.limit,
        this.currentParams.minPrice,
        this.currentParams.maxPrice,
        this.currentParams.sort
      ).subscribe((response: any) => {
        this.products = response.results?.data || [];
        // this.loadTotalProducts();
        this.cdr.markForCheck();
      });
    }
  }

  onSortChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    const sortMap: { [key: string]: string } = {
      createdAtDesc: '-createdAt',
      createdAtAsc: 'createdAt',
      priceAsc: 'priceDiscount',
      priceDesc: '-priceDiscount',
    };
    this.currentParams.sort = sortMap[value] || '';
    this.resetPagination();
    this.productService
        .getProductsByFilterConditions(
      this.currentParams.page,
      this.currentParams.limit,
      this.currentParams.minPrice,
      this.currentParams.maxPrice,
      this.currentParams.sort
    ).subscribe((response: any) => {
      this.products = response.results?.data || [];
      // this.loadTotalProducts();
      this.cdr.markForCheck();
    });
  }

  onFilterChange(event: FilterChangeEvent): void {
    this.selectedBrands = event.selectedBrands;
    this.selectedCategories = event.selectedCategories;

    this.selectedMinPrice = event.priceRange.min;
    this.selectedMaxPrice = event.priceRange.max;

    this.currentParams.minPrice = event.priceRange.min;
    this.currentParams.maxPrice = event.priceRange.max;

    this.resetPagination();
    this.applyComprehensiveFilter();
  }

  onResetAllFilters(): void {
    this.selectedBrands = [];
    this.selectedCategories = [];
    this.selectedMinPrice = this.minPrice;
    this.selectedMaxPrice = this.maxPrice;
    this.currentParams = {
      page: this.DEFAULT_PAGE,
      limit: this.DEFAULT_LIMIT,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      sort: this.DEFAULT_SORT,
    };
    this.pageIndex = this.DEFAULT_PAGE - 1;
    this.loadProduct();
    this.getTotalProducts(this.minPrice, this.maxPrice);
    this.cdr.markForCheck();
  }

  private resetPagination(): void {
    console.log('currentParams', this.currentParams);

    this.pageIndex = this.DEFAULT_PAGE - 1;
    // Chỉ reset page về 1, giữ nguyên limit hiện tại
    this.currentParams.page = this.DEFAULT_PAGE;
    // Không reset limit: this.currentParams.limit = this.DEFAULT_LIMIT;
  }

  private paginate(list: Product[]): Product[] {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    return list.slice(start, end);
  }

  // Khi filter giá, category, brand, gọi loadProducts với giá trị filter tương ứng
  private applyComprehensiveFilter(): void {
    if (this.selectedBrands.length > 0 || this.selectedCategories.length > 0) {
      this.filterByBrandsAndCategories();
      return;
    }
    this.cdr.markForCheck();

    this.productService
        .getProductsByFilterConditions(
      this.currentParams.page,
      this.currentParams.limit,
      this.currentParams.minPrice,
      this.currentParams.maxPrice,
      this.currentParams.sort
    ).subscribe((response: any) => {
      this.products = response.results?.data || [];
      // Chỉ gọi loadTotalProducts sau khi products đã cập nhật xong
      // this.totalProducts = response.totals
      this.getTotalProducts(this.currentParams.minPrice as number, this.currentParams.maxPrice as number);
      this.cdr.markForCheck();
    });
  }

  filterByBrandsAndCategories(): void {
    const categoryRequests = this.selectedCategories.map((id) => this.categoryService.getProductsByCategoryId(id));
    const brandRequests = this.selectedBrands.map((id) => this.brandService.getProductsByBrandId(id));
    const allRequests = [...categoryRequests, ...brandRequests];

    forkJoin(allRequests).subscribe({
      next: (results: any[]) => {
        const categoryProducts = this.mergeResults(results.slice(0, this.selectedCategories.length));
        const brandProducts = this.mergeResults(results.slice(this.selectedCategories.length));

        let filtered: Product[];
        if (this.selectedCategories.length && this.selectedBrands.length) {
          filtered = this.intersectProducts(categoryProducts, brandProducts);
        } else if (this.selectedCategories.length) {
          filtered = categoryProducts;
        } else {
          filtered = brandProducts;
        }

        console.log('this.totalProducts', this.totalProducts);

        this.allFilteredProducts = filtered;
        this.totalProducts = filtered.length;
        this.products = this.paginate(filtered);
        this.cdr.markForCheck();
      },
      error: () => {
        this.allFilteredProducts = [];
        this.products = [];
        this.totalProducts = 0;
        this.cdr.markForCheck();
      },
    });
  }

  /** Gộp kết quả từ nhiều response, loại trùng id */
  private mergeResults(results: any[]): Product[] {
    const all = results.flatMap((res) => res.result?.data?.products || []);
    return Array.from(new Map(all.map((item) => [(item as any).id, item])).values());
  }

  /** Lấy giao giữa 2 mảng sản phẩm theo id */
  private intersectProducts(listA: Product[], listB: Product[]): Product[] {
    const idsB = new Set(listB.map((p) => (p as any).id));
    return listA.filter((p) => idsB.has((p as any).id));
  }

  get showPriceRange(): boolean {
    return this.selectedBrands.length === 0 && this.selectedCategories.length === 0;
  }
}
