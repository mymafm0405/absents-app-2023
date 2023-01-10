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
  @Output() lateChange = new EventEmitter<{
    id: string;
    status: boolean;
    reason: string;
  }>();
  absentsOptions = [
    '',
    'غائب',
    'معذور',
    'مفصول',
    'متقطع',
    'خارج البلاد',
    'عذر إداري',
  ];
  // absentsOptions = [
  //   {
  //     value: 'mm',
  //   },
  //   {
  //     value: 'oo',
  //   },
  // ];

  absentStatus = '';
  lateStatus: boolean;
  absDisabled = false;
  lateDisabled = false;
  lateReason = '';

  ngOnInit() {
    this.lateStatus = this.student.late;
    this.lateReason = this.student.reason;
    if (this.student.absent) {
      this.absentStatus = this.student.reason;
    }
    console.log(this.student);
  }

  onAbsentChange(event: any, stuId: string) {
    if (event.target.value.length > 0) {
      this.lateDisabled = true;
      this.lateStatus = false;
    } else {
      this.lateDisabled = false;
    }
    console.log({ id: stuId, absentValue: event.target.value });
    this.absentChange.emit({ id: stuId, absentValue: event.target.value });
  }

  onLateChange(event: any, stuId: string) {
    if (this.lateStatus) {
      this.absDisabled = true;
      this.absentStatus = '';
      this.lateReason = '';
    } else {
      this.absDisabled = false;
    }
    this.lateChange.emit({
      id: stuId,
      status: this.lateStatus,
      reason: this.lateReason,
    });
  }
  onSaveReason() {
    this.lateChange.emit({
      id: this.student.id,
      status: this.lateStatus,
      reason: this.lateReason,
    });
    console.log(this.lateReason);
  }
}
