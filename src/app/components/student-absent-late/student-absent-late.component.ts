import { Component, Input } from '@angular/core';
import { Student } from 'src/app/shared/student.model';

@Component({
  selector: 'app-student-absent-late',
  templateUrl: './student-absent-late.component.html',
  styleUrls: ['./student-absent-late.component.css']
})
export class StudentAbsentLateComponent {
  @Input() student: Student;
}
