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
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderModule,SPINNER,NgxUiLoaderConfig ,POSITION,PB_DIRECTION} from 'ngx-ui-loader';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor:'#FFFFF',
  bgsOpacity:0.2,
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER.rectangleBounce, // background spinner type
  fgsType: SPINNER.threeStrings, // foreground spinner type
  fgsColor:'#883D3D',
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5 // progress bar thickness
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    HttpClientModule,
    TaskDashboardModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true
    }),
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
