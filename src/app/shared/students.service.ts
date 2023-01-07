import { Injectable } from '@angular/core';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  students: Student[] = [
    new Student('1', 'Mahmoud Yhya', 7, 1, 66548110),
    new Student('1', 'Basem Yhya', 7, 1, 50001953),
  ]

  getStudents() {
    return this.students;
  }
}
