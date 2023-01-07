import { Component, Input } from '@angular/core';
import { Student } from 'src/app/shared/student.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  @Input() student: Student;
}
