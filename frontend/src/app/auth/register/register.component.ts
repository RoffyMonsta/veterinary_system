import { Register } from './../auth.actions';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from '../auth.state';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  @Select (AuthState.isLoaded) loaded$: Observable<boolean>;
  @Select (AuthState.error) error$: Observable<string>;
  form: any = {};

  constructor(private store: Store) { }

  ngOnInit(): void {

  }

  onSubmit(): void {
    this.store.dispatch(new Register(this.form));
  }

}
