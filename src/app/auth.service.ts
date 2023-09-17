import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase
  ) {}

  async register(name: string, email: string, password: string, role: string, userAvatar: string): Promise<User | null> {
    try {
      // Create a new user in Firebase Authentication
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);

      if (userCredential.user) {
        // Update the user's profile with the provided name
        await userCredential.user.updateProfile({
          displayName: name,
        });

        // Create a user entry in the Firebase Realtime Database with additional data, including role
        await this.createUserEntry(userCredential.user.uid, { name, email, role, userAvatar });

        return userCredential.user;
      }

      return null;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);

      if (userCredential.user) {
        return userCredential.user;
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
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }

  private createUserEntry(uid: string, data: any): Promise<void> {
    
    return this.afDatabase.object(`users/${uid}`).set(data);
  }

  async getUserRole(uid: string): Promise<string | null> {
    try {
      const userRef = this.afDatabase.object(`users/${uid}`); 

      return userRef
        .valueChanges()
        .pipe(first())
        .toPromise()
        .then((userData: any) => {
          return userData ? userData.role : null;
        })
        .catch((error) => {
          console.error('Error fetching user role:', error);
          throw error;
        });
    } catch (error) {
      console.error('Error fetching user role:', error);
      throw error;
    }
  }
  
  getCurrentUser(): Promise<User | null> {
    return new Promise<User | null>((resolve, reject) => {
      this.afAuth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      });
    });
  }

}
