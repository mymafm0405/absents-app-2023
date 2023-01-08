import { Injectable } from '@angular/core';
import { Class } from './class.model';
import { Grade } from './grade.model';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  students: Student[] = [
    new Student('1', 'Mahmoud Yhya', 7, 1, 66548110, false, false, '', ''),
    new Student('2', 'Basem Yhya', 8, 1, 50001953, false, false, '', ''),
  ];

  grades: Grade[] = [
    new Grade('g7', 7, 'Grade 7'),
    new Grade('g8', 8, 'Grade 8'),
    new Grade('g9', 9, 'Grade 9'),
  ]

  classes: Class[] = [
    new Class('1', 'g7', 1, 'Class 1'),
    new Class('2', 'g8', 1, 'Class 1'),
  ]

  getStudents() {
    return this.students;
  }

  getGrades() {
    return this.grades;
  }

  getClasses() {
    return this.classes;
  }
}
