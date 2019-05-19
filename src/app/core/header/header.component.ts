import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user = {};
  showProfile = false;
  showLogin = true;
  constructor() {
   }
   getUserInfo() {
     if(this.user !== '') {
       this.user = JSON.parse(localStorage.getItem('currentUser'));
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

}
