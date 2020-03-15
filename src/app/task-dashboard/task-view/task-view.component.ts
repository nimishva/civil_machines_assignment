import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../api-service.service';

import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {

  newTaskWindow:boolean = false
  showTaskData:boolean = true;

  public loggedUser : string;


  


  constructor(private http:ApiServiceService,private router:Router,private toaster:ToastrService) { }

  ngOnInit() {

    if(Cookie.get('token') === "" || Cookie.get('token') === undefined || Cookie.get('token') === null )
    {
      this.toaster.error("Token expired/not available,Please login again")
      this.router.navigate(['/login']);
      return false;
    }
    this.loggedUser = this.http.getUserInfoFromLocalStorage().email;

  }

  newtaskEntry(){
    this.newTaskWindow = true;
    this.showTaskData = false;
  }

  showTask(){
    this.newTaskWindow = false;
    this.showTaskData = true;
  }

  logout(){
    Cookie.deleteAll();
    localStorage.clear();
    this.router.navigate(['/login']);
  }



} //Main Class ends here 
