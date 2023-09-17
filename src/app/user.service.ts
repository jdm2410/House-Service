import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFireDatabase) {}

  // Function to add a user to the database
  addUserToDatabase(
    name: string,
    email: string,
    password: string,
    role: string,
    userDescription: string,
    userAvatar: string,
    workerSchedule: Record<string, string> // You can customize this type
  ) {
    // Generate a unique key for the user
    const userKey = this.db.createPushId();

    // Define the user object
    const user = {
      name,
      email,
      role,
      userDescription,
      userAvatar,
      workerSchedule,
    };

    // Set the user data under the unique key
    this.db.object(`users/${userKey}`).set(user)
      .then(() => {
        console.log('User added to the database successfully.');
      })
      .catch((error) => {
        console.error('Error adding user to the database:', error);
      });
  }
}
