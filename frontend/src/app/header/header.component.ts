import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  mobile: boolean = false
  showMenu: boolean = false
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showDoctorBoard = false;
  username: string;
  constructor(private tokenStorageService: TokenStorageService) { }
  ngOnInit(): void {
    if (window.screen.width < 960) {
      this.mobile = true;
    }
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showDoctorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
