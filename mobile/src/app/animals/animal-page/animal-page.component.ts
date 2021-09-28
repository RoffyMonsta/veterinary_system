import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
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
  constructor() { }

  ngOnInit() {}

}
