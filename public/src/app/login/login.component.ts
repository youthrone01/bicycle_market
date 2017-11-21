import { Component, OnInit } from '@angular/core';
import { MainService } from './../main.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
new_user={
  first_name:"",
  last_name:"",
  email:"",
  password:"",
};

pass_confir;

login_user={
  email:"",
  password:"",
};
bike;
err_message={
  email:"",
  login:"",
}
create(){
  this._mainService.createUser(this.new_user, (res)=>{
    console.log(res);
    if(res === 'success'){
      this._router.navigate(['bike','browse']);
    }else{
      this.err_message.email = "The email has been registered!!"
    }
  });
  this.new_user={
    first_name:"",
    last_name:"",
    email:"",
    password:"",
  };
  this.pass_confir = "";
  
};
login(){
  this._mainService.loginUser(this.login_user, (res)=>{
    if(res.error == undefined){
      this._router.navigate(['bike','browse']);
    }else{
      this.err_message.login = res.error;
    }
  });
  this.login_user={
    email:"",
    password:"",
  };

}
  constructor(private _mainService:MainService, private _router:Router) { }

  ngOnInit() {
    this._mainService.getAllBikes((res)=>{
      var index = Math.floor(Math.random() * res.length);
      this.bike = res[index];
    })
  }

}