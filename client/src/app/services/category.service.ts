import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
export type Category = {
  id?: string;
  name: string;
  img: string;
  userId: string;
};
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/categories';

  constructor(private http: HttpClient, private userService: UserService) {}

  // Get categories for a specific user
  getCategoriesByUser(): Observable<Category[]> {
    const user = this.userService.getCurrentUser();
    const userId = user ? user.id : null;
    return this.http.get<any[]>(`${this.apiUrl}?userId=${userId}`);
  }
  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }
  deleteCategory(id: string): Observable<Category> {
    return this.http.delete<Category>(`${this.apiUrl}/${id}`);
  }
}
