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
  studentsUpdated = new Subject<boolean>();

  currentActiveGrade: number;
  currentActiveClass: number;

  students: Student[] = [
    new Student(
      '1',
      'Mahmoud Yhya',
      7,
      1,
      '66548110',
      false,
      true,
      'Nothing',
      true
    ),
    new Student('2', 'Mido', 7, 1, '66548110', false, false, '', true),
    new Student(
      '3',
      'Ahmed',
      7,
      1,
      '66548110',
      true,
      false,
      'خارج البلاد',
      true
    ),
    new Student('4', 'Ismail', 8, 1, '50001953', false, false, '', true),
    new Student('5', 'Hamad', 8, 1, '50001953', false, false, '', true),
    new Student('6', 'Adel', 8, 1, '50001953', false, false, '', true),
  ];

  grades: Grade[] = [
    new Grade('g7', 7, 'Grade 7'),
    new Grade('g8', 8, 'Grade 8'),
    new Grade('g9', 9, 'Grade 9'),
  ];

  classes: Class[] = [
    new Class('1', 7, 1, 'Class 1'),
    new Class('2', 8, 1, 'Class 1'),
    new Class('3', 9, 1, 'Class 1'),
    new Class('4', 9, 2, 'Class 2'),
  ];

  status: Status[] = [];

  getAllStudents() {
    return this.students;
  }

  getAllAbsentsByDate(date: string) {
    const foundStudents: Student[] = [];
    this.status.forEach((sta) => {
      if (sta.date === date) {
        sta.students.forEach((stud) => {
          if (stud.absent) {
            foundStudents.push(stud);
          }
        });
      }
    });
    return foundStudents;
  }
  getAllLateByDate(date: string) {
    const foundStudents: Student[] = [];
    this.status.forEach((sta) => {
      if (sta.date === date) {
        sta.students.forEach((stud) => {
          if (stud.late) {
            foundStudents.push(stud);
          }
        });
      }
    });
    return foundStudents;
  }

  addStudent(student: Student) {
    this.students.push(student);
    this.studentsUpdated.next(true);
  }

  deleteStudent(student: Student) {
    const existStudent = this.students.find((stu) => stu === student);
    if (existStudent) {
      console.log(existStudent);
      existStudent.active = false;
      this.studentsUpdated.next(true);
    }
  }

  updateAllStudentsForGradeAndClass(
    gradeNum: number,
    classNum: number,
    newStudents: Student[]
  ) {
    if (newStudents.length > 0) {
      console.log(gradeNum, classNum);
      console.log(this.students);
      // Keep old students but set them inactive
      this.students.forEach((stu) => {
        if (stu.gradeNum === gradeNum && stu.classNum === classNum) {
          stu.active = false;
        }
      });
      this.students = this.students.concat(newStudents);
      console.log(this.students);
      // console.log(this.students);
      this.studentsUpdated.next(true);
    }
  }

  getStudentsByGradeAndClassAndDate(date: string, gradeNum: number, classNum: number) {
    // Check if there is status for same grade and class, if not return fresh students, if yes return status students

    // The following date format will output (yyyy-mm-dd) exactly like <input type="date" />
  
    const existStatus = this.status.find(
      (st) =>
        st.date === date && st.gradeNum === gradeNum && st.classNum === classNum
    );
    if (existStatus) {
      console.log('found status')
      return existStatus.students;
    } else {
      console.log('not found status')
      return this.students.filter((stu) => {
        if (
          stu.gradeNum === gradeNum &&
          stu.classNum === classNum &&
          stu.active === true
        ) {
          return true;
        } else {
          return false;
        }
      });
    }
  }

  // getStatusByDateAndGradeAndClass(
  //   date: string,
  //   gradeNum: number,
  //   classNum: number
  // ) {
  //   const foundStatus = this.status.find((stat) => {
  //     stat.date === date &&
  //       stat.gradeNum === gradeNum &&
  //       stat.classNum === classNum;
  //   });

  //   if()
  // }

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
