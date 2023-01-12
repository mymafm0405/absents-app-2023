import { Component, Input } from '@angular/core';
import { Grade } from 'src/app/shared/grade.model';
import { StudentsService } from 'src/app/shared/students.service';

@Component({
  selector: 'app-grades-list',
  templateUrl: './grades-list.component.html',
  styleUrls: ['./grades-list.component.css'],
})
export class GradesListComponent {
  grades: Grade[] = [];
  showClassesList = false;
  currentActiveGrade: number;
  @Input() menuName = '';

  constructor(public stuServ: StudentsService) {}

  ngOnInit(): void {
    this.grades = this.stuServ.getAllGrades();
    this.stuServ.gradeActiveStatus.subscribe((status) => {
      this.showClassesList = !status;
      this.currentActiveGrade = this.stuServ.currentActiveGrade;
    });
  }
}
