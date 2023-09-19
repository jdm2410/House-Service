import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { WorkRequest } from './work-request.model';
import { map } from 'rxjs/operators';
import { User } from 'firebase/auth';
import { firstValueFrom, of } from 'rxjs';
import { CustomUser } from './custom-types';

@Injectable({
  providedIn: 'root',
})
export class WorkService {
  private workRequestsRef: AngularFireList<WorkRequest>;
  private workRequestSubject: BehaviorSubject<WorkRequest[] | null> =
    new BehaviorSubject<WorkRequest[] | null>(null);
  public workRequests$: Observable<WorkRequest[] | null> =
    this.workRequestSubject.asObservable();
  constructor(private db: AngularFireDatabase) {
    this.workRequestsRef = db.list<WorkRequest>('work-requests');
    // Change the reference as needed
  }

  // Save a work request to the Realtime Database
  saveWorkRequest(request: WorkRequest): Promise<void> {
    const newRequestRef = this.workRequestsRef.push(request); // Generate a unique ID
    request.id = newRequestRef.key; // Assign the generated ID to the request object

    return newRequestRef.set(request); // Set the request data with the generated ID
  }

  // Retrieve all work requests from the Realtime Database
  getAllWorkRequests(): Observable<WorkRequest[]> {
    return this.workRequestsRef.valueChanges();
  }

  getWorkRequestById(workRequestId: string): Observable<WorkRequest | null> {
    const workRequestRef = this.db.object(`work-requests/${workRequestId}}`);

    // Use AngularFire's valueChanges to get a real-time Observable
    return workRequestRef.valueChanges() as Observable<WorkRequest | null>;
  }

  getAllWorkRequestsForWorker(workerUid: string): Observable<WorkRequest[]> {
    // Assuming 'work-requests' is the path to your work requests in the database
    const workRequestsRef = this.db.list<WorkRequest>('work-requests', (ref) =>
      ref.orderByChild('workerUid').equalTo(workerUid)
    );

    return workRequestsRef.valueChanges();
  }

  removeWorkRequest(workRequestId: string): Promise<void> {
    return this.workRequestsRef.remove(workRequestId);
  }

  fetchAvailableWorkers(): Observable<User[]> {
    // Assuming you have a 'users' node in your Realtime Database with user data
    // and 'role' is a property that represents the user's role ('worker' or something similar)
    return this.db
      .list<User>('users', (ref) => ref.orderByChild('role').equalTo('worker'))
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.key, // Use 'key' to get the user's unique identifier
            ...(c.payload.val() as any), // Explicitly cast to 'any' here
          }))
        )
      );
  }
  getCurrentRequest(): Observable<WorkRequest[] | null> {
    return this.workRequests$;
  }

  async fetchUsersWithRole(role: string): Promise<CustomUser[]> {
    try {
      const snapshot = await firstValueFrom(
        this.db
          .list('users', (ref) => ref.orderByChild('role').equalTo(role))
          .snapshotChanges()
      );

      // Map the snapshot to User objects
      const users: CustomUser[] = snapshot.map((item) => {
        const key = item.key; // Use item.key to get the unique identifier (uid)
        let data = item.payload.val() as any;
        if (data.workRequest) {
          data.workRequest = Object.keys(data.workRequest).map((key) => ({
            id: key, // The child key (ID)
            ...data.workRequest[key], // Child data
          }));
        }
        return { uid: key, ...(data as any) } as CustomUser;
      });

      return users;
    } catch (error) {
      console.error('Error fetching users with role:', error);
      throw error;
    }
  }
}
