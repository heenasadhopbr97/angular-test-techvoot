import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /* for form */
  loginForm: FormGroup;
  isSubmitted = false;

  constructor(public fb: FormBuilder, public router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loginDataForm();
  }
  /* Get form  */
  get formControls() { return this.loginForm.controls; }

  /* Login form */
  loginDataForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  /* Submit form */
  onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      this.toastr.error('Please fill up the all field', 'Error');
      return;
    }
    this.router.navigateByUrl('/home');
    this.toastr.success('Login successfully', 'Success');
  }

}
