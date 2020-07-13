import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {
  hideToggle:boolean = true;


  constructor() { }

  ngOnInit() {
    this.hideToggle = true
  }

  hideWelcome() {
    if(this.hideToggle) {
      this.hideToggle = !this.hideToggle
    }


  }


}
