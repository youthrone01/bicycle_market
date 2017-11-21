import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
  user;
  all_bikes;
  new_search = "";
  constructor(private _mainService:MainService, private _router:Router) { }


  searchBike(){
    if(this.new_search == ''){
      this._mainService.getAllBikes((res)=>{
        this.all_bikes = res;
      })
    }else{
      this._mainService.searchBike(this.new_search, (res)=>{
        this.all_bikes = res;
      })
    }
  }
  contact(id){
    this._mainService.getContact(id, (res)=>{
      let info="Name: "+res.first_name+" "+res.last_name+"\n Email: "+res.email
      alert(info);
    })
  }
  delete(id){
    this._mainService.deleteBike(id, (res)=>{
      console.log(res);
      this._mainService.getAllBikes((res)=>{
        this.all_bikes = res;
      })
    })
  }

  ngOnInit() {
    if(this._mainService.user == null){
      this._router.navigate(['']);
    }else{
      this.user = this._mainService.user;
      this._mainService.getAllBikes((res)=>{
        this.all_bikes = res;
      })
    }
  }

}
