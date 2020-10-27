import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private http: HttpClient) {}

  url: string = 'http://localhost:3000/';

  // Add new User
  newUser(registerDetails) {
    return this.http.post(this.url + 'users', registerDetails);
  }

  // Add new User
  userLogin(loginDetails) {
    console.log('in service');

    return this.http.post(this.url + 'users/login', loginDetails);
  }

  logoutUser() {
    var user;
    return this.http.post(this.url + 'users/logout', user);
  }
}
