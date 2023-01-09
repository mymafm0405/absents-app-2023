import { Component, Input } from '@angular/core';
import { Student } from 'src/app/shared/student.model';

@Component({
  selector: 'app-student-absent-late',
  templateUrl: './student-absent-late.component.html',
  styleUrls: ['./student-absent-late.component.css'],
})
export class StudentAbsentLateComponent {
  @Input() student: Student;
  absentStatus = '';
  lateStatus: boolean;
  absDisabled = false;
  lateDisabled = false;

  ngOnInit() {
    this.lateStatus = this.student.late;
  }

  onAbsentChange(event: any) {
    // console.log((<HTMLSelectElement>event.target).value)
    if (event.target.value.length > 0) {
      this.lateDisabled = true;
      this.lateStatus = false;
    } else {
      this.lateDisabled = false;
    }
  }

  onLateChange(event: any) {
    if (this.lateStatus) {
      this.absDisabled = true;
      this.absentStatus = '';
    } else {
      this.absDisabled = false;
    }
  }
}
