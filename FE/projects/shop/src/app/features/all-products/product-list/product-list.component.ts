import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../core/models/product/product.model';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [NgFor, NgIf, MatPaginatorModule]
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input() productList: Product[] = [];
  @Input() pageIndex = 0;
  @Input() pageSize = 0;
  @Input() length = 0;
  @Output() pageChange = new EventEmitter<PageEvent>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Đã bỏ productRows và groupProducts

  constructor() {
    console.log('products 2', this.productList);
  }

  ngOnInit(): void {
    // Không cần groupProducts
    console.log('products 2', this.productList);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Không cần groupProducts
  }

  onPageChange(event: PageEvent): void {
    this.pageChange.emit(event);
  }

  isMobileOrTablet(): boolean {
    return window.innerWidth <= 1024;
  }
}
