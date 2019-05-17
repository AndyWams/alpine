import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private _http: HttpClient) { }
  url = 'https://alpyn.herokuapp.com';
  // url = 'http://localhost:3000'

  getUsers() {
    return this._http.get(`${this.url}/users`);
  }

  getUser(id) {
    return this._http.get(`${this.url}/users/${id}`);
  }

  createAccount(username: string, email: string, password: string) {
    const user = {
      username: username,
      email: email,
      password: password,
    };
    return this._http.post(`${environment.userUrl}/users/add`, user);
  }

  updateUser(id: string, username: string, email: string, password: string) {
    const user = {
      username: username,
      email: email,
      password: password,
    };
    return this._http.post(`${this.url}/users/update/${id}`, user);
  }

  deleteUser(id) {
    return this._http.get(`${this.url}/users/delete/${id}`);
  }
}
