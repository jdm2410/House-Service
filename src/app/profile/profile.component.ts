import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { AuthService } from '../auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  @ViewChild('calendar') calendarEl: ElementRef;
  private calendar: Calendar;

  user: any;
  editedUser: any;
  editMode = false;
  selectedFile: File | null = null; // Declare selectedFile here

  constructor(
    private authService: AuthService,
    private afDatabase: AngularFireDatabase
  ) {}

  ngOnInit() {
    // Fetch the user's data when the component initializes
    this.fetchUserData();
    
  }

  ngAfterViewInit() {
    this.initCalendar();
  }

  toggleEditMode() {
    if (this.editMode) {
      // Save the changes when exiting edit mode
      this.saveChanges();
    } else {
      // Enter edit mode and create a copy of the user for editing
      this.editMode = true;
      // Make a deep copy of the user object
      this.editedUser = JSON.parse(JSON.stringify(this.user));
    }
  }

  saveChanges() {
    // Resolve the promise to get the user's UID
    this.authService.getCurrentUser().then((user) => {
      const uid = user ? user.uid : '';
      // Update the user data in the database
      this.afDatabase.object(`users/${uid}`).update({
        name: this.editedUser.name,
        email: this.editedUser.email,
        location: this.editedUser.location,
        userDescription: this.editedUser.bio,
        userAvatar: this.editedUser.avatar,
        profession: this.editedUser.profession,
        workerSchedule: this.editedUser.availability,
      }).then(() => {
        // Update the user object with edited data
        this.user = this.editedUser;
        this.editMode = false; // Exit edit mode
      }).catch((error) => {
        console.error('Error updating user data:', error);
        // Handle the error here, e.g., show an error message to the user
      });
    });
  }
  

  private fetchUserData() {
    // Fetch user data and update the 'user' object
    this.authService.getCurrentUser().then((user) => {
      if (user) {
        const uid = user.uid || '';
        // Fetch the user's profile data from the Firebase Realtime Database
        this.afDatabase.object(`users/${uid}`).valueChanges().subscribe((userData: any) => {
          console.log('Fetched user data:', userData); // Add this line for debugging
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
    this.selectedFile = event.target.files[0] as File;
    this.editedUser.avatar = this.selectedFile.name;
  }
  

  private initCalendar() {
    console.log('Initializing Calendar...');
    this.calendar = new Calendar(this.calendarEl.nativeElement, {
      plugins: [dayGridPlugin, timeGridPlugin],
      initialView: 'timeGridWeek',
      events: this.user.availability
    });
    this.calendar.render();
  }
}
