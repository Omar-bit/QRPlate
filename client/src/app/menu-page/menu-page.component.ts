import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css'],
})
export class MenuPageComponent implements OnInit {
  businessName: string = '';
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: any[] = [];
  searchQuery: string = '';
  selectedCategory: string = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.businessName = params.get('nameofbuisness')!;
      this.loadMenu();
    });
  }

  loadMenu() {
    this.productService.getProductsByBusiness(this.businessName).subscribe(
      (products) => {
        this.products = products;
        this.filteredProducts = products;

        this.categories = [...new Set(products.map((p) => p.category?.id))]
          .map((id) => products.find((p) => p.category?.id === id)?.category)
          .filter(Boolean);
      },
      (error) => {
        console.error('Error loading menu', error);
      }
    );
  }

  onSearch() {
    this.filterProducts();
  }

  onCategoryChange() {
    this.filterProducts();
  }

  filterProducts() {
    this.filteredProducts = this.products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase());
      const matchesCategory = this.selectedCategory
        ? product.category?.id === this.selectedCategory
        : true;

      return matchesSearch && matchesCategory;
    });
  }
}
