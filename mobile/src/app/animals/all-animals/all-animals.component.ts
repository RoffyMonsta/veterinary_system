import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { AuthState } from 'src/app/auth/auth.state';
import { GetAnimals, SelectAnimal } from '../animal.actions';
import { Animal } from '../animal.model';
import { AnimalState } from '../animal.state';

@Component({
  selector: 'app-all-animals',
  templateUrl: './all-animals.component.html',
  styleUrls: ['./all-animals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllAnimalsComponent implements OnInit, OnDestroy {
  @Select (AnimalState.animals) animals$: Observable<Animal[]>;
  @Select (AuthState.isAuthenticated) isAuth$: Observable<boolean>;
  subscription = new Subscription();
  constructor(private store: Store) { }

  ngOnInit() {
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
