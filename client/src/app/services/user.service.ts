import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
export type User = {
  id?: string;
  name: string;
  buisnessName: string;
  buisnessType: string;
  email: string;
  password: string;
};
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';
  private menuURL = 'http://localhost:4200/menu/';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .get<any[]>(this.apiUrl)
      .pipe(
        map((users: any) =>
          users.find(
            (user: any) => user.email === email && user.password === password
          )
        )
      );
  }

  signup(
    name: string,
    buisnessName: string,
    buisnessType: string,
    email: string,
    password: string
  ): Observable<any> {
    const newUser = {
      id: Date.now().toString(),
      name,
      buisnessName,
      buisnessType,
      email,
      password,
    };
    return this.http.post(this.apiUrl, newUser);
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/sign-in']);
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser')!);
  }
  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  getUserByBuisnessName(buisnessName: string): Observable<User | undefined> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users: User[]) => {
        const user = users.find(
          (user: User) => user.buisnessName === buisnessName
        );
        return user;
      })
    );
  }
  getQRCode(): Observable<Blob> {
    const user = this.getCurrentUser();
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${
      this.menuURL + user.buisnessName
    }`;

    return this.http.get(qrUrl, { responseType: 'blob' });
  }
}
