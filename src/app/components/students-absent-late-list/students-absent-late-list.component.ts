import { Component, Input } from '@angular/core';
import { Status } from 'src/app/shared/status.model';
import { Student } from 'src/app/shared/student.model';
import { StudentsService } from 'src/app/shared/students.service';

@Component({
  selector: 'app-students-absent-late-list',
  templateUrl: './students-absent-late-list.component.html',
  styleUrls: ['./students-absent-late-list.component.css'],
})
export class StudentsAbsentLateListComponent {
  @Input() menuType = '';
  
  students: Student[] = [];
  constructor(public stuServ: StudentsService) {}
  currentActiveGrade: number;
  currentActiveClass: number;
  saving = false;
  dataChanged = false;

  ngOnInit() {
    this.currentActiveGrade = this.stuServ.currentActiveGrade;
    this.currentActiveClass = this.stuServ.currentActiveClass;

    this.students = this.stuServ.getStudentsByGradeAndClass(
      this.stuServ.currentActiveGrade,
      this.stuServ.currentActiveClass
    );

    this.stuServ.savingStatus.subscribe((status) => {
      this.saving = status;
    });

    this.stuServ.lateOrAbsentsStatusChanged.subscribe(status => {
      this.dataChanged = status;
    })
  }

  onCloseClass() {
    this.stuServ.changeClassActiveStatus(true);
  }

  changeStudentAbsentData(stuData: { id: string; absentValue: string }) {
    const existStudent = this.students.find((stu) => stu.id === stuData.id);
    if (existStudent) {
      if (stuData.absentValue.length > 0) {
        existStudent.absent = true;
        existStudent.reason = stuData.absentValue;
      } else {
        existStudent.absent = false;
      }
    }
  }

  changeStudentLateData(stuData: {
    id: string;
    status: boolean;
    reason: string;
  }) {
    console.log(stuData);
    const existStudent = this.students.find((stu) => stu.id === stuData.id);
    if (existStudent) {
      if (stuData.status) {
        existStudent.late = true;
        existStudent.reason = stuData.reason;
      } else {
        existStudent.late = false;
      }
    }
    console.log(existStudent);
  }

  onSaveClass() {
    this.stuServ.changeLateOrAbsentsStatus(false);
    // This should be changed when using http requests
    this.stuServ.savingStatus.next(true);
    setTimeout(() => {
      this.stuServ.savingStatus.next(false);
    }, 2000);

    // Saving to status
    const id = (
      Math.random() +
      this.currentActiveGrade +
      this.currentActiveClass
    ).toString();

    const date = new Date().toLocaleDateString();

    const currentStatus = new Status(
      id,
      date,
      this.currentActiveGrade,
      this.currentActiveClass,
      this.students
    );
    console.log(currentStatus);
    this.stuServ.saveToStatus(currentStatus);
  }
}
