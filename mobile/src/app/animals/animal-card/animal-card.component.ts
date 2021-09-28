import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeleteAnimal, SelectAnimal } from '../animal.actions';
import { Animal } from '../animal.model';
import { AnimalState } from '../animal.state';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalCardComponent implements OnInit {
  @Input() animal: Animal;
  constructor(private store: Store, private router: Router, private cd: ChangeDetectorRef) { }

  ngOnInit() {}
  selectAnimal(){
    this.store.dispatch(new SelectAnimal(this.animal.id));
    this.router.navigate(['/tabs/animals',this.animal.id]);
  }
  deleteAnimal(){
    this.store.dispatch(new DeleteAnimal(this.animal.id));
    this.cd.detectChanges();
  }
}
