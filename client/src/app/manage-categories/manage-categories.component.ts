import { Component, OnInit } from '@angular/core';
import { Category, CategoryService } from '../services/category.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css'],
})
export class ManageCategoriesComponent implements OnInit {
  categories: any = [];
  isAddCategoryModalVisible = false;

  base64Image: string = '';

  newCategory: Category = {
    name: '',
    img: '',
    userId: '',
  };

  constructor(
    private categoryService: CategoryService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategoriesByUser().subscribe((categories) => {
      this.categories = categories;
    });
  }

  showAddCategoryModal() {
    this.isAddCategoryModalVisible = true;
  }

  closeAddCategoryModal() {
    this.isAddCategoryModalVisible = false;
    this.resetNewCategory();
    this.base64Image = '';
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.base64Image = reader.result as string;
        this.newCategory.img = this.base64Image;
      };
      reader.readAsDataURL(file);
    }
  }

  addCategory() {
    const user = this.userService.getCurrentUser();
    const categoryData = { ...this.newCategory, userId: user.id };

    this.categoryService.addCategory(categoryData).subscribe(() => {
      this.loadCategories();
      this.closeAddCategoryModal();
    });
  }

  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.loadCategories();
    });
  }

  resetNewCategory() {
    this.newCategory = { name: '', img: '', userId: '' };
  }
}
