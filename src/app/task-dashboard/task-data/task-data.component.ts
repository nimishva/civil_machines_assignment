import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../api-service.service'
import { StringifyOptions } from 'querystring';
import { addDays,addYears, subDays ,differenceInDays, getDate, getMonth} from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { getLocaleDateFormat } from '@angular/common';
import { getYear } from 'date-fns/esm';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-task-data',
  templateUrl: './task-data.component.html',
  styleUrls: ['./task-data.component.css']
})
export class TaskDataComponent implements OnInit {

  public loggedUserData:any;
  public editFieldId :any;

  public tableData    :any[] = [];
  public masterData    :any[] = [];
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
  public taskStatus :string;
  public emptyMsg:string = "No Data Found";

   //AutoComplete input
   public name:string;
   public userArray:any[];
   public userArrayClone:any[] = [];
   public placeholderAssignee    = 'Choose assignee';
   public taskAssignee:string;
   public assigneeEdit:string="";

  public startDate :Date =  new Date(Date.now());
  public endDate :Date =  new Date(Date.now());

  constructor(private http:ApiServiceService,private toaster:ToastrService,private loader:NgxUiLoaderService) { }

  ngOnInit() {

    this.loggedUserData = this.http.getUserInfoFromLocalStorage();
    this.getAllUserData();
    this.loadIssueDescriptionData();
    setTimeout(() => {
      this.dataLoaded = true;
    }, 2000)

  }


  loadIssueDescriptionData(search?){
    
    this.masterData = [];

    if(search){
      this.masterData = this.tableData.filter((task)=>{

      return this.removeTime(task.reportedDate).getTime() >= this.removeTime(this.startDate).getTime()
             && 
             this.removeTime(task.reportedDate).getTime() <= this.removeTime(this.endDate).getTime();
      });
    }
    else { 

    this.loader.start();
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
            'reportedDate' : new Date(data.reportedDate),
            'assignee'     : data.assignee,
            'comments'     : data.comments.length > 0  ? data.comments : [] ,
            'committedOn'  : data.committedDate ? this.formatDate(data.committedDate): "",
            'completedOn'  : data.completedOn ? this.formatDate(data.completedOn) : ""
          }
        )
        i++;
      });
      this.masterData = this.tableData;
      this.filterData();
      console.log(this.masterData);
    })
    setTimeout(() => {
      this.loader.stop();
    }, 1000);
  } //IF Else ends here
  
  
  }// loadDescriptionData

  filterData(viewMode?){
    console.log(viewMode);
    if(viewMode == "all"){
      this.masterData = this.tableData;
    }else if(viewMode == "myTasks"){
      this.masterData = this.masterData.filter((task)=>{
        return task.assignee == this.loggedUserData.email;
      });
    }else{
      this.masterData = this.masterData.filter((task)=>{
        return this.removeTime(task.reportedDate).getTime() == this.removeTime(new Date()).getTime() && task.assignee == this.loggedUserData.email;
    });
  }
}

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
        this.taskStatus   = task.status;
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
    this.loader.start();
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
            this.loader.startLoader("commentLoader");
          let getUpdatedData = response.data.comments[response.data.comments.length - 1] ;
          let taskIndex = this.getIndex(response.data.taskId);
          this.comments.push(getUpdatedData);
          this.newCommentInput = "";
          this.toaster.success("New Comment Added");
          this.loader.stopLoader("commentLoader");
        }else if(field == "assignee"){
          let taskIndex = this.getIndex(response.data.taskId);
          this.tableData[taskIndex].assignee = response.data.assignee;
          this.assignee = response.data.assignee;
          this.toaster.success("Assignee Updated");
        }else{
          let taskIndex = this.getIndex(response.data.taskId);
          this.tableData[taskIndex].status = response.data.status;
          this.toaster.success("Status Changed");
        }
        }
      })
      this.loader.stop();
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
} //EditInit Functions


checkdate(event){
 if(differenceInDays(new Date(event),new Date(this.startDate)) < 0 ){
  this.toaster.error("Please check the Date");
 }
} //Check Date Function ends here

searchTask(){
 this.loadIssueDescriptionData("search");
} //searchTasks fn ends here

removeTime(dt){
  return new Date(getYear(dt),getMonth(dt),getDate(dt));
}

} //Main Class
