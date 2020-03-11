import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDataComponent } from './task-data.component';

describe('TaskDataComponent', () => {
  let component: TaskDataComponent;
  let fixture: ComponentFixture<TaskDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
