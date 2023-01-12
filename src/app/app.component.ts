import { Component } from '@angular/core';
import { StudentsService } from './shared/students.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showList = false;
  showManageList = false;
  saving = false;
  insertSelected = false;
  manageSelected = false;
  menu = '';

  constructor(public stuServ: StudentsService) {}

  ngOnInit() {
    this.stuServ.classActiveStatus.subscribe((status) => {
      this.showList = !status;
    });

    this.stuServ.savingStatus.subscribe((status) => {
      this.saving = status;
    });

    this.stuServ.gradeActiveStatus.subscribe((status) => {
      if (status) {
        this.insertSelected = false;
        this.manageSelected = false;
      }
    });
  }

  onManage() {
    this.manageSelected = true;
    this.menu = 'manage';
  }

  onInsert() {
    this.insertSelected = true;
    this.menu = 'insert';
  }
}
