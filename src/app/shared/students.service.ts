import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Class } from './class.model';
import { Grade } from './grade.model';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  gradeActiveStatus = new Subject<boolean>();

  currentActiveGrade: number;

  students: Student[] = [
    new Student('1', 'Mahmoud Yhya', 7, 1, 66548110, false, false, '', ''),
    new Student('2', 'Basem Yhya', 8, 1, 50001953, false, false, '', ''),
  ];

  grades: Grade[] = [
    new Grade('g7', 7, 'Grade 7'),
    new Grade('g8', 8, 'Grade 8'),
    new Grade('g9', 9, 'Grade 9'),
  ];

  classes: Class[] = [
    new Class('1', 7, 1, 'Class 1'),
    new Class('2', 8, 1, 'Class 1'),
  ];

  getAllStudents() {
    return this.students;
  }

  getStudentsByGradeAndClass(gradeNum: number, classNum: number) {
    return this.students.filter(
      (stu) => stu.gradeNum === gradeNum && stu.classNum === classNum
    );
  }

  getAllGrades() {
    return this.grades;
  }

  getAllClassesForGrade(gradeNum: number) {
    return this.classes.filter((cls) => cls.gradeNum === gradeNum);
  }

  changeGradeActiveStatus(status: boolean) {
    this.gradeActiveStatus.next(status);
    this.currentActiveGrade = null;
  }

  setCurrentActiveGrade(gradeNum: number) {
    this.currentActiveGrade = gradeNum;
  }
}
