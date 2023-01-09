import { Component } from '@angular/core';
import { StudentsService } from './shared/students.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showManage = false;
  showInsert = false;
  showAbsLateList = false;

  constructor(public stuServ: StudentsService) {}

  ngOnInit() {
    this.stuServ.classActiveStatus.subscribe((status) => {
      this.showAbsLateList = !status;
    });
  }

  onManage() {
    this.showManage = true;
    this.showInsert = false;
    this.showAbsLateList = false;
  }

  onInsert() {
    this.showManage = false;
    this.showInsert = true;
  }
}
