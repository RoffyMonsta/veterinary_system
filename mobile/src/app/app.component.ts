import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { GetAnimals } from './animals/animal.actions';
import { AuthState } from './auth/auth.state';
import { Weekdays } from './symptom/symptom.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy{
  @Select (AuthState.isAuthenticated) isAuth$: Observable<boolean>;
  subscription = new Subscription();
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.subscription.add(
      this.isAuth$.subscribe(val=>{
        if(val){
          this.store.dispatch(new GetAnimals());
        }
      })
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
