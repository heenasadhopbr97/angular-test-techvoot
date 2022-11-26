import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /** variables */
  private upersons: any = [];

  constructor() {
  }

  /** Local storage set function */
  setUserData() {
    localStorage.setItem('userData', JSON.stringify(this.upersons))
  }

  /** Get user data */
  getUserData() {
    return JSON.parse(localStorage.getItem('userData')!)
  }

  /** Get Users data */
  getUsersFromData() {
    this.upersons = this.getUserData() ? this.getUserData() : [];
    return this.upersons;
  }

  /** Add user data */
  addUser(user: User) {
    user.id = this.upersons.length + 1;
    this.upersons.push(user);
    this.setUserData();
    this.getUserData();
    this.getUsersFromData();
  }

  /** Update data */
  updateUser(user: User) {
    const index = this.upersons.findIndex((u:any)=> user.id === u.id);
    this.upersons[index] = user;
    this.setUserData();
    this.getUserData();
    this.getUsersFromData();
  }

  /** Delete data */
  deleteUser(user: User) {
    this.upersons.splice(this.upersons.indexOf(user), 1);
    this.setUserData();
    this.getUserData();
    this.getUsersFromData();
  }

}
