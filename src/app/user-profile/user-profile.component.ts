import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../FirebaseService';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  editedUser: any = {};
  editMode = false;
  selectedFile: File | null = null;

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private afDatabase: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.fetchUserData();
  }

  toggleEditMode() {
    if (this.editMode) {
      this.saveChanges();
    } else {
      this.editMode = true;
      this.editedUser = JSON.parse(JSON.stringify(this.user));
    }
  }

  saveChanges() {
    if (this.selectedFile) {
      const filePath = `avatars/${this.selectedFile.name}`;
      this.firebaseService.uploadFile(this.selectedFile, filePath).subscribe(
        (downloadURL) => {
          this.editedUser.avatar = downloadURL;
          this.updateUserData();
        },
        (error) => {
          console.error('Error uploading file:', error);
          // Handle the error here
        }
      );
    } else {
      this.updateUserData();
    }
  }

  private updateUserData() {
    this.authService.getCurrentUser().subscribe((user) => {
      const uid = user ? user.uid : '';
      this.afDatabase.object(`users/${uid}`).update({
        name: this.editedUser.name,
        email: this.editedUser.email,
        location: this.editedUser.location,
        userDescription: this.editedUser.bio,
        userAvatar: this.editedUser.avatar,
        profession: this.editedUser.profession,
        workerSchedule: this.editedUser.availability,
      }).then(() => {
        this.user = this.editedUser;
        this.editMode = false;
      }).catch((error) => {
        console.error('Error updating user data:', error);
        // Handle the error here
      });
    });
  }

  private fetchUserData() {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        const uid = user.uid || '';
        this.afDatabase.object(`users/${uid}`).valueChanges().subscribe((userData: any) => {
          console.log('Fetched user data:', userData);
          if (userData) {
            this.user = {
              name: userData.name || '',
              email: userData.email || '',
              location: userData.location || '',
              bio: userData.userDescription || '',
              avatar: userData.userAvatar || '',
              profession: userData.profession || '',
              availability: userData.workerSchedule || [],
            };
          }
        });
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
