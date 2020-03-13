import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
   private apiUrl = "http://localhost:3000/api/v1/"
  constructor(private http:HttpClient) { } //End of Constructor


    public signup:any = (data)=>{
      try {
          return this.http.post(this.apiUrl+"users/signUp",data);
        } catch (err){
          return this.handleError(err);
        }
      } //Signup Function ends

      public signIn:any = (data)=>{
        try {
            return this.http.post(this.apiUrl+"users/signIn",data);
          } catch (err){
            return this.handleError(err);
          }
        } //Signup Function ends


        public newTask:any = (data)=>{
          try {
            return this.http.post(this.apiUrl+"taskManager/newTask",data);
          } catch (err){
            return this.handleError(err);
          }
        } //NeTask Funciton ends

        public searchTasks:any = ()=>{
          try {
            return this.http.get(this.apiUrl+"taskManager/searchTasks");
          } catch (err){
            return this.handleError(err);
          }
        }


        public getTasks:any = (data)=>{
          try {
            return this.http.post(this.apiUrl+"taskManager/getTasks",data);
          } catch (err){
            return this.handleError(err);
          }
        } //getTasks Function ends

        public updateTask:any = (data)=> {
          try {
            return this.http.post(this.apiUrl+"taskManager/updateTask",data);
          } catch (err){
            return this.handleError(err);
          }
        } //Update Tasks ends here
        

        public getUserInfoFromLocalStorage = () => {
          return JSON.parse(localStorage.getItem('userData'));
        } // Get User info ends here
        
        public setUserInfoInLocalStorage = (data) => {
           localStorage.setItem('userData',JSON.stringify(data));
        } // Set User info ends here
    
       public  getNameOfUser = (allUsers,id)=>{
          for(let a of allUsers){
            if(a.userId == id){
              return a.username;
            }
          }
        }//Get Name of User

        public getUserData:any = ()=>{
          return this.http.get(this.apiUrl+"users/getAll");
        } //Get All users

      //Global error handler
      private handleError(err:HttpErrorResponse){

        let errorMessage = "";
        if(err.error instanceof Error){
        errorMessage = `An Error occured. ${err.error.message}`;
        }else{
         errorMessage = `Server returned code:${err.status} error Message is :${err.error.message}`; 
        }
       return errorMessage;
     } //ErrorHandler ends

}
