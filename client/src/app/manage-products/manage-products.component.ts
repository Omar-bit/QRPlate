import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../services/product.service';
import { Category, CategoryService } from '../services/category.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css'],
})
export class ManageProductsComponent implements OnInit {
  products: any = [];
  categories: any = [];
  base64Image: string = '';

  isAddProductModalVisible: boolean = false;
  isEditProductModalVisible: boolean = false;

  newProduct: Product = {
    name: '',
    price: 0,
    categoryId: '',
    img: '',
  };

  editedProduct: Product = {
    id: '',
    name: '',
    price: 0,
    categoryId: '',
    img: '',
  };

  constructor(
    private productService: ProductService,
    private categorieService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.productService
      .getProductsWithCategoriesForUser()
      .subscribe((products) => {
        this.products = products;
      });
  }

  loadCategories() {
    this.categorieService.getCategoriesByUser().subscribe((categories) => {
      this.categories = categories;
    });
  }

  addProduct() {
    this.productService.addProduct(this.newProduct).subscribe(() => {
      this.loadProducts();
      this.isAddProductModalVisible = false;
    });
  }

  deleteProduct(id: string | undefined) {
    if (!id) return;
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }

  showAddProductModal() {
    this.isAddProductModalVisible = true;
  }

  closeAddProductModal() {
    this.isAddProductModalVisible = false;
  }

  showEditProductModal(product: Product) {
    this.editedProduct = { ...product };
    this.isEditProductModalVisible = true;
  }

  closeEditProductModal() {
    this.isEditProductModalVisible = false;
  }

  updateProduct() {
    this.productService.updateProduct(this.editedProduct).subscribe(() => {
      this.loadProducts();
      this.isEditProductModalVisible = false;
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.newProduct.img = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onEditFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.editedProduct.img = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
