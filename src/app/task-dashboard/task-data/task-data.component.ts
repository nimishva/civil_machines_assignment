import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../api-service.service'
import { StringifyOptions } from 'querystring';

@Component({
  selector: 'app-task-data',
  templateUrl: './task-data.component.html',
  styleUrls: ['./task-data.component.css']
})
export class TaskDataComponent implements OnInit {

  public loggedUserData:any;

  public tableData    :any[] = [];
  public dataLoaded   :boolean = false;
  public assignee     :string ;
  public committedOn  :Date;
  public updatedBy    :string;
  public udpatedOn    :Date;
  public comments     :any[]= [];
  public description  :string;


   //AutoComplete input
   public name:string;
   public userArray:any[];
   public userArrayClone:any[] = [];
   public placeholderAssignee    = 'Choose assignee';
   public taskAssignee:string;
   public assigneeEdit:string="";

  constructor(private http:ApiServiceService) { }

  ngOnInit() {

    this.loggedUserData = this.http.getUserInfoFromLocalStorage();
    this.getAllUserData();
    this.loadIssueDescriptionData();
    setTimeout(() => {
      this.dataLoaded = true;
    }, 2000)
    

  }


  loadIssueDescriptionData(){
    this.tableData = [];
    let i =1;
    this.http.getTasks()
    .subscribe((apiResponse)=>{
      console.log(apiResponse);
     // console.log("Loading");
      apiResponse.data.forEach(data => {
        
        let user = data.reportedBy ;
        this.tableData.push(
           
          {
            'id'           : data.taskId,
            'sl'           : i,
            'title'        : data.title,
            'descr'        : data.description,
            'status'       : data.status,
            'reporter'     : data.reportedBy,
            'date'         : this.formatDate(data.reportedDate),
            'assignee'     : data.assignee,
            'committedOn'  : this.formatDate(data.committedDate),
          }
        )
        i++;
      });
      //console.log(this.tableData);
    })

    
  }// loadDescriptionData

  getAllUserData(){
    this.userArray = [];
    let username = this.loggedUserData.email;
    this.http.getUserData()
    .subscribe((users)=>{
      console.log(users);
      users.data.forEach(user => {
       if(user.email != this.loggedUserData.email){
        this.userArray.push(user.email);
       }
      });
    });
  } //GetAllUserData

  rowExpanded(event){
    
    this.tableData.forEach((task)=>{
      console.log(task);
      if(task.id == event.data.id){
        this.assignee     = task.assignee;
        this.committedOn  = task.committedOn 
        this.comments     = task.comments
        this.description  = task.descr,
        this.taskAssignee = task.assignee

      }
    })
  } //Expad Row fn ends here

  updateData(){
    
  }

formatDate(dt){
  dt = new Date(dt);
  return dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate() + " " + dt.getHours() + ":" + dt.getMinutes(); 
} //Format Date ends here

} //Main Class
