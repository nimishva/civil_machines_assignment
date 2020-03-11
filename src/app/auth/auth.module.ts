import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { Cookie } from 'ng2-cookies'

import { ApiServiceService } from '../api-service.service';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
  
    
  ],
  providers:[]
 
})
export class AuthModule { }
