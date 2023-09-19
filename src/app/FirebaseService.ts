import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private storage: AngularFireStorage,
              private afDatabase: AngularFireDatabase) {}

  // Upload a file to Firebase Storage
  uploadFile(file: File, path: string): Observable<string | undefined> {
    const fileRef = this.storage.ref(path);
    const uploadTask = this.storage.upload(path, file);

    // Use from to convert Promise to Observable
    return from(uploadTask.then(async (snapshot) => {
      const downloadURL = await snapshot.ref.getDownloadURL();
      return downloadURL;
    }));
  }

  // Get the download URL of a file
  getDownloadURL(path: string): Observable<string | undefined> {
    const fileRef = this.storage.ref(path);
    return from(fileRef.getDownloadURL());
  }

  getUsersByRole(role: string): Observable<any[]> {
    // Query the database to get users with the specified role
    return this.afDatabase.list('/users', (ref) =>
      ref.orderByChild('role').equalTo(role)
    ).valueChanges();
  }
}
