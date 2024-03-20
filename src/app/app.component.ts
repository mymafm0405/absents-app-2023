import { Component } from '@angular/core';
import { StudentsService } from './shared/students.service';
import { User } from './shared/user.model';
import { UsersService } from './shared/user.service';

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
  reportSelected = false;
  menu = '';
  loginStatus = false;
  // results = [
  //   ["Col1", "Col2", "Col3", "Col4"],
  //   ["Data", 50, 100, 500],
  //   ["Data", -100, 20, 100],
  //   ];

  constructor(public stuServ: StudentsService, private usersServ: UsersService ) {}

  ngOnInit() {

    //TEST EXPORT TO EXCEL
    // this.exportToCsv()
    // This function will be run for once to add a user temp.
    // const user = new User('1', 'admin', '123456', 'Ahmed', [], [], 'admin')
    // this.usersServ.addUser(user);

    this.loginStatus = this.usersServ.loginStatus;

    this.usersServ.loginChanged.subscribe((status) => {
      this.loginStatus = status;
    })

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

    // Load all status from server
    this.stuServ.getAllStatus();

    // Load all students from server
    this.stuServ.loadAllStudentsFromServer()

    // Load all users from server
    this.usersServ.getAllUsers();
  }



    // exportToCsv() {
    //   var CsvString = "";
    //   this.results.forEach(function(RowItem, RowIndex) {
    //     RowItem.forEach(function(ColItem, ColIndex) {
    //       CsvString += ColItem + ',';
    //     });
    //     CsvString += "\r\n";
    //   });
    //   CsvString = "data:application/csv," + encodeURIComponent(CsvString);
    //   var x = document.createElement("A");
    //   x.setAttribute("href", CsvString );
    //   x.setAttribute("download","somedata.csv");
    //   document.body.appendChild(x);
    //   x.click();
    // }


  onManage() {
    this.manageSelected = true;
    this.reportSelected = false;
    this.menu = 'manage';
  }

  onInsert() {
    this.insertSelected = true;
    this.reportSelected = false;
    this.menu = 'insert';
  }

  onReport() {
    this.reportSelected = true;
    this.insertSelected = false;
    this.manageSelected = false;
    this.showList = false;
  }
}
