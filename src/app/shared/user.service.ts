import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  passwordChanged = new Subject<boolean>();
  loginChanged = new Subject<boolean>();

  loginStatus: boolean;
  currentUser: User;

  users: User[] = [];

  constructor(private http: HttpClient) {}

  getLoginStatus() {
    return this.loginStatus;
  }

  changePassword(newPassword: string) {
    console.log(newPassword);

    this.currentUser.password = newPassword;

    this.http
      .patch(
        'https://alforqan-absents-default-rtdb.firebaseio.com/users/' +
          this.currentUser.id +
          '.json',
        this.currentUser
      )
      .subscribe((res) => {
        this.passwordChanged.next(true);
      });
  }

  getAllUsers() {
    this.http
      .get('https://alforqan-absents-default-rtdb.firebaseio.com/users.json')
      .subscribe((data) => {
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            this.users.push(data[key]);
          }
        }
        // console.log(this.users);
      });
  }

  signIn(username: string, password: string) {
    console.log('try to login');

    const foundUser = this.users.find(
      (user) => user.username === username && user.password === password
    );
    if (foundUser) {
      this.loginStatus = true;
      this.loginChanged.next(true);
      this.currentUser = foundUser;
      console.log('logged in');
    } else if (!foundUser) {
      this.loginChanged.next(false);
      console.log('INVALID USER DATA');
    }
    console.log('hello from sign in');
  }

  signOut() {
    this.loginChanged.next(false);
    this.loginStatus = false;
  }

  // I don't use this method now, maybe in the future when adding more features to the app
  // For now I added a user manually
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
