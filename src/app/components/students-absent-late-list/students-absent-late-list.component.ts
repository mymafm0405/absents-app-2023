import { Component } from '@angular/core';
import { Student } from 'src/app/shared/student.model';
import { StudentsService } from 'src/app/shared/students.service';

@Component({
  selector: 'app-students-absent-late-list',
  templateUrl: './students-absent-late-list.component.html',
  styleUrls: ['./students-absent-late-list.component.css'],
})
export class StudentsAbsentLateListComponent {
  students: Student[] = [];
  constructor(public stuServ: StudentsService) {}
  currentActiveGrade: number;
  currentActiveClass: number;
  saving = false;

  ngOnInit() {
    this.currentActiveGrade = this.stuServ.currentActiveGrade;
    this.currentActiveClass = this.stuServ.currentActiveClass;

    this.students = this.stuServ.getStudentsByGradeAndClass(
      this.stuServ.currentActiveGrade,
      this.stuServ.currentActiveClass
    );

    this.stuServ.savingStatus.subscribe((status) => {
      this.saving = status;
    })
  }

  onCloseClass() {
    this.stuServ.changeClassActiveStatus(true);
  }

  onSaveClass() {
    this.stuServ.savingStatus.next(true)
    setTimeout(() => {
      this.stuServ.savingStatus.next(false);
    }, 2000)
  }
}
