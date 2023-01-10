import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from 'src/app/shared/student.model';

@Component({
  selector: 'app-student-absent-late',
  templateUrl: './student-absent-late.component.html',
  styleUrls: ['./student-absent-late.component.css'],
})
export class StudentAbsentLateComponent {
  @Input() student: Student;
  @Output() absentChange = new EventEmitter<{
    id: string;
    absentValue: string;
  }>();
  // absentsOptions = [
  //   '',
  //   'غائب',
  //   'معذور',
  //   'مفصول',
  //   'متقطع',
  //   'خارج البلاد',
  //   'عذر إداري',
  //   'mm'
  // ];
  absentsOptions = [
    {
      value: 'mm',
    },
    {
      value: 'oo',
    },
  ];

  absentStatus = '';
  lateStatus: boolean;
  absDisabled = false;
  lateDisabled = false;

  ngOnInit() {
    this.lateStatus = this.student.late;
    console.log(this.student);
  }

  onAbsentChange(event: any, stuId: string) {
    // console.log((<HTMLSelectElement>event.target).value)
    if (event.target.value.length > 0) {
      this.lateDisabled = true;
      this.lateStatus = false;
    } else {
      this.lateDisabled = false;
    }
    console.log({ id: stuId, absentValue: event.target.value });
    this.absentChange.emit({ id: stuId, absentValue: event.target.value });
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
