import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).on('scroll', function () {


      if ($(document).scrollTop() >= 828) {

        $('.step-two').addClass('animated jello');

      } else {

        $('.step-two').removeClass('animated jello');
      }

      if ($(document).scrollTop() >= 960) {

        $('.rev-left').addClass('animated bounceInLeft');
        $('.rev-text').addClass('animated fadeInUp');

      } else {

        $('.rev-left').removeClass('animated bounceInLeft');
      }

      if ($(document).scrollTop() >= 1113) {

        $('.fix-left').addClass('animated bounceInLeft');
        $('.fix-text').addClass('animated fadeInUp');

      } else {

        $('.fix-left').removeClass('animated bounceInLeft');
      }

      if ($(document).scrollTop() >= 1334) {

        $('.outsource-left').addClass('animated bounceInLeft');
        $('.outsource-text').addClass('animated fadeInUp');

      } else {

        $('.outsource-left').removeClass('animated bounceInLeft');
      }

      if ($(document).scrollTop() >= 1515) {

        $('.freelance-left').addClass('animated bounceInLeft');
        $('.freelance-text').addClass('animated fadeInUp');

      } else {

        $('.freelance-left').removeClass('animated bounceInLeft');
      }


    });
  }

}
