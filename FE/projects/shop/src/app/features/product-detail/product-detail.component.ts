import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, makeStateKey, TransferState, ChangeDetectorRef, inject, DestroyRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService, AngularToastifyModule } from 'angular-toastify';
import { Products } from '@core/models/product/product.model';
import { ProductService } from '@core/service/product-service/product.service';
import { HTTP_RESPONSE_STATUS } from '@core/constant/helper.const';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

enum DESCRIBE_TYPE {
  DESCRIPTION = 'description',
  SPECIFICATION = 'SPECIFICATION',
  VIDEO = 'VIDEO'
}

@Component({
  selector: 'app-product-detail',
  imports: [NgIf, FormsModule, CommonModule, AngularToastifyModule, NgSwitch, NgSwitchDefault, NgSwitchCase],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  saleProducts: Products[] = [];
  cloneSaleProducts: Products[] = [];
  currentProductDetailItem!: Products;


  decreaseQuantity: number = 0;
  increaseQuantity: number = 0;
  currentInputValue: number = 1; // default quantity product is 1

  DESCRIBE_TYPE = DESCRIBE_TYPE;
  selectedDescribe: string = DESCRIBE_TYPE.DESCRIPTION;
  SALE_PRODUCTS_KEY = makeStateKey<Products[]>('saleProducts');

  private destroyRef = inject(DestroyRef);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private productService: ProductService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private transferState: TransferState, // Inject TransferState,
    private cdr: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    const savedProducts = this.transferState.get(this.SALE_PRODUCTS_KEY, null);

    if (savedProducts) {
      this.saleProducts = savedProducts;
    }

    this.activatedRoute.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const productSlug = params['productSlug'];
        this.loadData(productSlug);
      });
  }

  loadData(productSlug: string): void {
    console.log('productSlug', productSlug);

    this.productService.getProductBySlugName(productSlug).subscribe({
      next: (response: any) => {
        if (!response || response.status !== HTTP_RESPONSE_STATUS.SUCCESS) return;
        console.log('response', response.results.product);
        this.currentProductDetailItem = response.results.product;
      },
      error: (err) => {
        console.error('Error loading products', err);
      },
    });
  }

  onSelectedQuantity(event: any) {
    // Limit value between 1 and 99
    if (parseInt(event.target.value) < parseInt(event.target.min)) {
      event.target.value = event.target.min;
    }
    if (parseInt(event.target.value) > parseInt(event.target.max)) {
      event.target.value = event.target.max;
    }

    this.currentInputValue = event.target.value;

  }

  onValidate(event: any): void {
    // chỉ có keydown mới validate đc text, keyup thì không
    if (['e', 'E', '+', '-'].includes(event.key)) {
      console.log(event.preventDefault());
      event.stopPropagation();
      event.preventDefault();
    }


    if (this.isEmpty(event.target.value)) {
      console.log('blur');

      this.currentInputValue = 1;
    }
  }

  isEmpty(str: string) {
    return !str.trim().length;
  }

  onDecreaseQuantity(): void {
    if (this.currentInputValue > 1 && this.currentInputValue < 100) {
      --this.currentInputValue;
    }
  }

  onIncreaseQuantity(): void {
    if (this.currentInputValue < 99) {
      ++this.currentInputValue;
    }
  }

  addToCart(): void {
    this.toastService.success('Đã thêm sản phẩm vào giỏ hàng!');
  }

  onBuyNow(): void {

  }

  onCallToBuy(): void {
    console.log('Calling to admin...');
  }

  //
  toggleDescription(): void {
    this.selectedDescribe = DESCRIBE_TYPE.DESCRIPTION;
  }

  toggleSpecifications(): void {
    this.selectedDescribe = DESCRIBE_TYPE.SPECIFICATION;
  }

  toggleVideo(): void {
    this.selectedDescribe = DESCRIBE_TYPE.VIDEO;
  }
}
