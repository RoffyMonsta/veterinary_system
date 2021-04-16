import { Animal } from './../models/animal.model';
import { ActivatedRoute } from '@angular/router';
import { AnimalService } from './../services/animal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animal-page',
  templateUrl: './animal-page.component.html',
  styleUrls: ['./animal-page.component.scss']
})
export class AnimalPageComponent implements OnInit {
  animalId: number
  animal: Animal
  constructor(private animalService: AnimalService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.animalId = +params.id
     })
    this.fetchData();
  }
fetchData(){
  this.animalService.fetchById(this.animalId).subscribe(data=>{
    this.animal = this.animalService.oneAnimal[0]
  })
}
}
