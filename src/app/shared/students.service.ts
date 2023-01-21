import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Class } from './class.model';
import { Grade } from './grade.model';
import { Status } from './status.model';
import { Student } from './student.model';
import { HttpClient } from '@angular/common/http';

import * as LODASH from 'lodash';

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

  constructor(private http: HttpClient) {}

  private students: Student[] = [
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
    new Class('2', 7, 2, 'Class 2'),
    new Class('3', 7, 3, 'Class 3'),
    new Class('4', 7, 4, 'Class 4'),
    new Class('5', 7, 5, 'Class 5'),
    new Class('6', 7, 6, 'Class 6'),
    new Class('7', 8, 1, 'Class 1'),
    new Class('8', 8, 2, 'Class 2'),
    new Class('9', 8, 3, 'Class 3'),
    new Class('10', 8, 4, 'Class 4'),
    new Class('11', 8, 5, 'Class 5'),
    new Class('12', 8, 6, 'Class 6'),
    new Class('13', 9, 1, 'Class 1'),
    new Class('14', 9, 2, 'Class 2'),
    new Class('15', 9, 3, 'Class 3'),
    new Class('16', 9, 4, 'Class 4'),
    new Class('17', 9, 5, 'Class 5'),
    new Class('18', 9, 6, 'Class 6'),
  ];

  status: Status[] = [];

  getAllStudents() {
    return LODASH.cloneDeep(this.students);
  }

  getAllStatus() {
    this.http
      .get('https://alforqan-absents-default-rtdb.firebaseio.com/status.json')
      .subscribe((data) => {
        console.log(data);
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            console.log(data[key]);
            this.status.push(data[key]);
          }
        }
      });
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
    const existStudent = this.students.find((stu) => stu.id === student.id);
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

  getStudentsByGradeAndClassAndDate(
    date: string,
    gradeNum: number,
    classNum: number
  ) {
    // Check if there is status for same grade and class, if not return fresh students, if yes return status students

    // The following date format will output (yyyy-mm-dd) exactly like <input type="date" />

    const existStatus = this.status.slice().find(
      (st) => {
        if (st.date === date) {
          if (st.gradeNum === gradeNum && st.classNum === classNum) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
      // st.date === date && st.gradeNum === gradeNum && st.classNum === classNum
    );
    if (existStatus) {
      console.log('found status');
      return existStatus.students;
    } else {
      console.log('not found status');
      const newCopyOfStudents: Student[] = LODASH.cloneDeep(this.students);
      const freshStudent: Student[] = newCopyOfStudents.filter((stu) => {
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
      console.log('Freshhh students');
      console.log(freshStudent);
      console.log('Test array');
      return freshStudent;
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
    this.savingStatus.next(true);
    const existStatus = this.status.find((st) => {
      if (st.date === currentStatus.date) {
        if (
          st.gradeNum === currentStatus.gradeNum &&
          st.classNum === currentStatus.classNum
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });

    if (existStatus) {
      // update the exist status in database
      existStatus.students = currentStatus.students;
      this.http
        .patch(
          'https://alforqan-absents-default-rtdb.firebaseio.com/status/' +
            existStatus.id +
            '.json',
          existStatus
        )
        .subscribe((res) => {
          console.log(res);
          this.savingStatus.next(false);
        });
      //
    } else {
      const id = (
        Math.random() +
        this.currentActiveGrade +
        this.currentActiveClass
      ).toString();

      currentStatus.id = id;

      // save new status
      this.http
        .post(
          'https://alforqan-absents-default-rtdb.firebaseio.com/status.json',
          currentStatus
        )
        .subscribe((resId: { name: string }) => {
          console.log(resId.name);
          currentStatus.id = resId.name;
          this.status.push(currentStatus);
          this.savingStatus.next(false);
        });
    }
  }

  changeLateOrAbsentsStatus(status: boolean) {
    this.lateOrAbsentsStatusChanged.next(status);
  }

  getAbsentsStudentsFromToDate(dateFromTime: number, dateToTime: number) {
    const foundStudents: { student: Student; counter: number }[] = [];

    console.log(dateFromTime);
    console.log(dateToTime);

    this.status.forEach((stat) => {
      let counter = 0;
      const statDateTime = new Date(stat.date).getTime();
      console.log(statDateTime);

      if (statDateTime >= dateFromTime && statDateTime <= dateToTime) {
        stat.students.forEach((student) => {
          if (dateFromTime === dateToTime) {
            if (student.absent) {
              const existStudent = foundStudents.find(
                (stu) => stu.student.id === student.id
              );
              if (existStudent) {
                console.log('found duplicate student');
                existStudent.counter = existStudent.counter + 1;
                console.log(existStudent);
              } else {
                console.log('not found');
                foundStudents.push({ student, counter: counter + 1 });
              }
            }
          } else {
            if (student.absent && student.reason === 'غائب') {
              const existStudent = foundStudents.find(
                (stu) => stu.student.id === student.id
              );
              if (existStudent) {
                console.log('found duplicate student');
                existStudent.counter = existStudent.counter + 1;
                console.log(existStudent);
              } else {
                console.log('not found');
                foundStudents.push({ student, counter: counter + 1 });
              }
            }
          }
        });
      }
    });
    console.log(foundStudents);

    return foundStudents;
  }

  getLateStudentsFromToDate(dateFromTime: number, dateToTime: number) {
    const foundStudents: { student: Student; counter: number }[] = [];

    console.log(dateFromTime);
    console.log(dateToTime);

    this.status.forEach((stat) => {
      let counter = 0;
      const statDateTime = new Date(stat.date).getTime();
      console.log(statDateTime);

      if (statDateTime >= dateFromTime && statDateTime <= dateToTime) {
        stat.students.forEach((student) => {
          if (student.late) {
            const existStudent = foundStudents.find(
              (stu) => stu.student.id === student.id
            );
            if (existStudent) {
              console.log('found duplicate student');
              existStudent.counter = existStudent.counter + 1;
              console.log(existStudent);
            } else {
              console.log('not found');
              foundStudents.push({ student, counter: counter + 1 });
            }
          }
        });
      }
    });
    console.log(foundStudents);

    return foundStudents;
  }
}
