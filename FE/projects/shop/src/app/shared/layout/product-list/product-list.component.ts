import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Products } from '../../../core/models/product/product.model';
import { ScrollingModule, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [ScrollingModule, NgFor, NgIf]
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input() productList: Products[] = [];
  @Output() loadMore = new EventEmitter<void>();
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;
  @Input() showLoadMore: boolean = true;

  rowHeight = 160; // Điều chỉnh theo chiều cao thực tế của 1 row (card + gap)
  productRows: (Products[] | 'button')[] = [];

  constructor() {
    console.log('products 2', this.productList);
  }

  ngOnInit(): void {
    this.groupProducts();
    console.log('products 2', this.productList);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productList']) {
      this.groupProducts();
    }
  }

  groupProducts() {
    this.productRows = [];
    for (let i = 0; i < this.productList.length; i += 4) {
      const row = this.productList.slice(i, i + 4);

      this.productRows.push(row);
      console.log('productRows', this.productRows);
    }
    // Thêm row đặc biệt cho button load more
    this.productRows.push('button');
  }

  onLoadMoreClick(): void {
    this.loadMore.emit();
  }
}
