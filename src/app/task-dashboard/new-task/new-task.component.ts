import { Component, OnInit } from '@angular/core';
import {faTrash,faWindowClose} from '@fortawesome/free-solid-svg-icons';

import { ApiServiceService } from 'src/app/api-service.service';

import { addMinutes ,subDays, addDays } from 'date-fns';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  public loggedUserData;

  //New Task Form Variables
  public taskTitle:string;
  public taskDescr:string;
  public statusArray = ['Pending','Done'];
  public status:string = 'Pending';
  public taskAssignee:string;
  public reportedDate:Date  = new Date(Date.now());
  public committedDate:Date = addDays(new Date(Date.now()),1);

  public minDate            = new Date(Date.now());
  public minComDate         = addDays(new Date(Date.now()),0);
  public maxDate            = new Date(2021, 3, 21, 20, 30);

  //Icons
  faTrash = faTrash;
  faClose = faWindowClose;

  //AutoComplete input
  public name:string;
  public userArray:any[];
  public userArrayClone:any[] = [];
  public placeholderAssignee    = 'Choose assignee';
  public issueAssignee:string;
  public assigneeEdit:string="";

  

  constructor(private apiServ:ApiServiceService) { }

  ngOnInit() {

    this.loggedUserData = this.apiServ.getUserInfoFromLocalStorage();
    this.getAllUserData();

  } //NgOninit ends here



  getAllUserData(){
    this.userArray = [];
    let username = this.loggedUserData.email;
    this.apiServ.getUserData()
    .subscribe((users)=>{
      console.log(users);
      users.data.forEach(user => {
       if(user.email != this.loggedUserData.email){
        this.userArray.push(user.email);
       }
      });
    });
    
    //this.userArrayClone = this.userArrayClone.filter(user=>user != this.loggedUserData.username)
   // console.log(this.userArray.length);

  } //getAllUserData ends here 

  submitNewTask(){
    let data = {
      title         : this.taskTitle,
      description   : this.taskDescr,
      status         : this.status,
      assignee      : this.taskAssignee,
      reportedDate  : this.reportedDate,
      reportedBy    : this.loggedUserData.email,
      committedDate : this.committedDate
    } //Data Object

this.apiServ.newTask(data)
.subscribe((apiResponse)=>{
  console.log(apiResponse)
})


  }


} //Main Class ends here
