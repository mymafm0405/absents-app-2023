import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  loginChanged = new Subject<boolean>();

  loginStatus: false;

  constructor(private http: HttpClient) {}

  getLoginStatus() {
    return this.loginStatus;
  }

  signIn(username: string, password: string) {
    this.http
      .get('https://alforqan-absents-default-rtdb.firebaseio.com/users.json')
      .subscribe((data) => {
        console.log(data);
      });
  }

  addUser(user: User) {
    this.http
      .post(
        'https://alforqan-absents-default-rtdb.firebaseio.com/users.json',
        user
      )
      .subscribe((res: { name: string }) => {
        user.id = res.name;
        this.http
          .patch(
            'https://alforqan-absents-default-rtdb.firebaseio.com/users/' +
              res.name +
              '.json',
            user
          )
          .subscribe((respond) => {
            console.log(respond);
          });
      });
  }
}
