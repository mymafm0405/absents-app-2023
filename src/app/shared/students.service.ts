import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Class } from './class.model';
import { Grade } from './grade.model';
import { Status } from './status.model';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  gradeActiveStatus = new Subject<boolean>();
  classActiveStatus = new Subject<boolean>();
  savingStatus = new Subject<boolean>();
  lateOrAbsentsStatusChanged = new Subject<boolean>();

  currentActiveGrade: number;
  currentActiveClass: number;

  students: Student[] = [
    new Student('1', 'Mahmoud Yhya', 7, 1, 66548110, false, true, 'Nothing'),
    new Student('2', 'Mido', 7, 1, 66548110, false, false, ''),
    new Student('3', 'Ahmed', 7, 1, 66548110, true, false, 'خارج البلاد'),
    new Student('4', 'Ismail', 8, 1, 50001953, false, false, ''),
    new Student('5', 'Hamad', 8, 1, 50001953, false, false, ''),
    new Student('6', 'Adel', 8, 1, 50001953, false, false, ''),
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

  status: Status[] = [];

  getAllStudents() {
    return this.students;
  }

  getStudentsByGradeAndClass(gradeNum: number, classNum: number) {
    // Check if there is status for same grade and class, if not return fresh students, if yes return status students
    const date = new Date().toLocaleDateString();
    const existStatus = this.status.find(
      (st) =>
        st.date === date && st.gradeNum === gradeNum && st.classNum === classNum
    );
    if (existStatus) {
      return existStatus.students;
    } else {
      return this.students.filter(
        (stu) => stu.gradeNum === gradeNum && stu.classNum === classNum
      );
    }
  }

  getAllGrades() {
    return this.grades;
  }

  getAllClassesForGrade(gradeNum: number) {
    return this.classes.filter((cls) => cls.gradeNum === gradeNum);
  }

  changeGradeActiveStatus(status: boolean) {
    this.gradeActiveStatus.next(status);
    if (status) {
      this.currentActiveGrade = null;
    }
  }
  setCurrentActiveGrade(gradeNum: number) {
    this.currentActiveGrade = gradeNum;
  }

  changeClassActiveStatus(status: boolean) {
    this.classActiveStatus.next(status);
    if (status) {
      this.currentActiveClass = null;
    }
  }
  setCurrentActiveClass(classNum: number) {
    this.currentActiveClass = classNum;
  }

  saveToStatus(currentStatus: Status) {
    const existStatus = this.status.find(
      (st) =>
        st.date === currentStatus.date &&
        st.gradeNum === currentStatus.gradeNum &&
        st.classNum === currentStatus.classNum
    );

    if (existStatus) {
      existStatus.students = currentStatus.students;
    } else {
      this.status.push(currentStatus);
    }
    console.log(this.status);
  }

  changeLateOrAbsentsStatus(status: boolean) {
    this.lateOrAbsentsStatusChanged.next(status);
  }
}
