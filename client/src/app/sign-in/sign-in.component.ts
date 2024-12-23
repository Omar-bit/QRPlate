import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  login() {
    this.userService.login(this.email, this.password).subscribe(
      (user) => {
        if (user) {
          const userToBeStored = {
            id: user.id,
            name: user.name,
            email: user.email,
            buisnessName: user.buisnessName,
          };
          localStorage.setItem('currentUser', JSON.stringify(userToBeStored));
          this.router.navigate(['/manage-categories']);
        } else {
          this.errorMessage = 'Invalid credentials, please try again!';
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred, please try again later.';
      }
    );
  }
}
