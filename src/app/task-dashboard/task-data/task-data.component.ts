import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../api-service.service'
import { StringifyOptions } from 'querystring';

@Component({
  selector: 'app-task-data',
  templateUrl: './task-data.component.html',
  styleUrls: ['./task-data.component.css']
})
export class TaskDataComponent implements OnInit {
  public tableData    :any[] = [];
  public dataLoaded   :boolean = false;
  public assignee     :string ;
  public updatedBy    :string;
  public udpatedOn    :Date;
  public comments     :string;
  public description  :string;

  constructor(private http:ApiServiceService) { }

  ngOnInit() {

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
        let reportDt = new Date(Date.now());
        let dt = reportDt.getFullYear() + "-" + (reportDt.getMonth() + 1) + "-" + reportDt.getDate() + " " + reportDt.getHours() + ":" + reportDt.getMinutes(); 
        this.tableData.push(
           
          {
            'id'        : data.taskId,
            'sl'        : i,
            'title'     : data.title,
            'status'    : data.status,
            'reporter'  : data.reportedBy,
            'date'      : dt, //data.reportedDate,
            'assignee'  : data.assignee
          }
        )
        i++;
      });
      //console.log(this.tableData);
    })

    
  }// loadDescriptionData


  rowExpanded(event){
    
    this.tableData.forEach((task)=>{
      console.log(task);
      if(task.id == event.data.id){
        this.assignee = task.assignee;

      }
    })
  }

} //Main Class
