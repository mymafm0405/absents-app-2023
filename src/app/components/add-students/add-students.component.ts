import { Component, Input } from '@angular/core';
import { Student } from 'src/app/shared/student.model';
import { StudentsService } from 'src/app/shared/students.service';
import * as XLSX from 'xlsx';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css'],
})
export class AddStudentsComponent {
  @Input() grade: number;
  @Input() class: number;

  studentName = '';
  studentPhone = '';
  loadButton = false;
  data: string[][];
  newStudents: Student[] = [];

  constructor(public studServ: StudentsService) {}

  onAddStudent() {
    // console.log(Md5.hashStr(this.studentName));
    const newStudent = new Student(
      Md5.hashStr(this.studentName),
      this.studentName,
      this.grade,
      this.class,
      this.studentPhone,
      false,
      false,
      '',
      true
    );

    this.studServ.addStudent(newStudent);
    this.studServ.lateOrAbsentsStatusChanged.next(true);
  }

  onFileChange(event: any) {
    // console.log(event.target.files[0]);
    if (
      event.target.files[0].type ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      console.log('Good');
      this.loadButton = true;
      const reader: FileReader = new FileReader();
      console.log(reader);
      reader.onload = (e: any) => {
        const bstr: string = e.target.result;

        const workBook: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        const workSheetName: string = workBook.SheetNames[0];

        const workSheet: XLSX.WorkSheet = workBook.Sheets[workSheetName];

        this.data = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
        // console.log(this.data);

        for (const row of this.data.slice(1)) {
          if (row.length === 3) {
            const newStudent = new Student(
              // This is a hash of student name to make sure the id is not duplicated
              Md5.hashStr(row[1]),
              row[1],
              this.grade,
              this.class,
              row[2],
              false,
              false,
              '',
              true
            );
            this.newStudents.push(newStudent);
          }
        }
      };

      reader.readAsBinaryString(event.target.files[0]);
    } else {
      console.log('Wrong file!');
    }
    // console.log(event.target.files[0].type);
    // console.log(Math.round(event.target.files[0].size / 1024), ' KB');
  }

  onLoadAndReplace() {
    this.studServ.updateAllStudentsForGradeAndClass(
      this.grade,
      this.class,
      this.newStudents
    );
    this.loadButton = false;
    this.studServ.lateOrAbsentsStatusChanged.next(true);
  }
}
