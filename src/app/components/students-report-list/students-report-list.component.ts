import { Component } from '@angular/core';
import { DesignService } from 'src/app/shared/design.service';
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
  myReturnedStudents: { student: Student; counter: number }[] = [];
  optionClicked = false;
  absentOrLate = ''

  stuSummary: { date: string; student: Student }[] = [];
  reportPeriod: { date: string; student: Student }[] = [];
  currentAbsentsCounterForStudent = 0;

  constructor(
    public studServ: StudentsService,
    private designServ: DesignService
  ) {}

  ngOnInit() {
    this.stuSummary = this.studServ.studentSummary;
    console.log(this.stuSummary);

    // This is to reset the stuSummary after menu clicked
    this.designServ.menuChanged.subscribe((data) => {
      this.stuSummary = [];
      this.reportPeriod = [];
      this.currentAbsentsCounterForStudent = 0;
    });
  }

  onDateFromChange() {
    this.dateFromTime = new Date(this.selectedDateFrom).getTime();
    console.log(this.dateFromTime);
  }

  onDateToChange() {
    this.dateToTime = new Date(this.selectedDateTo).getTime();
    console.log(this.dateToTime);
  }

  // onDateChange() {
  //   // The following date format will output (yyyy-mm-dd) exactly like <input type="date" />
  //   const date = new Date().toISOString().split('T')[0];

  //   console.log(date);
  // }

  onLate() {
    this.absentOrLate = 'التـأخر'
    this.optionClicked = true;
    // this.foundStudents = this.studServ.getAllLateByDate(this.selectedDate);

    this.myReturnedStudents = this.studServ.getLateStudentsFromToDate(
      this.dateFromTime,
      this.dateToTime
    );
  }

  onAbsents() {
    this.absentOrLate = 'الغـيـاب'
    this.optionClicked = true;
    // this.foundStudents = this.studServ.getAllAbsentsByDate(this.selectedDate);
    this.myReturnedStudents = this.studServ.getAbsentsStudentsFromToDate(
      this.dateFromTime,
      this.dateToTime
    );
  }

  onShowStudentReport() {
    this.currentAbsentsCounterForStudent = 0;
    this.optionClicked = true;
    this.reportPeriod = this.stuSummary.filter((st) => {
      const stDateTime = new Date(st.date).getTime();
      if (stDateTime >= this.dateFromTime && stDateTime <= this.dateToTime) {
        // only return students have absent true or late true
        if (st.student.absent || st.student.late) {
          if (st.student.absent && st.student.reason === 'غائب') {
            this.currentAbsentsCounterForStudent = this.currentAbsentsCounterForStudent + 1;
          }
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });
    console.log(this.reportPeriod);
  }

  onViewReport(student: Student, counter: number) {
    this.studServ.getReportByStudentId(student);
    this.stuSummary = this.studServ.studentSummary;
    // this.designService.menuChanged.next({type: 'report', name: 'تقرير الطالب'});
  }
}
