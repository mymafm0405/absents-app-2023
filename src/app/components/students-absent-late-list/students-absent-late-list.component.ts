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

  ngOnInit() {
    this.currentActiveGrade = this.stuServ.currentActiveGrade;
    this.currentActiveClass = this.stuServ.currentActiveClass;

    this.students = this.stuServ.getStudentsByGradeAndClass(
      this.stuServ.currentActiveGrade,
      this.stuServ.currentActiveClass
    );
    // this.stuServ.classActiveStatus.subscribe((status) => {
    //   console.log(status);
    //   if (!status) {
    //     this.students = this.stuServ.getStudentsByGradeAndClass(
    //       this.stuServ.currentActiveGrade,
    //       this.stuServ.currentActiveClass
    //     );
    //   }
    // });
  }

  onCloseClass() {
    this.stuServ.changeClassActiveStatus(true);
  }
}
