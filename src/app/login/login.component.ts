import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string;
  password: string;
  displayName: string;
  loginError: string | null = null;// Property to hold login error message

  constructor(private authService: AuthService, private router: Router) {}

    login() {
    // Call the login method from the AuthService
    this.authService.login(this.email, this.password).then((user) => {
      if (user) {
        console.log('Login successful:', user);
        this.router.navigate(['/home']);
      } else {
        console.log('Login failed.');
        // Handle login error
        this.loginError = 'Invalid email or password. Please try again.'; // Set error message
        setTimeout(() => {
          this.loginError = null; // Clear the error message after a few seconds
        }, 5000); // Adjust the time (in milliseconds) the error message is displayed
      }
    });
  }
}