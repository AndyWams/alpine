import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/accounts/authentication-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy  {
  user = {};
  showProfile = false;
  showLogin = true;
  data;
  constructor(private authenticationService: AuthenticationService,
    public toastr: ToastrManager, private router: Router,
    private ref: ChangeDetectorRef
   ) {
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
    $(document).on('scroll', function () {

      if ($(document).scrollTop() >= 20) {

        $('.navbar').addClass('compressed');
      } else {

        $('.navbar').removeClass('compressed');
      }
    });
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
    this.authenticationService.logout();
  }

  profile() {
    this.router.navigate(['/profile']);
  }

  ngOnDestroy() {
    this.ref.markForCheck();
  }


}
