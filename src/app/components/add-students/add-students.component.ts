import { Component, Input } from '@angular/core';
import { Student } from 'src/app/shared/student.model';
import { StudentsService } from 'src/app/shared/students.service';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css'],
})
export class AddStudentsComponent {
  @Input() grade: number;
  @Input() class: number;

  studentName = '';
  studentPhone = '';

  constructor(public studServ: StudentsService) {}

  onAddStudent() {
    const newStudent = new Student(
      '112',
      this.studentName,
      this.grade,
      this.class,
      this.studentPhone,
      false,
      false,
      ''
    );

    this.studServ.addStudent(newStudent);
  }
}
