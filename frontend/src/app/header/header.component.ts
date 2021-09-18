import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, take } from 'rxjs/operators';
import { TokenStorageService } from '../auth/token-storage.service';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

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
  constructor(private tokenStorageService: TokenStorageService, public dialog: MatDialog) { }
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
          title: "Are you sure?",
          message: "You are about to log out "}
    });

    // listen to response
    dialogRef
      .afterClosed()
      .pipe(
        filter(result => !!result),
        take(1)
      )
      .subscribe(() => {
        this.tokenStorageService.signOut();
      });
  }

}
