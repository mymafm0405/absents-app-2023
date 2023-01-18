import { Component, Input } from '@angular/core';
import { Class } from 'src/app/shared/class.model';
import { DesignService } from 'src/app/shared/design.service';
import { StudentsService } from 'src/app/shared/students.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css'],
})
export class ClassComponent {
  @Input() currentClass: Class;
  active = true;

  constructor(
    public stuServ: StudentsService,
    private designServ: DesignService
  ) {}

  ngOnInit(): void {
    this.stuServ.classActiveStatus.subscribe((status) => {
      this.active = status;
    });
  }

  onClassClick() {
    this.stuServ.setCurrentActiveClass(this.currentClass.classNum);
    this.stuServ.changeClassActiveStatus(false);
    this.designServ.classChanged.next(this.currentClass.classNum);
  }
}
