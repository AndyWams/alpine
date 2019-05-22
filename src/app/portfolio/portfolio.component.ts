import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  constructor() { }

  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
  ngOnInit() {
    this.loadScript('assets/js/jquery-3.4.1.min.js');
    this.loadScript('assets/js/camera.min.js');
    this.loadScript('assets/js/plugins.js');
    this.loadScript('assets/js/easing.min.js');


    $(document).on('scroll', () => {
      if ($(document).scrollTop() >= 1690) {
        $('.step-three').addClass('animated zoomIn');
      } else {
        $('.step-three').removeClass('animated zoomIn');
      }
      });

  }
}
