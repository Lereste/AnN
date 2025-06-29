import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { ProductService } from '../../core/service/product-service/product.service';
import { Products } from '../../core/models/product/product.model';
import { NgFor } from '@angular/common';
import { ProductListComponent } from '../../shared/layout/product-list/product-list.component';
import { CategoryService } from '../../core/service/category-service/category.service';
import { Categories } from '../../core/models/category.model';
import { BrandService } from '../../core/service/brand-service/brand.service';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss',
  imports: [ProductListComponent, NgFor, MatListModule, MatCheckboxModule, MatFormFieldModule, MatSelectModule, MatOptionModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllProductsComponent implements OnInit {
  products: Products[] = [];
  categoryList: Categories[] = [];
  brandList: any[] = [];
  selectedCategories: string[] = [];
  selectedBrands: string[] = [];
  selectedCategory: string | null = null;
  selectedBrand: string | null = null;
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef)

  currentParams: any = { page: 1, limit: 8 };
  isLoading = false;
  showLoadMore = true;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.loadProducts(true);
    this.loadCategories();
    this.loadBrands();
  }

  loadProducts(reset: boolean = false): void {
    if (reset) {
      this.currentParams = { ...this.currentParams, page: 1, limit: 8 };
      this.showLoadMore = true;
    }
    this.productService.getAllProducts(this.currentParams).subscribe((response) => {
      const data = response.results.data || [];
      this.products = reset ? data : [...this.products, ...data];
      if (data.length < this.currentParams.limit) {
        this.showLoadMore = false;
      }
      this.cdr.markForCheck();
    });
  }

  onSortChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    if (value === 'rating') {
      this.currentParams.sort = '-ratingsAverage';
    } else if (value === 'createdAtDesc') {
      this.currentParams.sort = '-createdAt';
    } else if (value === 'createdAtAsc') {
      this.currentParams.sort = 'createdAt';
    } else if (value === 'priceAsc') {
      this.currentParams.sort = 'priceDiscount';
    } else if (value === 'priceDesc') {
      this.currentParams.sort = '-priceDiscount';
    } else {
      delete this.currentParams.sort;
    }
    this.loadProducts(true);
  }

  onLoadMore(): void {
    if (this.isLoading || !this.showLoadMore) return;
    this.isLoading = true;
    this.currentParams.page += 1;
    this.currentParams.limit = 4;
    this.productService.getAllProducts(this.currentParams).subscribe((response) => {
      const data = response.results.data || [];
      if (data.length === 0) {
        this.showLoadMore = false;
        this.isLoading = false;
        this.cdr.markForCheck();
        return;
      }
      this.products = [...this.products, ...data];
      if (data.length < 4) this.showLoadMore = false;
      this.isLoading = false;
      this.cdr.markForCheck();
    });
  }

  // Ví dụ: gọi API chỉ lấy một số field
  getNameAndPriceOnly() {
    this.currentParams.fields = 'name,price';
    this.currentParams.limit = 5;
    this.currentParams.page = 1;
    this.loadProducts(true);
  }

  // Ví dụ: filter nâng cao
  filterByPriceAndRating() {
    this.currentParams = {
      ...this.currentParams,
      'price[lt]': 1000,
      'ratingsAverage[gte]': 4.7,
      page: 1,
      limit: 8
    };
    this.loadProducts(true);
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

  onCategoryChange(categoryId: string, checked: boolean): void {
    if (checked) {
      this.selectedCategories.push(categoryId);
    } else {
      this.selectedCategories = this.selectedCategories.filter(id => id !== categoryId);
    }
    this.filterProducts();
  }

  onBrandChange(brandId: string, checked: boolean): void {
    if (checked) {
      this.selectedBrands.push(brandId);
    } else {
      this.selectedBrands = this.selectedBrands.filter(b => b !== brandId);
    }
    this.filterProducts();
  }

  filterProducts(): void {
    this.currentParams = { ...this.currentParams, page: 1 };
    if (this.selectedCategories.length > 0) {
      this.currentParams.category = this.selectedCategories.join(',');
    } else {
      delete this.currentParams.category;
    }
    if (this.selectedBrands.length > 0) {
      this.currentParams.brand = this.selectedBrands.join(',');
    } else {
      delete this.currentParams.brand;
    }
    this.loadProducts(true);
  }

  onCategoryDropdownChange(categoryId: string) {
    this.selectedCategory = categoryId;
    if (categoryId) {
      this.categoryService.getProductsByCategoryId(categoryId).subscribe((res: any) => {
        this.products = res.result.data.products || [];
        this.cdr.markForCheck();
      });
    } else {
      this.loadProducts(true);
    }
  }

  onBrandDropdownChange(brandId: string) {

    this.selectedBrand = brandId;
    if (brandId) {
      this.brandService.getProductsByBrandId(brandId).subscribe((res: any) => {
        console.log('resssssss', res);
        this.products = res.result.data.products || [];

        this.cdr.markForCheck();
      });
    } else {
      this.loadProducts(true);
    }
  }

  onBrandCheckboxChange(brandId: string, checked: boolean) {
    if (checked) {
      this.selectedBrands.push(brandId);
    } else {
      this.selectedBrands = this.selectedBrands.filter(id => id !== brandId);
    }
    this.filterByBrandsAndCategories();
  }

  onCategoryCheckboxChange(categoryId: string, checked: boolean) {
    if (checked) {
      this.selectedCategories.push(categoryId);
    } else {
      this.selectedCategories = this.selectedCategories.filter(id => id !== categoryId);
    }
    this.filterByBrandsAndCategories();
  }

  filterByBrandsAndCategories() {
    // Ưu tiên filter theo category nếu có chọn, nếu không thì theo brand, nếu không thì load all
    if (this.selectedCategories.length > 0) {
      // Nếu API không hỗ trợ nhiều id, gọi từng cái rồi gộp
      const requests = this.selectedCategories.map(id => this.categoryService.getProductsByCategoryId(id));
      Promise.all(requests.map(r => r.toPromise())).then(results => {
        this.products = results.flatMap((res: any) => res.result.data.products || []);
        this.cdr.markForCheck();
      });
    } else if (this.selectedBrands.length > 0) {
      const requests = this.selectedBrands.map(id => this.brandService.getProductsByBrandId(id));
      Promise.all(requests.map(r => r.toPromise())).then(results => {
        this.products = results.flatMap((res: any) => res.result.data.products || []);
        this.cdr.markForCheck();
      });
    } else {
      this.loadProducts(true);
    }
  }
}
