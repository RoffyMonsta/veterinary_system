import { Login } from './../auth.actions';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from '../auth.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

  @Select (AuthState.isLoaded) loaded$: Observable<boolean>;
  @Select (AuthState.error) error$: Observable<string>;
  form: FormGroup;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: this.emailFormControl,
      password: this.passwordFormControl
    })
  }

  onSubmit(): void {
    console.log(this.form);
    if(this.form.valid){
      this.store.dispatch(new Login(this.form.value));
    }

  }

}

