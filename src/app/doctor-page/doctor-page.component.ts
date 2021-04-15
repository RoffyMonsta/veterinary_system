import { DoctorService } from './../services/doctor.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from '../models/doctor.model';

@Component({
  selector: 'app-doctor-page',
  templateUrl: './doctor-page.component.html',
  styleUrls: ['./doctor-page.component.scss']
})
export class DoctorPageComponent implements OnInit {
  doctor: any
  doctorId: number
  constructor(private route: ActivatedRoute, public doctorService: DoctorService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
       this.doctorId = +params.id
      })
    this.fetchData()
  }
  fetchData(){
this.doctorService.fetchById(this.doctorId).subscribe(data=>{

  this.doctor = this.doctorService.oneDoctor[0]
})
  }
  showSchedule(){
    this.router.navigate(['schedule',this.doctor.id])
  }
}
