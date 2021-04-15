import { VisitService } from './../services/visit.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-story-page',
  templateUrl: './story-page.component.html',
  styleUrls: ['./story-page.component.scss']
})
export class StoryPageComponent implements OnInit {
  allVisits: any = []
  constructor(private http: HttpClient, private visitService: VisitService) {
    this.fetchAll()

   }

  fetchAll(){
    this.visitService.fetchAll().subscribe(data=>{
      this.allVisits = this.visitService.allVisits
    })
  }
  ngOnInit(): void {
  }

}
