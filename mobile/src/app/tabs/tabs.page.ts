import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from '../auth/auth.model';
import { AuthState } from '../auth/auth.state';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsPage {
  @Select (AuthState.isAuthenticated) isAuth$: Observable<boolean>;
  @Select (AuthState.user) user$: Observable<User>;
  constructor() {}

}
