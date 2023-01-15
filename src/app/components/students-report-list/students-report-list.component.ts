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
  foundStudents: Student[] = [];
  optionClicked = false;

  constructor(public studServ: StudentsService) {}

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
    this.foundStudents = this.studServ.getAllAbsentsByDate(this.selectedDate);
  }
}
