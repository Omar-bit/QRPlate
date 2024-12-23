import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Category, CategoryService } from './category.service';
import { UserService } from './user.service';
export type Product = {
  id?: string;
  name: string;
  price: number;
  categoryId: string;
  img: string;
};
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';
  private categoriesUrl = 'http://localhost:3000/categories';

  constructor(private http: HttpClient, private userService: UserService) {}

  getProductsWithCategoriesForUser(): Observable<Product[]> {
    const user = localStorage.getItem('currentUser');
    const userId = user ? JSON.parse(user).id : null;
    return this.http.get<any[]>(this.categoriesUrl).pipe(
      // Filter categories by userId
      switchMap((categories: Category[]) => {
        const userCategories: Category[] = categories.filter(
          (category) => category.userId === userId
        );

        return this.http.get<any[]>(this.apiUrl).pipe(
          map((products) => {
            const userProducts = products.filter((product) =>
              userCategories.some(
                (category) => category.id === product.categoryId
              )
            );

            return userProducts.map((product) => {
              const category = userCategories.find(
                (cat) => cat.id === product.categoryId
              );
              return { ...product, category };
            });
          })
        );
      })
    );
  }
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }
  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/${id}`);
  }
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }

  getProductsByBusiness(businessName: string): Observable<any[]> {
    return this.userService.getUserByBuisnessName(businessName).pipe(
      switchMap((user) => {
        const userId = user ? user.id : null;

        return this.http.get<Category[]>(this.categoriesUrl).pipe(
          switchMap((categories) => {
            const userCategories: Category[] = categories.filter(
              (category) => category.userId === userId
            );

            return this.http.get<any[]>(this.apiUrl).pipe(
              map((products) => {
                const userProducts = products.filter((product) =>
                  userCategories.some(
                    (category) => category.id === product.categoryId
                  )
                );

                return userProducts.map((product) => {
                  const category = userCategories.find(
                    (cat) => cat.id === product.categoryId
                  );
                  return { ...product, category };
                });
              })
            );
          })
        );
      })
    );
  }
}
