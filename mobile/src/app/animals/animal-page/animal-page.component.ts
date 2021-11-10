import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeleteAnimal, SelectAnimal } from '../animal.actions';
import { Animal } from '../animal.model';
import { AnimalState } from '../animal.state';

@Component({
  selector: 'app-animal-page',
  templateUrl: './animal-page.component.html',
  styleUrls: ['./animal-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalPageComponent implements OnInit {
  @Select (AnimalState.currentAnimal) animal$: Observable<Animal>;
  constructor(private router: Router, private store: Store) { }

  ngOnInit() {
  }
  deleteAnimal(animalId: number){
    this.store.dispatch(new DeleteAnimal(animalId));
  }
}
