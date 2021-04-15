import { ScheduleService } from './../services/schedule.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  schedule: any
  doctorId: number
  selected: string = 'Monday'
  selectedId: number
  showForm = false
  constructor(private route: ActivatedRoute, public scheduleService: ScheduleService) { }
  days: string[]= ['Monday','Tuesday','Wednesday','Thursday','Friday']
  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.doctorId = +params.id
     })
    this.fetchAll()
  }
fetchAll(){
  this.scheduleService.getScheduleById(this.doctorId).subscribe(
    data=>{
      this.schedule = this.scheduleService.schedule
    }
  )
}
onClick(id: number){
  this.selectedId = id
  this.showForm = !this.showForm

}
}
