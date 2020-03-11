import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../api-service.service';

import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';
@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {

  newTaskWindow:boolean = false
  showTaskData:boolean = true;
  constructor(private http:ApiServiceService,private router:Router) { }

  ngOnInit() {

    if(Cookie.get('token') === "" || Cookie.get('token') === undefined || Cookie.get('token') === null )
    {
      this.router.navigate(['/login']);
      return false;
    }

  }

  newtaskEntry(){
    this.newTaskWindow = true;
    this.showTaskData = false;
  }

  newTaskSubmitted(){

    console.log("Submitted");
   // this.loader.start();
    let submittedIssue =  {
      //eventId:'',
      title: "Test1",
      description : "Test1213",
      status : "Pending",
      assignee : "nimish.v@rediffmail.com",
      reportedDate : new Date(Date.now()),
      reportedBy  : "nimish.va@gmail.com"
    };
    //console.log(this.rteObj.imageUploadSuccess)
    this.http.newTask(submittedIssue);
    //this.resetForm(); //Resetting form
    //this.loader.stop();
  } //newIssueSubmitted Ends here ..



} //Main Class ends here 
