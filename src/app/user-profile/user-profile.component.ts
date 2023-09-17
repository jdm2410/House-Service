import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    contactNumber: '123-456-7890',
    location: 'New York, USA',
    avatar: 'data:image/jpeg;base64,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'
  };
  originalUser: any; 
  editMode = false; // Flag to track whether the user is in edit mode

  ngOnInit() {
    // Initialize user data, e.g., fetch user data from a service or API
    this.originalUser = JSON.parse(JSON.stringify(this.user));
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveProfile() {
    // Implement logic to save user profile changes
    // Update the user object with the edited information
    // Send a request to the server to save changes (if applicable)
    // Disable edit mode
    this.editMode = false;
  }

  cancelEdit() {
    // If the user cancels editing, reset any changes and disable edit mode
    // Optionally, you can revert the user object to its original state
    this.user = JSON.parse(JSON.stringify(this.originalUser));
    this.editMode = false;
  }
}