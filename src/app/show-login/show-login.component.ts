import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-login',
  templateUrl: './show-login.component.html',
  styleUrls: ['./show-login.component.scss']
})
export class ShowLoginComponent implements OnInit {


  loginForm: FormGroup

  constructor(
    private _http: HttpClient,
    private _builder: FormBuilder,
    private router: Router
  ) { 
    this.loginForm = this._builder.group({
      email: ['516@won.com.co', Validators.compose([Validators.required, Validators.email])],
      password: ['27722772', Validators.required]
    })

  }
  credentialError:boolean=false
  api_url:string="https://www.wonapp.co/login"


  login(values){
    this.credentialError=false
    let json ={
      "authentication":{
        "email" : values.email,
        "password" : values.password,
        "type" : "Admin"
      }
    }
    this._http.post(this.api_url,json).subscribe(
        (Response: any)  => {
        localStorage.setItem("token",Response.data.token);
        localStorage.setItem("number","1")
        this.router.navigate(['/data']);
      },
      err => this.credentialError=true
      )
  }

  ngOnInit(): void {
    if(localStorage.getItem("token") != "-1" && localStorage.getItem("token") != null){
      this.router.navigate(['/data']);
    }
  }

}
