import { Component, Input } from '@angular/core';
import { Class } from 'src/app/shared/class.model';
import { StudentsService } from 'src/app/shared/students.service';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.css'],
})
export class ClassesListComponent {
  @Input() currentActiveGrade: number;
  classes: Class[] = [];

  constructor(public stuServ: StudentsService) {}

  ngOnInit() {
    this.classes = this.stuServ.getAllClassesForGrade(this.currentActiveGrade);
  }

  onClose() {
    this.stuServ.changeGradeActiveStatus(true);
  }
}
