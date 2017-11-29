import { Component, OnInit } from '@angular/core';
import { MainService } from './../main.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.css']
})
export class BikeComponent implements OnInit {
  user={
    first_name:"",
    last_name:"",
  };
  constructor(private _mainService:MainService, private _router:Router) {
    this.user = this._mainService.user;
   }
  logout(){
    this._mainService.user = null;
    this._router.navigate(['']);
    localStorage.removeItem('user');
  }
  ngOnInit() {
    if(localStorage.user == undefined){
      this._router.navigate(['']);
    }
  }

}
