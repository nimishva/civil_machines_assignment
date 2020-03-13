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
  public editFieldId :any;

  public tableData    :any[] = [];
  public dataLoaded   :boolean = false;
  public assignee     :string ;
  public committedOn  :Date;
  public updatedBy    :string;
  public udpatedOn    :Date;
  public comments     :any[]= [];
  public description  :string;
  public hiddenId:string;
  public newCommentInput:string;
  public completedOn:any;


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
            'comments'     : data.comments.length > 0  ? data.comments : [] ,
            'committedOn'  : this.formatDate(data.committedDate),
            'completedOn'  : data.completedOn ? this.formatDate(data.completedOn) : ""
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
        this.hiddenId     = task.id;
        this.completedOn  = task.completedOn;

      }
    })
  } //Expad Row fn ends here

  updateData(data,field,id){
    console.log(id);
      let dataObject = {
            taskId    : field == "status" ? this.editFieldId : id,
            field     : field,
            data      : data,
            commentBy : this.loggedUserData.email,
            date      : new Date(Date.now())
      }
      console.log(dataObject);
      this.http.updateTask(dataObject)
      .subscribe((response)=>{
        console.log(response);
        if(response.status === 200){

          if(field == "comment"){

          let getUpdatedData = response.data.comments[response.data.comments.length - 1] ;
          let taskIndex = this.getIndex(response.data.taskId);
          this.comments.push(getUpdatedData);
          this.newCommentInput = "";
        }else if(field == "assignee"){
          let taskIndex = this.getIndex(response.data.taskId);
          this.tableData[taskIndex].assignee = response.data.assignee;
          this.assignee = response.data.assignee;
        }else{
          let taskIndex = this.getIndex(response.data.taskId);
          this.tableData[taskIndex].status = response.data.status;
        }
        }
      })
        console.log(this.comments);
    } //UpdateData ends here


    getIndex(ids){
     return this.tableData.findIndex(task=>task.id == ids);
    }

formatDate(dt){
  dt = new Date(dt);
  return dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate() + " " + dt.getHours() + ":" + dt.getMinutes(); 
} //Format Date ends here


editInit(event){
  this.editFieldId = event.data.id
}

} //Main Class
