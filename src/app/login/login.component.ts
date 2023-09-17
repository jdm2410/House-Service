import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Import your AuthService
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
  constructor(private authService: AuthService,private router: Router) {} // Inject the AuthService

  login() {
    
    // Call the login method from the AuthService
    this.authService.login(this.email, this.password)
      .then((user) => {
        if (user) {
          console.log('Login successful:', user);
          this.router.navigate(['/home']);
        } else {
          console.log('Login failed.');
          // Handle login error (display message to the user, etc.)
        }
      });
  }
}
