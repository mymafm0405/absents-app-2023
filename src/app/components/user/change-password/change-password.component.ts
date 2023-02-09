import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  @ViewChild('f', {static: false}) myForm: NgForm;

  onSubmit() {
    console.log(this.myForm);
  }
}
