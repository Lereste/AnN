import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, Location, NgClass, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { CountryService } from '@core/service/country-service/country-service.service';
import { CheckoutForm, Cities, Districts, Wards } from '@core/models/checkout/checkout-form';
import { ReplaySubject, Subject, last, take, takeUntil } from 'rxjs';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CartService } from '@core/service/cart-service/cart.service';
import { MatTableModule } from '@angular/material/table';
import { Products } from '@core/models/product/product.model';
import urlSlug from 'url-slug';
import { Cart, CartItem, CartItemDetailed } from '@core/models/cart/cart.model';
import { ProductService } from '@core/service/product-service/product.service';

export enum PAYMENT_METHOD_TYPE {
  DIRECT = 'DIRECT',
  TRANSFER = 'TRANSFER',
  INSTALLMENT = 'INSTALLMENT',
}

@Component({
  selector: 'app-check-out',
  imports: [
    // CartOrderSummaryComponent,
    NgxMatSelectSearchModule,
    NgFor,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTableModule,
    NgSwitch,
    NgSwitchDefault,
    NgSwitchCase,
  ],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss',
})
export class CheckOutComponent implements OnInit, AfterViewInit {
  @ViewChild('singleSelect', { static: true }) singleSelect!: MatSelect;

  checkoutFormGroup!: FormGroup;
  checkoutForm: CheckoutForm = new CheckoutForm();

  citiesFilterCtrl: FormControl<string> = new FormControl<any>(null);
  filteredCities: ReplaySubject<Cities[]> = new ReplaySubject<Cities[]>(1);

  protected _onDestroy = new Subject<void>();

  cities!: Cities[];
  currentDistrict!: Districts[];
  currentWard!: Wards[];

  displayedColumns: string[] = ['product', 'quantity', 'price'];

  cartDataSource: any;

  unSubcribe$: Subject<any> = new Subject();
  checkoutProducts: Products[] = [];
  // cloneCheckoutProducts: Products[] = [];
  totalPrice?: number;

  PAYMENT_METHOD_TYPE = PAYMENT_METHOD_TYPE;
  selectedPaymentMethod: string = PAYMENT_METHOD_TYPE.TRANSFER;

  constructor(
    private productService: ProductService,
    private location: Location,
    private countryService: CountryService,
    private formBuilder: FormBuilder,
    private cartService: CartService
  ) {
    // Simulator already have api (with productSlug)
    // this.checkoutProducts.forEach((productItem) => {
    //   let temp = Object.assign({
    //     productSlug: urlSlug(productItem.productName, {
    //       dictionary: {
    //         đ: 'd',
    //         Đ: 'D',
    //       },
    //     }),
    //     ...productItem,
    //   });
    //   this.cloneCheckoutProducts.push(temp);
    // });
  }

  ngOnInit(): void {
    this.checkoutFormGroup = this._createCheckoutForm();
    this.loadCitiesData();

    this.citiesFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.filterCities();
    });

    this.getProductsCart();
  }

  ngAfterViewInit(): void {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });

    this.setInitialValue();
  }

  loadData(): void {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.checkoutProducts = response.results.data;
      },
      error: (err) => {
        console.error('Error loading products', err);
      },
    });
  }

  loadCitiesData(): void {
    this.countryService.getVietNamLocation().subscribe((response) => {
      this.cities = Object.values(response);
      // console.log('cities', this.cities); // mảng 63 tỉnh

      this.checkoutFormGroup.controls['city'].setValue(this.cities[44]);

      this.filteredCities.next(this.cities.slice());

      this.currentDistrict = Object.values(this.checkoutFormGroup.controls['city'].value.quan_huyen);

      // this.cities = response;
      // this.checkoutFormGroup.controls['city'].setValue(this.cities[49]);
      // this.filteredCities.next(this.cities.slice())
    });
  }

  protected filterCities() {
    if (!this.cities) return;

    // get the search keyword
    let search = this.citiesFilterCtrl.value;

    if (!search) {
      this.filteredCities.next(this.cities.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    // filter the banks
    this.filteredCities.next(this.cities.filter((city) => city.name_with_type.toLowerCase().indexOf(search) > -1));

    // console.log(this.cities.filter((city) => city.name_with_type.toLowerCase().indexOf(search) > -1));
  }

  protected setInitialValue() {
    this.filteredCities.pipe(take(1), takeUntil(this._onDestroy)).subscribe(() => {
      // setting the compareWith property to a comparison function
      // triggers initializing the selection according to the initial value of
      // the form control (i.e. _initializeSelection())
      // this needs to be done after the filteredCities are loaded initially
      // and after the mat-option elements are available
      // Vietsub: So sánh 2 gia trị: 1 của options sổ ra, 2 là khi mình chọn --> nếu giống nhau thì render nó ra mat-option
      this.singleSelect.compareWith = (a: any, b: any): boolean => {
        return a && b && a.code === b.code;
      };
    });
  }
  private _createCheckoutForm() {
    let phoneNumberRegex = {
      phone: '[0-9]',
    };

    return this.formBuilder.group({
      name: [this.checkoutForm.name, [Validators.required, Validators.maxLength(40)]],
      email: [this.checkoutForm.email, [Validators.required, Validators.email]],
      phone: [this.checkoutForm.phone, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      city: [this.checkoutForm.city, Validators.required],
      district: [this.checkoutForm.district, Validators.required],
      ward: [this.checkoutForm.ward, Validators.required],
      address: [this.checkoutForm.ward, Validators.required],
      note: [this.checkoutForm.note],
    });
  }

  onBackCart(): void {
    this.location.back();
  }

  getCurrentDistrict(): void {
    this.currentDistrict = Object.values(this.checkoutFormGroup.controls['city'].value.quan_huyen);
  }

  getCurrentWard(): void {
    this.currentWard = Object.values(this.checkoutFormGroup.controls['district'].value.xa_phuong);
  }

  getProductsCart(): void {
    let productList: CartItemDetailed[] = [];

    this.cartService.cart$.pipe(takeUntil(this.unSubcribe$)).subscribe((cartResponse: Cart) => {
      let _totalPrice = 0;

      if (!cartResponse) return;

      cartResponse.items.forEach((cartItem: CartItem) => {
        // chỗ này sẽ đổi thành call api getProductBySlug
        // VD: this.ordersService.getProductBySlug(cartItem.productSlug).subscribe(response => {
        this.checkoutProducts.forEach((productItem: Products) => {
          if (productItem.slug === cartItem.productSlug) {
            // productItem sẽ là respone trả về của api

            productList.push({
              product: productItem,
              quantity: cartItem.quantity,
            });

            _totalPrice += productItem.priceDiscount ? productItem.priceDiscount * cartItem.quantity : 0;
            this.totalPrice = _totalPrice;
          }
        });
      });
    });

    this.cartDataSource = productList;
    // console.log(this.cartDataSource);
  }

  toggleTransfer(): void {
    this.selectedPaymentMethod = PAYMENT_METHOD_TYPE.TRANSFER;
  }

  toggleDirect(): void {
    this.selectedPaymentMethod = PAYMENT_METHOD_TYPE.DIRECT;
  }

  toggleInstallment(): void {
    this.selectedPaymentMethod = PAYMENT_METHOD_TYPE.INSTALLMENT;
  }

  onCheckoutForm(): void {
    console.log(this.checkoutFormGroup.value);
  }
}
