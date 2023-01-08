import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showManage = false;
  showInsert = false;

  onManage() {
    this.showManage = true;
    this.showInsert = false;
  }

  onInsert() {
    this.showManage = false;
    this.showInsert = true;
  }
}
