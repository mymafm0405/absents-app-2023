import { Component, Input } from '@angular/core';
import { Class } from 'src/app/shared/class.model';
import { StudentsService } from 'src/app/shared/students.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css'],
})
export class ClassComponent {
  @Input() currentClass: Class;
  active = true;

  constructor(public stuServ: StudentsService) {}

  ngOnInit(): void {
    this.stuServ.classActiveStatus.subscribe((status) => {
      this.active = status;
    });
  }

  onClassClick() {
    console.log('hello')
    this.stuServ.setCurrentActiveClass(this.currentClass.classNum);
    this.stuServ.changeClassActiveStatus(false);
  }
}
