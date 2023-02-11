import { Component } from '@angular/core';
import { DesignService } from 'src/app/shared/design.service';
import { StudentsService } from 'src/app/shared/students.service';
import { UsersService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent {
  gradeNum: number;
  classNum: number;
  update = false;
  saving = false;
  loginStatus = false;

  constructor(
    private designServ: DesignService,
    private stuServ: StudentsService,
    private usersServ: UsersService
  ) {}

  ngOnInit() {
    this.loginStatus = this.usersServ.loginStatus;

    this.usersServ.loginChanged.subscribe((status) => {
      this.loginStatus = status;
    });

    this.designServ.gradeChanged.subscribe((gradeNum) => {
      this.gradeNum = gradeNum;
    });
    this.designServ.classChanged.subscribe((classNum) => {
      this.classNum = classNum;
    });

    this.designServ.menuChanged.subscribe((data) => {
      // This is to clear the grade and class.
      this.stuServ.changeClassActiveStatus(true);
      this.stuServ.changeGradeActiveStatus(true);
      this.gradeNum = null;
      this.classNum = null;
    });

    this.stuServ.lateOrAbsentsStatusChanged.subscribe((status) => {
      if (status) {
        this.update = true;
      } else {
        this.update = false;
      }
    });
    this.stuServ.savingStatus.subscribe((status) => {
      this.saving = status;
    });
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

  onSave() {
    this.designServ.savePressed.next(true);
  }

  onSignOut() {
    // This is to clear the grade and class.
    this.stuServ.changeClassActiveStatus(true);
    this.stuServ.changeGradeActiveStatus(true);
    this.gradeNum = null;
    this.classNum = null;

    this.usersServ.signOut();
  }

  onChangePassword() {
    this.designServ.menuChanged.next({
      type: 'password',
      name: 'تـغـيير كـلـمة المـرور',
    });
  }
}
