import { DoctorService } from './../services/doctor.service';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Doctor } from '../models/doctor.model';

@Component({
  selector: 'app-visit-page',
  templateUrl: './visit-page.component.html',
  styleUrls: ['./visit-page.component.scss']
})
export class VisitPageComponent implements OnInit {
  allDoctors: Doctor[] = []
  constructor(public doctorService: DoctorService) { }

  ngOnInit(): void {
    this.fetchAll()
  }
  fetchAll(){
    this.doctorService.fetchAll().subscribe(data=>{
      this.allDoctors = this.doctorService.doctors
    })
  }
}
