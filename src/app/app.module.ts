import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Router,RouterModule} from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { LoginComponent } from './auth/login/login.component';
import { ApiServiceService } from './api-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskDashboardModule } from './task-dashboard/task-dashboard.module';
import { TaskViewComponent } from './task-dashboard/task-view/task-view.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    HttpClientModule,
    TaskDashboardModule,
    RouterModule.forRoot([
      {path:'',component:TaskViewComponent,pathMatch:'full'},
      {path:'login',component:LoginComponent},
      {path:'**',component:LoginComponent}
    ]),
    BrowserAnimationsModule
  ],
  providers:[ApiServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
