import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  @ViewChild('f', { static: false }) myForm: NgForm;
  success = false;
  loading = false;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.passwordChanged.subscribe((status) => {
      if (status) {
        this.loading = false;
        this.success = true;
        this.myForm.reset();
        setTimeout(() => {
          this.success = false;
        }, 2000);
      }
    });
  }

  onSubmit() {
    this.loading = true;
    this.usersService.changePassword(this.myForm.value.password1);
  }
}
