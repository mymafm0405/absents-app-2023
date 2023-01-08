import { Injectable } from '@angular/core';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  students: Student[] = [
    new Student('1', 'Mahmoud Yhya', 7, 1, 66548110, false, false, ''),
    new Student('1', 'Basem Yhya', 7, 1, 50001953, false, false, ''),
  ];

  getStudents() {
    return this.students;
  }
}
