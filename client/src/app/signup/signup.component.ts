import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  user = {
    name: '',
    buisnessName: '',
    buisnessType: '',
    email: '',
    password: '',
  };

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(): void {
    this.userService
      .signup(
        this.user.name,
        this.user.buisnessName,
        this.user.buisnessType,
        this.user.email,
        this.user.password
      )
      .subscribe(() => {
        this.router.navigate(['/sign-in']);
      });
  }
}
