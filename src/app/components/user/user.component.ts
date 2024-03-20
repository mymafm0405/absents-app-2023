import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  @ViewChild('f', { static: false }) myForm: NgForm;

  submitted = false;
  invalidData = false;

  constructor(private usersServ: UsersService) {}

  ngOnInit() {
    this.usersServ.loginChanged.subscribe((status) => {
      if (!status) {
        this.invalidData = true;
        setTimeout(() => {
          this.submitted = false;
          this.invalidData = false;
        }, 2000);
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.myForm);
    
    this.usersServ.signIn(
      this.myForm.value.username,
      this.myForm.value.password
    );
  }
}
