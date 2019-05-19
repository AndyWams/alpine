import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../accounts/authentication-service.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = {};
  data;
  showProfile = false;
  showLogin = true;
  constructor(private authenticationService: AuthenticationService,
    public toastr: ToastrManager, private router: Router,) {
  }
  getUserInfo() {
    if (this.user !== '') {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      const extractDetails = { user: this.user };
      this.data = extractDetails;
    }
  }
  ngOnInit() {
    this.getUserInfo();
    this.fetchSingleUser();

  }

  fetchSingleUser() {
    if (this.user) {
      this.showProfile = true;
      this.showLogin = false;
    } else {
      this.showProfile = false;
      this.showLogin = true;
    }
  }

  logout() {
    if (this.authenticationService.currentUserValue) {
      this.authenticationService.logout();
    } this.toastr.successToastr('Good bye...', null, { toastTimeout: 1000 });
    this.router.navigate(['/accounts/login']);
  }

  home() {
    this.router.navigate(['/']);
  }


}
