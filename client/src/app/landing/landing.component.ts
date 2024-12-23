import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  ngOnInit(): void {}
  qrCodeImageUrl: string = '';

  constructor() {}

  navigateToSignUp() {
    // Logic for navigating to the sign-up page
  }
}
