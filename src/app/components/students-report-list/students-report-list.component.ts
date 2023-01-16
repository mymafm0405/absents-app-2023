import { Component } from '@angular/core';
import { Student } from 'src/app/shared/student.model';
import { StudentsService } from 'src/app/shared/students.service';

@Component({
  selector: 'app-students-report-list',
  templateUrl: './students-report-list.component.html',
  styleUrls: ['./students-report-list.component.css'],
})
export class StudentsReportListComponent {
  selectedDate = '';
  selectedDateFrom = '';
  dateFromTime: number;
  dateToTime: number;
  selectedDateTo = '';
  foundStudents: Student[] = [];
  myReturnedStudents: {student: Student, counter: number}[] = []
  optionClicked = false;

  constructor(public studServ: StudentsService) {}

  onDateFromChange() {
    this.dateFromTime = new Date(this.selectedDateFrom).getTime();
    console.log(this.dateFromTime);
  }

  onDateToChange() {
    this.dateToTime = new Date(this.selectedDateTo).getTime();
    console.log(this.dateToTime);
  }

  onDateChange() {
    // The following date format will output (yyyy-mm-dd) exactly like <input type="date" />
    const date = new Date().toISOString().split('T')[0];

    console.log(date);
  }

  onLate() {
    this.optionClicked = true;
    this.foundStudents = this.studServ.getAllLateByDate(this.selectedDate);
  }

  onAbsents() {
    this.optionClicked = true;
    // this.foundStudents = this.studServ.getAllAbsentsByDate(this.selectedDate);
    this.myReturnedStudents = this.studServ.getAbsentsStudentsFromToDate(
      this.dateFromTime,
      this.dateToTime
    );
  }
}
