import { Register } from './../auth.actions';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from '../auth.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
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
  userNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: this.emailFormControl,
      password: this.passwordFormControl,
      username: this.userNameFormControl
    });
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if(this.form.valid){
      this.store.dispatch(new Register(this.form.value));
    }
  }

}
