import { Component } from '@angular/core';
import { DesignService } from 'src/app/shared/design.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  gradeNum: number;
  classNum: number;

  constructor(private designServ: DesignService) {}

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
      this.gradeNum = null;
    } else {
      this.classNum = null;
    }
  }
}
