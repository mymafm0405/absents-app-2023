import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

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
import { LoadingComponent } from './utilities/loading/loading.component';
import { FormsModule } from '@angular/forms';
import { AddStudentsComponent } from './components/add-students/add-students.component';
import { HeaderComponent } from './design/header/header.component';
import { TopBarComponent } from './design/top-bar/top-bar.component';
import { SideMenuComponent } from './design/side-menu/side-menu.component';
import { MainComponent } from './design/main/main.component';
import { ItemComponent } from './design/side-menu/item/item.component';
import { UserComponent } from './components/user/user.component';
import { ChangePasswordComponent } from './components/user/change-password/change-password.component';

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
    LoadingComponent,
    AddStudentsComponent,
    HeaderComponent,
    TopBarComponent,
    SideMenuComponent,
    MainComponent,
    ItemComponent,
    UserComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
