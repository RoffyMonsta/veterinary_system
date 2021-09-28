import { AuthState } from './../auth.state';
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { User } from '../auth.model';
import { Logout, UpdateUser } from '../auth.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit, OnDestroy {
  @Select (AuthState.user) user$: Observable<User>;
  changeUser = false;
  form: FormGroup;
  user: User;
  sub = new Subscription();
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.sub.add(
      this.user$.subscribe(
        val=>{
          this.user = val;
        }
      )
    );
    this.form = new FormGroup({
      fullname: new FormControl(this.user.fullname, [
        Validators.required
      ]),
      imgurl: new FormControl(this.user.imgurl, [
      ])
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
changeData(){
  this.changeUser = true;
}
onSubmit(){
  this.form.markAllAsTouched();
    if(this.form.valid){
      this.store.dispatch(new UpdateUser(this.form.value));
      this.changeUser = false;
    }
}

logout(){
  this.store.dispatch(new Logout());
}
}
