import { Login } from './../auth.actions';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from '../auth.state';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

  @Select (AuthState.isLoaded) loaded$: Observable<boolean>;
  @Select (AuthState.error) error$: Observable<string>;
  form: any = {};

  constructor(private store: Store) { }

  ngOnInit(): void {

  }

  onSubmit(): void {
    this.store.dispatch(new Login(this.form));
  }

}

