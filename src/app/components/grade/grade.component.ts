import { Component, Input } from '@angular/core';
import { DesignService } from 'src/app/shared/design.service';
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
  faded = false;

  constructor(
    public stuServ: StudentsService,
    private designServ: DesignService
  ) {}

  ngOnInit(): void {
    this.stuServ.gradeActiveStatus.subscribe((status) => {
      this.active = status;
      this.faded = false;
    });

    this.designServ.gradeChanged.subscribe((gradeNum) => {
      if (gradeNum !== this.grade.gradeNum) {
        this.faded = true;
      }
    })
  }

  onGradeClick() {
    this.stuServ.setCurrentActiveGrade(this.grade.gradeNum);
    this.stuServ.changeGradeActiveStatus(false);
    this.designServ.gradeChanged.next(this.grade.gradeNum);
  }
}
