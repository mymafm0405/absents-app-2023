import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/shared/student.model';
import { StudentsService } from 'src/app/shared/students.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css'],
})
export class StudentsListComponent implements OnInit{
  constructor(public studentsService: StudentsService) {}
  students: Student[] = [];

  ngOnInit(): void {
    this.students = this.studentsService.getStudents();
  }
}
