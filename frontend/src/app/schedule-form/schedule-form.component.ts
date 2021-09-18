import { ScheduleService } from './../services/schedule.service';
import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { AnimalService } from '../services/animal.service';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.scss']
})
export class ScheduleFormComponent implements OnInit {
  @Input() selectedId

  form: any = {}
  animals: any
  selected = ''
  showForm= true
  constructor(private animalService: AnimalService, private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.fetchData()
    this.animals = this.animalService.animals;

  }
  fetchData(){
    this.animalService.fetchAll().subscribe(data=>{
      this.animals = this.animalService.animals

    })
  }
  addVisit(){

    this.scheduleService.add(this.form.animal,  this.selectedId).subscribe(data=>{
      this.showForm = false
      setTimeout(()=>{window.location.reload()},1500)
    })
  }

}
