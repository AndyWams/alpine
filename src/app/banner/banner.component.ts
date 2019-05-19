import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthenticationService } from '../accounts/authentication-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router,
    ) { }

  ngOnInit() {
    $(document).ready( () => {
      $('.go-up').on('click',  () => {
        $('html, body').animate({
          scrollTop: $('.main-content').offset().top
        }, 1000);
      });
    });
  }

  logout() {
    if (this.authenticationService.currentUserValue) {
      this.authenticationService.logout();
    }
    this.router.navigate(['/account/login']);
  }

}
