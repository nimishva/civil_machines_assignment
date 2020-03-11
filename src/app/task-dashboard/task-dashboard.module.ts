import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router,RouterModule} from '@angular/router';

//Components
import { TaskViewComponent } from './task-view/task-view.component';
import { TaskDataComponent } from './task-data/task-data.component';
import { NewTaskComponent } from './new-task/new-task.component';

//ThirdParty
import { MomentumTableModule } from 'momentum-table';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';



@NgModule({
  declarations: [TaskViewComponent, TaskDataComponent, NewTaskComponent],
  imports: [
    CommonModule,
    MomentumTableModule,
    NgxUiLoaderModule,
    FontAwesomeModule,
    FormsModule,
    AutocompleteLibModule,
    RouterModule.forChild([
      {path:'dashboard',component:TaskViewComponent}
    ])
    
  ]
})
export class TaskDashboardModule { }
