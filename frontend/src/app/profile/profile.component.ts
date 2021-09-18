import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import {UserService} from '../services/user.service';
import {User} from './../models/user.model';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  changeUser = false
  currentUser: User;
  form: any = {};
  constructor(private token: TokenStorageService, private userService: UserService) {

  }

  ngOnInit(): void {
    this.fetchData();

  }
fetchData(){
this.userService.getUser().subscribe(userData=>{
this.currentUser = this.userService.currentUser
    })
}
changeData(){
  this.changeUser = true;
}
onSubmit(){
  this.userService.updateUser(this.form).subscribe(
    data=>{
      this.currentUser = this.form
      this.changeUser = false;
      window.location.reload();
      this.fetchData();
    }
  )
}
}
