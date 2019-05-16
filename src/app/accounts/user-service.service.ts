import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private _http: HttpClient) { }
url = 'http://localhost:4000';

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
    return this._http.post(`${this.url}/users/add`, user);
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
