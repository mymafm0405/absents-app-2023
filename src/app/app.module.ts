import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StudentAbsentLateComponent } from './components/student-absent-late/student-absent-late.component';
import { StudentReportComponent } from './components/student-report/student-report.component';
import { StudentManageComponent } from './components/student-manage/student-manage.component';
import { GradeComponent } from './components/grade/grade.component';
import { ClassComponent } from './components/class/class.component';
import { StudentsAbsentLateListComponent } from './components/students-absent-late-list/students-absent-late-list.component';
import { StudentsManageListComponent } from './components/students-manage-list/students-manage-list.component';
import { StudentsReportListComponent } from './components/students-report-list/students-report-list.component';
import { GradesListComponent } from './components/grades-list/grades-list.component';
import { ClassesListComponent } from './components/classes-list/classes-list.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentAbsentLateComponent,
    StudentReportComponent,
    StudentManageComponent,
    GradeComponent,
    ClassComponent,
    StudentsAbsentLateListComponent,
    StudentsManageListComponent,
    StudentsReportListComponent,
    GradesListComponent,
    ClassesListComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
