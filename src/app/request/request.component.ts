import { Component, OnInit } from '@angular/core';
import { WorkService } from './work.service';
import { AuthService } from '../auth.service';
import { CustomUser } from './custom-types'; // Import the CustomUser interface
import { WorkRequest } from './work-request.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  date: string;
  description: string;
  availableWorkers: CustomUser[] = [];
  selectedWorkerId: string | null = null;
  currentUserId: string | null = null;
  selectedDate: string = ''; // Initialize it with an empty string
  workRequest: WorkRequest = {
    id: '',
    userId: '',
    workerId: '',
    date: '',
    description: '',
    status: null,
  };

  constructor(
    private workService: WorkService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchAvailableWorkersWithRole('worker');

    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.currentUserId = user?.uid || null;
      }
    });
  }

  async createWorkRequest(): Promise<void> {
    console.log('Date:', this.selectedDate);
    console.log('Description:', this.description);
    console.log('Selected Worker ID:', this.selectedWorkerId);

    if (!this.selectedDate || !this.description || !this.selectedWorkerId) {
      // Handle form validation here (e.g., display an error message)
      console.log(
        'Validation failed. Please fill in all fields and select a worker.'
      );
      return;
    }

    try {
      if (!this.currentUserId) {
        console.error('Current user ID is null or undefined.');
        return;
      }

      // Create a new work request
      const workRequest: WorkRequest = {
        id: '',
        userId: this.currentUserId,
        workerId: this.selectedWorkerId,
        date: this.selectedDate,
        description: this.description,
        status: true,
      };

      // Submit the work request to your service (use your service's method)
      console.log('Submitting work request:', workRequest);
      await this.workService.saveWorkRequest(workRequest);

      // Work request successfully created, you can redirect or display a success message
      console.log('Work request successfully created.');
      location.reload();
    } catch (error) {
      console.error('Error creating work request:', error);
      // Handle the error as needed (e.g., display an error message)
    }
  }

  // Check if the worker is available based on workerSchedule
  isWorkerAvailable(worker: CustomUser): boolean {
    console.log(typeof worker.workRequest);
    return !worker.workRequest.find((e) => e.date === this.selectedDate);
  }

  // Fetch available workers with the 'worker' role
  private async fetchAvailableWorkersWithRole(role: string): Promise<void> {
    try {
      const users = await this.workService.fetchUsersWithRole(role);
      this.availableWorkers = users;

      for (const worker of this.availableWorkers) {
        const uid = worker.uid;
        console.log(typeof worker.workRequest);
        console.log('Worker UID:', uid);
      }

      console.log('Available Workers:', this.availableWorkers);
    } catch (error) {
      console.error('Error fetching available workers:', error);
      // Handle the error as needed
    }
  }

  selectWorker(worker: CustomUser): void {
    if (worker) {
      this.selectedWorkerId = worker.uid;
    } else {
      this.selectedWorkerId = null;
    }
  }
}
