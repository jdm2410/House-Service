import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { WorkRequest } from './request/work-request.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<CustomFirebaseAuthUser | null> = new BehaviorSubject<CustomFirebaseAuthUser | null>(null);
  public user$: Observable<CustomFirebaseAuthUser | null> = this.userSubject.asObservable();


  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {
    this.afAuth.authState.pipe(
      switchMap(async (user) => {
        if (user) {
          // Fetch additional user data from the database
          return this.getUserData(user.uid);
        } else {
          return null;
        }
      })
    ).subscribe((customUser: CustomFirebaseAuthUser | null) => {
      this.userSubject.next(customUser);
    });
  }

  async register(
    name: string,
    email: string,
    password: string,
    role: string,
    userAvatar: string,
    userDescription: string,
    workerSchedule: Record<string, string>,
    busySchedule: Record<string, boolean>,
    workRequest: WorkRequest[]
  ): Promise<CustomFirebaseAuthUser | null> {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
  
      if (userCredential.user) {
        await userCredential.user.updateProfile({
          displayName: name,
        });
  
        // Create the user entry with additional data
        await this.createUserEntry(userCredential.user.uid, {
          name,
          email,
          role,
          userAvatar,
          userDescription,
          workerSchedule,
          busySchedule,
          workRequest
        });
  
        // Fetch additional user data from the database
        return this.getUserData(userCredential.user.uid);
      }
  
      return null;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<CustomFirebaseAuthUser | null> {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);

      if (userCredential.user) {
        // Fetch additional user data from the database
        return this.getUserData(userCredential.user.uid);
      }

      return null;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      this.userSubject.next(null);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }

  private createUserEntry(uid: string, data: any): Promise<void> {
    return this.afDatabase.object(`users/${uid}`).set(data);
  }

  private async getUserData(uid: string): Promise<CustomFirebaseAuthUser | null> {
    try {
      const userData: any = await this.afDatabase.object(`users/${uid}`).valueChanges().pipe(first()).toPromise();
      if (userData) {
        // Merge user data with Firebase User object
        const customUser: CustomFirebaseAuthUser = {
          ...(await this.afAuth.currentUser),
          uid,
          email: userData.email || '',
          displayName: userData.displayName || '',
        };
        return customUser;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }
  getCurrentUser(): Observable<CustomFirebaseAuthUser | null> {
    return this.user$;
  }



  async getUserRole(uid: string): Promise<string | null> {
    try {
      const userData: any = await this.afDatabase.object(`users/${uid}`).valueChanges().pipe(first()).toPromise();
      if (userData) {
        return userData.role || null; // Assuming 'role' is the property that stores the user's role in your database
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
      throw error;
    }
  }
}

interface CustomFirebaseAuthUser extends User {
  // Define any additional custom properties here
}
