import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = 'customer'; // Initialize with the default role 'customer'
  userDescription: string = '';
  userAvatar: string = 'https://t3.ftcdn.net/jpg/03/64/62/36/360_F_364623624_eTeYrOr8oM08nsPPEmV8gGb60E0MK5vp.jpg';
  workerSchedule: Record<string, string> = {}; // Customize the type as needed

  constructor(private authService: AuthService, private router: Router) {}

  // Registration method
  register() {
    // Determine the role based on the selected option
    const role = this.role === 'worker' ? 'worker' : 'customer';

    // Call the register method from AuthService with name, email, password, and role
    this.authService
      .register(this.name, this.email, this.password, role, this.userAvatar)
      .then((result) => {
        console.log('Registration successful:', result);
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Registration failed:', error);
        // Handle registration error (display a message to the user, etc.)
      });
  }
}
