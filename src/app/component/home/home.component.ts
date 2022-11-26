import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /** Varibles  */
  users: any;
  userForm: boolean;
  isNewUser: boolean;
  newUser: any = {};
  editUserForm: boolean;
  editedUser: any = {};

  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.users = this.getUsers() ? this.getUsers() : [];
  }

  /** Get Users */
  getUsers() {
    return this.userService.getUsersFromData();
  }

  /** Show edit user */
  showEditUserForm(user: User) {
    if (!user) {
      this.userForm = false;
      return;
    }
    this.editUserForm = true;
    this.editedUser = user;
  }

  /** Show add user */
  showAddUserForm() {
    // resets form if edited user
    if (this.users.length) {
      this.newUser = {};
    }
    this.userForm = true;
    this.isNewUser = true;
  }

  /** Save user */
  saveUser(user: User) {
    if (this.isNewUser) {
      // add a new user
      this.userService.addUser(user);
    }
    this.userForm = false;
    this.users = this.getUsers() ? this.getUsers() : [];
    this.toastr.success('Add user successfully', 'Success');
  }

  /** Update user */
  updateUser() {
    this.userService.updateUser(this.editedUser);
    this.editUserForm = false;
    this.editedUser = {};
    this.users = this.getUsers() ? this.getUsers() : [];
    this.toastr.success('Edit user successfully', 'Success');
  }

  /** Remove user */
  removeUser(user: User) {
    this.userService.deleteUser(user);
    this.users = this.getUsers() ? this.getUsers() : [];
    this.toastr.success('Delete user successfully', 'Success');
  }

  /** Cancel user */
  cancelEdits() {
    this.editedUser = {};
    this.editUserForm = false;
  }

  /** Cancel new user */
  cancelNewUser() {
    this.newUser = {};
    this.userForm = false;
  }

  /* Sign Out */
  onSignOut() {
    // localStorage.clear();
    this.toastr.success('Sign out user successfully', 'Success');
  }
}
