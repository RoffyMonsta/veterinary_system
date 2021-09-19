import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Logout } from '../auth/auth.actions';
import { AuthState } from '../auth/auth.state';
import { TokenStorageService } from '../auth/token-storage.service';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {

  @Select(AuthState.isAuthenticated) isAuth$: Observable<boolean>;
  username: string;
  constructor(public dialog: MatDialog, private store: Store) { }
  ngOnInit(): void {
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
        this.store.dispatch(new Logout());
      });
  }

}
