import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
} from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AuthService } from '../auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FirebaseService } from '../FirebaseService'; // Adjust the import path to match your project
import { WorkRequest } from '../request/work-request.model';
import { WorkService } from '../request/work.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, AfterViewInit {
  selectedWorkRequest: WorkRequest[] | null = null;
  @ViewChild('calendar') calendarEl: ElementRef;
  private calendar: Calendar;
  user: any;
  editedUser: any;
  editMode = false;
  selectedFile: File | null = null;

  constructor(
    private authService: AuthService,
    private afDatabase: AngularFireDatabase,
    private firebaseService: FirebaseService,
    private workService: WorkService // Inject FirebaseService
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
      this.afDatabase
        .object(`users/${uid}`)
        .update({
          name: this.editedUser.name,
          email: this.editedUser.email,
          location: this.editedUser.location,
          userDescription: this.editedUser.bio,
          userAvatar: this.editedUser.avatar,
          profession: this.editedUser.profession,
          workerSchedule: this.editedUser.availability,
        })
        .then(() => {
          this.user = this.editedUser;
          this.editMode = false;
        })
        .catch((error) => {
          console.error('Error updating user data:', error);
          // Handle the error here
        });
    });
  }

  private fetchUserData() {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        const uid = user.uid || '';
        this.afDatabase
          .object(`users/${uid}`)
          .valueChanges()
          .subscribe((userData: any) => {
            if (userData) {
              this.user = {
                name: userData.name || '',
                email: userData.email || '',
                location: userData.location || '',
                bio: userData.userDescription || '',
                avatar: userData.userAvatar || '',
                profession: userData.profession || '',
                availability: userData.workerSchedule || [],
                busySchedule: userData.busySchedule || [],
                workRequest: userData.workRequest || [],
              };
            }
            this.workService.getAllWorkRequests().subscribe((response) => {
              this.selectedWorkRequest = response;
              this.user.workRequest = response;
              console.log(this.user);
            });
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
    console.log(this.user.workRequest);

    // Ensure that this.user.workRequest is an object
    const workRequestsObject =
      typeof this.user.workRequest === 'object' ? this.user.workRequest : {};

    // Map work requests to an array of event objects
    const events = Object.values(workRequestsObject).map((request: any) => ({
      title: request.description,
      start: new Date(request.date).toISOString().split('T')[0],
      id: request.id, // Include the ID of the work request
    }));
    console.log(events);
    this.calendar = new Calendar(this.calendarEl.nativeElement, {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      events: events, // Pass the events array
    });

    // Call render to display the events
    this.calendar.render();
  }

  public acceptRequest(request: WorkRequest) {
    this.authService.getCurrentUser().subscribe((user) => {
      const uid = user ? user.uid : '';
      const userWorkRequestRef = this.afDatabase.object(
        `users/${uid}/workRequest`
      );

      userWorkRequestRef
        .update({
          [request.id]: request,
        })
        .then(() => {
          this.workService.removeWorkRequest(request.id);
          location.reload();
        })
        .catch((error) => {
          console.error('Error updating user data:', error);
          // Handle the error here
        });
    });
  }
}
