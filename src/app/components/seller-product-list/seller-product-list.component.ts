import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../model/product.model';
import { ProductService } from '../../services/product/product.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

@Component({
  selector: 'app-seller-product-list',
  templateUrl: './seller-product-list.component.html',
  styleUrl: './seller-product-list.component.scss'
})
export class SellerProductListComponent implements OnInit, OnDestroy {
  filterForm!: FormGroup;
  products: Product[] = [];
  currentOffset = 0;
  limit = 10;
  currentPage = 1;
  private formSubscription!: Subscription;

  categories = [
    { id: 1, name: 'Clothes' },
    { id: 2, name: 'Electronics' },
    { id: 3, name: 'Furniture' },
    { id: 4, name: 'Shoes' },
    { id: 5, name: 'Others' }
  ];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.initForm();
  }

  private initForm() {
    this.filterForm = this.fb.group({
      title: [''],
      price_min: [null],
      price_max: [null],
      categoryId: [null]
    });
  }

  ngOnInit() {
    // Subscribe to form changes with debounce
    this.formSubscription = this.filterForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
      )
      .subscribe(() => {
        this.currentOffset = 0;
        this.currentPage = 1;
        this.loadProducts();
      });

    this.loadProducts();
  }

  ngOnDestroy() {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }

  loadProducts() {
    const filters = this.filterForm.value;

    Object.keys(filters).forEach(key => {
      if (filters[key] === null || filters[key] === '') {
        delete filters[key];
      }
    });

    this.productService.getProducts(
      this.currentOffset,
      this.limit,
      filters
    ).subscribe(products => {
      this.products = products;
    });
  }

  previousPage() {
    if (this.currentOffset >= this.limit) {
      this.currentOffset -= this.limit;
      this.currentPage--;
      this.loadProducts();
    }
  }

  nextPage() {
    if (this.products.length === this.limit) {
      this.currentOffset += this.limit;
      this.currentPage++;
      this.loadProducts();
    }
  }

  editProduct(product: Product) {
    console.log('Edit product:', product);
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }
}
