import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main.service';
import { Router } from "@angular/router";
import io from "socket.io-client";

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
  user;
  all_bikes;
  new_search = "";
  login_users = [];

  private url = 'http://localhost:8000';
  private socket;
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

  comment(id){
    this._router.navigate(['comment','bikes', id]);
  }

  ngOnInit() {
    if(localStorage.user == undefined){
      this._router.navigate(['']);
    }else{
      this.user = JSON.parse( localStorage.user);
      this._mainService.getAllBikes((res)=>{
        this.all_bikes = res;
      })
      this.socket = io.connect(this.url);
      this.socket.emit('login',{user: this.user})
      this.socket.on('online', function(data){
        this.login_users = data.users;
        console.log(this.login_users);
        console.log("-----------------");
      })
    }
  }

}
