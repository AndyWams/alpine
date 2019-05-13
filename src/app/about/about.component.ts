import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).on('scroll', function () {
    if ($(document).scrollTop() >= 117) {

      $('.step-one').addClass('animated fadeInLeft');
      $('.draw-one').addClass('animated fadeInDown');
      $('.draw-two').addClass('animated fadeInDown');
      $('.draw-three').addClass('animated fadeInDown');

    } else {

      $('.step-one').removeClass('animated fadeInLeft');
    }
    });
  }
}
