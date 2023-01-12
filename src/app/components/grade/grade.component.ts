import { Component, Input } from '@angular/core';
import { Grade } from 'src/app/shared/grade.model';
import { StudentsService } from 'src/app/shared/students.service';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css'],
})
export class GradeComponent {
  @Input() grade: Grade;
  active = true;

  constructor(public stuServ: StudentsService) {}

  ngOnInit(): void {
    this.stuServ.gradeActiveStatus.subscribe((status) => {
      this.active = status;
    });
  }

  onGradeClick() {
    this.stuServ.setCurrentActiveGrade(this.grade.gradeNum);
    this.stuServ.changeGradeActiveStatus(false);
  }
}
