import { AnimalService } from './../services/animal.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Animal } from '../models/animal.model';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.scss']
})
export class BoardUserComponent implements OnInit {
  animals: Animal[] = []
  form: any = {}
  addAnimal = false
  constructor(private userService: UserService, private animalService: AnimalService) { }

  ngOnInit(): void {
    this.fetchData()
  }
fetchData(){
  this.animalService.fetchAll().subscribe(data=>{
    this.animals = this.animalService.animals
  })
}
createAnimal(){
  this.animalService.add(this.form).subscribe(data=>{
    this.animals = this.form
    this.addAnimal = false
    this.fetchData();
  })
}
}
