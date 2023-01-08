import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StudentAbsentLateComponent } from './components/student-absent-late/student-absent-late.component';
import { StudentReportComponent } from './components/student-report/student-report.component';
import { StudentManageComponent } from './components/student-manage/student-manage.component';
import { GradeComponent } from './components/grade/grade.component';
import { ClassComponent } from './components/class/class.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentAbsentLateComponent,
    StudentReportComponent,
    StudentManageComponent,
    GradeComponent,
    ClassComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
