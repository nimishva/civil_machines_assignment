import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from './../../api-service.service'
import { Router } from '@angular/router';

import { Cookie } from 'ng2-cookies/ng2-cookies'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailInput : string;
  otpInput   : number;
  showOtpBox : boolean = false; 

  title : string = "Login"
  constructor(private apiServ:ApiServiceService,private router:Router,private toaster:ToastrService) { }

  ngOnInit() {

    //console.log(Cookie.get('token'));

    if(Cookie.get('token') === "" || Cookie.get('token') === undefined || Cookie.get('token') === null )
    {
      this.router.navigate(['/login']);
      return false;
    }else{
      this.router.navigate(['/dashboard']);
    }
  } //NgOnit ends here

  submitForm(){
      console.log(this.emailInput);
    if(this.emailInput){

    this.apiServ.signup({email:this.emailInput})
    .subscribe((data)=>{
      console.log(data);
    })  
      this.showOtpBox = true;
      this.title = ""
    }
  } //submitForm Ends here..

  closeOtpBox(){
    this.showOtpBox = false;
    this.otpInput = null;
    this.emailInput = "";
    this.title = "Login";
  }

  validateOtp(){

    this.apiServ.signIn({token:this.otpInput,email:this.emailInput})
    .subscribe((apiResponse)=>{
      if(apiResponse.status === 200){
        Cookie.set('token',this.otpInput.toString());
        this.apiServ.setUserInfoInLocalStorage(apiResponse.data);
        let userName = apiResponse.data.email;
        this.toaster.success("Redirecting to Dashboard");
        setTimeout(()=>{
          console.log(userName);
          this.router.navigate(['/dashboard']);
        },1000)
  }else
  {
    console.log(apiResponse.message);
    this.toaster.error(apiResponse.message);
  }
    })
  } //Validate OTP


} //Main Class ends here
