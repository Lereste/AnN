import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
  AfterContentInit,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { Categories } from '../../../core/models/category/category.model';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface FilterChangeEvent {
  selectedBrands: string[];
  selectedCategories: string[];
  priceRange: {
    min: number;
    max: number;
  };
}

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
  imports: [CommonModule, FormsModule, MatCheckboxModule, MatFormFieldModule, MatSliderModule, MatInputModule, MatExpansionModule, MatIconModule, MatTooltipModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFilterComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() brandList: any[] = [];
  @Input() categoryList: Categories[] = [];
  @Input() minPriceDiscount = 0;
  @Input() maxPriceDiscount = 0;
  @Input() selectedBrands: string[] = [];
  @Input() selectedCategories: string[] = [];
  @Input() selectedMinPriceDiscount = 0;
  @Input() selectedMaxPriceDiscount = 0;
  @Input() showPriceRange: boolean = true;

  @Output() filterChange = new EventEmitter<FilterChangeEvent>();
  @Output() resetAll = new EventEmitter<void>();

  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    // Initialize price range if not set
    if (this.selectedMinPriceDiscount === 0 && this.selectedMaxPriceDiscount === 0) {
      this.selectedMinPriceDiscount = this.minPriceDiscount;
      this.selectedMaxPriceDiscount = this.maxPriceDiscount;
    }
  }

  ngAfterViewInit(): void {}

  ngOnChanges(): void {
    // Chỉ cập nhật selectedMin/selectedMax nếu min/max thay đổi và selectedMin/selectedMax nằm ngoài khoảng mới
    if (this.minPriceDiscount > 0 && this.maxPriceDiscount > 0) {
      if (this.selectedMinPriceDiscount < this.minPriceDiscount || this.selectedMinPriceDiscount > this.maxPriceDiscount) {
        this.selectedMinPriceDiscount = this.minPriceDiscount;
      }
      if (this.selectedMaxPriceDiscount > this.maxPriceDiscount || this.selectedMaxPriceDiscount < this.minPriceDiscount) {
        this.selectedMaxPriceDiscount = this.maxPriceDiscount;
      }
    }
  }

  onBrandCheckboxChange(brandId: string, checked: boolean): void {
    console.log('onBrandCheckboxChange', brandId, checked);

    this.selectedBrands = checked ? [...this.selectedBrands, brandId] : this.selectedBrands.filter((id) => id !== brandId);
    this.emitFilterChange();
  }

  onCategoryCheckboxChange(categoryId: string, checked: boolean): void {
    this.selectedCategories = checked ? [...this.selectedCategories, categoryId] : this.selectedCategories.filter((id) => id !== categoryId);
    this.emitFilterChange();
  }

  onMinThumbInput(event: Event): void {
    const value = (event.target as HTMLInputElement)?.valueAsNumber ?? this.selectedMinPriceDiscount;
    this.selectedMinPriceDiscount = Math.min(value, this.selectedMaxPriceDiscount);
    this.filterByPriceDiscount();
  }

  onMaxThumbInput(event: Event): void {
    const value = (event.target as HTMLInputElement)?.valueAsNumber ?? this.selectedMaxPriceDiscount;
    this.selectedMaxPriceDiscount = Math.max(value, this.selectedMinPriceDiscount);
    this.filterByPriceDiscount();
  }

  onMinInputBlur(): void {
    const { min } = this.validatePriceRange(this.selectedMinPriceDiscount, this.selectedMaxPriceDiscount);
    this.selectedMinPriceDiscount = min;
    this.filterByPriceDiscount();
  }

  onMaxInputBlur(): void {
    const { max } = this.validatePriceRange(this.selectedMinPriceDiscount, this.selectedMaxPriceDiscount);
    this.selectedMaxPriceDiscount = max;
    this.filterByPriceDiscount();
  }

  private filterByPriceDiscount(): void {
    this.emitFilterChange();
  }

  private validatePriceRange(min: number, max: number): { min: number; max: number } {
    return {
      min: Math.max(min, this.minPriceDiscount),
      max: Math.min(max, this.maxPriceDiscount),
    };
  }

  private emitFilterChange(): void {
    // Chỉ emit khi min/max đã sẵn sàng
    if (this.minPriceDiscount === 0 && this.maxPriceDiscount === 0) {
      return;
    }
    this.filterChange.emit({
      selectedBrands: this.selectedBrands,
      selectedCategories: this.selectedCategories,
      priceRange: {
        min: this.selectedMinPriceDiscount,
        max: this.selectedMaxPriceDiscount,
      },
    });
    this.cdr.markForCheck();
  }

  resetAllFilters(): void {
    this.resetAll.emit();
  }
}
