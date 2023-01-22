import { Component } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {
  menus = [
    { type: 'insert', name: 'إدخال البيانات' },
    { type: 'manage', name: 'الإدارة' },
    { type: 'report', name: 'التقارير' },
  ];
}
