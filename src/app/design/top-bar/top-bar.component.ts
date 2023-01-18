import { Component } from '@angular/core';
import { DesignService } from 'src/app/shared/design.service';
import { StudentsService } from 'src/app/shared/students.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  gradeNum: number;
  classNum: number;

  constructor(private designServ: DesignService, private stuServ: StudentsService) {}

  ngOnInit() {
    this.designServ.gradeChanged.subscribe(gradeNum => {
      this.gradeNum = gradeNum;
    })
    this.designServ.classChanged.subscribe(classNum => {
      this.classNum = classNum;
    })
  }

  onClose() {
    if (!this.classNum) {
      this.stuServ.changeGradeActiveStatus(true);
      this.gradeNum = null;
    } else {
      this.stuServ.changeClassActiveStatus(true);
      this.classNum = null;
    }
  }
}
