import { Component, OnInit, ViewChild } from '@angular/core';
import {faTrash,faWindowClose} from '@fortawesome/free-solid-svg-icons';

import { ApiServiceService } from 'src/app/api-service.service';

import { addMinutes ,subDays, addDays } from 'date-fns';
import { NgForm } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  @ViewChild('newIssueForm',{static:true}) public taskForm:NgForm;
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

  

  constructor(private apiServ:ApiServiceService,private toaster:ToastrService) { }

  ngOnInit() {

    this.loggedUserData = this.apiServ.getUserInfoFromLocalStorage();
    this.getAllUserData();

  }//NgOninit ends here



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

  submitNewTask(form:any){
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
  if(apiResponse.status == 200){
    this.toaster.success("New Task Created");
    this.resetForm();
  }
})


  } //NewTask Creation Ends here

  resetForm(){
    this.taskForm.reset();
    this.reportedDate   = new Date(); 
    this.committedDate = addDays(new Date(Date.now()),1);
    this.status = "Pending";
  }

} //Main Class ends here
