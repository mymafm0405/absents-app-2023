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
  currentDate: string;
  foundOne = false;
  studentSummary: {date: string, student: Student}[] = [];

  constructor(private http: HttpClient) {}

  // private students: Student[] = [
  //   new Student(
  //     '1',
  //     'Mahmoud Yhya',
  //     7,
  //     1,
  //     '66548110',
  //     false,
  //     true,
  //     'Nothing',
  //     true
  //   ),
  //   new Student('2', 'Mido', 7, 1, '66548110', false, false, '', true),
  //   new Student(
  //     '3',
  //     'Ahmed',
  //     7,
  //     1,
  //     '66548110',
  //     true,
  //     false,
  //     'خارج البلاد',
  //     true
  //   ),
  //   new Student('4', 'Ismail', 8, 1, '50001953', false, false, '', true),
  //   new Student('5', 'Hamad', 8, 1, '50001953', false, false, '', true),
  //   new Student('6', 'Adel', 8, 1, '50001953', false, false, '', true),
  // ];

  students: Student[] = [];

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

  loadAllStudentsFromServer() {
    this.http
      .get('https://alforqan-absents-default-rtdb.firebaseio.com/students.json')
      .subscribe((data) => {
        if (data !== null) {
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              this.students.push(data[key]);
            }
          }
        }
        console.log(this.students);

        this.studentsUpdated.next(true);
      });
  }

  getStudentsByGradeAndClassOnly(gradeNum: number, classNum: number) {
    console.log(gradeNum);
    console.log(classNum);
    // const allStudents: Student[] = LODASH.cloneDeep(this.students);
    const stuForGradeAndClass = this.students.filter((stu) => {
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
    console.log(stuForGradeAndClass);
    return stuForGradeAndClass;
  }

  getAllStatus() {
    this.http
      .get('https://alforqan-absents-default-rtdb.firebaseio.com/status.json')
      .subscribe((data) => {
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
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
      console.log(existStudent);
      this.studentsUpdated.next(true);
      this.lateOrAbsentsStatusChanged.next(true);
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
      this.foundOne = false;
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

  setCurrentDate(currDate: string) {
    this.currentDate = currDate;
  }

  saveToStatus(currentStatus: Status) {
    console.log(this.currentActiveClass);
    console.log(this.currentActiveGrade);

    this.savingStatus.next(true);
    // const existStatus = this.status.find((st) => {
    //   if (st.date === currentStatus.date) {
    //     if (
    //       st.gradeNum === currentStatus.gradeNum &&
    //       st.classNum === currentStatus.classNum
    //     ) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   } else {
    //     return false;
    //   }
    // });
    console.log(this.status);
    // const existStatus = this.status.find((st) => {
    //   st.date === currentStatus.date &&
    //     st.gradeNum === currentStatus.gradeNum &&
    //     st.classNum === currentStatus.classNum;
    // });

    // getAndCheckExistStatus() {
    //   this.status.forEach(st =>)
    // }
    this.status.forEach((st) => {
      if (st.date === currentStatus.date) {
        if (
          st.gradeNum === currentStatus.gradeNum &&
          st.classNum === currentStatus.classNum
        ) {
          this.foundOne = true;
          currentStatus.id = st.id;
          this.http
            .patch(
              'https://alforqan-absents-default-rtdb.firebaseio.com/status/' +
                st.id +
                '.json',
              currentStatus
            )
            .subscribe((data) => {
              console.log('status updated success');
              this.savingStatus.next(false);
              console.log(data);

              st.students = currentStatus.students;
            });
          console.log('foundOne is true');
        }
      }
    });
    if (this.foundOne === false) {
      console.log('foundOne is false');

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
          // after saving edit the id again
          this.http
            .patch(
              'https://alforqan-absents-default-rtdb.firebaseio.com/status/' +
                resId.name +
                '.json',
              currentStatus
            )
            .subscribe((res) => {
              console.log(res);
              this.savingStatus.next(false);
            });
        });
    }
    // if (existStatus.gradeNum === currentStatus.gradeNum && existStatus.classNum === currentStatus.classNum) {
    //   return existStatus;
    // }
    // console.log(existStatus);

    // if (existStatus) {
    //   // update the exist status in database
    //   existStatus.students = currentStatus.students;
    //   this.http
    //     .patch(
    //       'https://alforqan-absents-default-rtdb.firebaseio.com/status/' +
    //         existStatus.id +
    //         '.json',
    //       existStatus
    //     )
    //     .subscribe((res) => {
    //       console.log(res);
    //       this.savingStatus.next(false);
    //     });
    //   //
  }

  saveChangesOnStudents() {
    this.savingStatus.next(true);
    // Save updated students to the server
    this.http
      .put(
        'https://alforqan-absents-default-rtdb.firebaseio.com/students.json',
        this.students
      )
      .subscribe((res) => {
        this.savingStatus.next(false);
        this.lateOrAbsentsStatusChanged.next(false);
      });
  }

  changeLateOrAbsentsStatus(status: boolean) {
    this.lateOrAbsentsStatusChanged.next(status);
  }

  getAbsentsStudentsFromToDate(dateFromTime: number, dateToTime: number) {
    const foundStudents: { student: Student; counter: number }[] = [];

    console.log(dateFromTime);
    console.log(dateToTime);
    console.log(this.status);

    this.status.forEach((stat) => {
      let counter = 0;
      const statDateTime = new Date(stat.date).getTime();
      console.log(statDateTime);

      if (statDateTime >= dateFromTime && statDateTime <= dateToTime) {
        console.log(stat.students);

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

  getReportByStudentId(student: Student) {
    console.log('hi hi hi')
    const foundStatusForGradeAndClass = this.status.filter((st) => {
      if (
        st.classNum === student.classNum &&
        st.gradeNum === student.gradeNum
      ) {
        return true;
      } else {
        return false;
      }
    });

    const foundStatusIncludedThisStudent = foundStatusForGradeAndClass.filter(
      (st) => {
        if (st.students) {
          console.log(st);
          if (st.students.find((stu) => stu.id === student.id)) {
            return true;
          } else {
            return false;
          }
        } else {
          console.log(st);
        }
      }
    );

    const summary: { date: string; student: Student }[] = [];

    foundStatusIncludedThisStudent.forEach((st) => {
      summary.push({
        date: st.date,
        student: st.students.find((stu) => stu.id === student.id),
      });
    });

    console.log(summary);
    this.studentSummary = summary;
  }

  clearStudentSummary() {
    this.studentSummary = [];
  }
}
