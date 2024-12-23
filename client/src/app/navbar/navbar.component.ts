import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  buisnessName: string = '';
  qrCodeUrl: any;
  isQRCodeVisible = false;
  constructor(
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.buisnessName = this.userService.getCurrentUser().buisnessName;
    this.userService.getQRCode().subscribe({
      next: (blob: Blob) => {
        const objectUrl = URL.createObjectURL(blob);
        this.qrCodeUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      },
      error: (err) => {
        console.error('Error fetching QR code:', err);
      },
    });
  }

  toggleMenu() {
    console.log('toggleMenu', this.isMenuOpen);

    this.isMenuOpen = !this.isMenuOpen;
  }
  toggleQR() {
    this.isQRCodeVisible = !this.isQRCodeVisible;
  }
  closeQR(event: any) {
    if (event.target.classList.contains('qr')) {
      this.isQRCodeVisible = false;
    }
  }
  onLogout() {
    this.userService.logout();
  }
}
