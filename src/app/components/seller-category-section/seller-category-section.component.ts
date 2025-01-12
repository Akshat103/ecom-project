// seller-category-section.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../model/category.model';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-seller-category-section',
  templateUrl: './seller-category-section.component.html',
  styleUrl: './seller-category-section.component.scss'
})
export class SellerCategorySectionComponent implements OnInit {
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  searchForm: FormGroup;
  createForm: FormGroup;
  editForm: FormGroup;
  showCreateForm = false;
  editingCategory: Category | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.searchForm = this.fb.group({
      searchTerm: ['']
    });

    this.createForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      image: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });

    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      image: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }

  ngOnInit() {
    this.loadCategories();
    this.searchForm.get('searchTerm')?.valueChanges.subscribe(() => {
      this.filterCategories();
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.filterCategories();
      },
      error: (error) => console.error('Error loading categories:', error)
    });
  }

  filterCategories() {
    const searchTerm = this.searchForm.get('searchTerm')?.value.toLowerCase() || '';
    this.filteredCategories = this.categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm)
    );
  }

  createCategory() {
    if (this.createForm.valid) {
      this.categoryService.createCategory(this.createForm.value).subscribe({
        next: () => {
          this.loadCategories();
          this.showCreateForm = false;
          this.createForm.reset();
        },
        error: (error) => console.error('Error creating category:', error)
      });
    }
  }

  startEdit(category: Category) {
    this.editingCategory = category;
    this.editForm.patchValue({
      name: category.name,
      image: category.image
    });
  }

  updateCategory() {
    if (this.editForm.valid && this.editingCategory?.id) {
      this.categoryService.updateCategory(
        this.editingCategory.id,
        this.editForm.value
      ).subscribe({
        next: () => {
          this.loadCategories();
          this.editingCategory = null;
          this.editForm.reset();
        },
        error: (error) => console.error('Error updating category:', error)
      });
    }
  }

  cancelEdit() {
    this.editingCategory = null;
    this.editForm.reset();
  }

  deleteCategory(id: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => this.loadCategories(),
        error: (error) => console.error('Error deleting category:', error)
      });
    }
  }

  hasError(form: FormGroup, controlName: string, errorType: string): boolean {
    const control = form.get(controlName);
    return control?.errors?.[errorType] && control.touched || false;
  }
}