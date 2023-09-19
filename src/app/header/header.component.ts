import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../data-storage.service';
import { AuthService } from '../auth.service';
import { User } from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User | null = null;
  userRole: string | null = null;
  userName: string | null = null; // Variable to store the user's name
  isLoggedIn = false; // Variable to track whether the user is logged in
  collapsed = true;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private router: Router
  ) {}

  onFetchData() {
    this.dataStorageService.fetchServices();
  }

  ngOnInit(): void {
    this.onFetchData();
    this.authService.user$.subscribe((user) => {
      if (user) {
        // User is logged in
        this.user = user;
        this.isLoggedIn = true;
        this.userName = user.displayName; // Get the user's display name
        this.authService.getUserRole(user.uid).then((role) => {
          this.userRole = role;
        });
      } else {
        // User is not logged in
        this.isLoggedIn = false;
      }
    });
  }

  // Function to log out the user
  logout() {
    this.authService.logout().then(() => {
      // After logging out, reset user-related variables
      this.userRole = null;
      this.userName = null;
      this.isLoggedIn = false;
      this.router.navigate(['/home']);
    });
  }
}
