import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { HttpHeaders } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ContactservService {
  private mailApi = 'https://mailthis.to/HouseService'

  constructor(private http: HttpClient) { }

  PostMessage(input: any) {
    return this.http.post(this.mailApi, input, { responseType: 'text' })
      .pipe(
        map(
          (response) => {
            if (response) {
              return response;
            }else{
              return null;
            }
          },
          (error: any) => {
            return error;
          }
        )
      )
  }
}
