import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  /* for form */
  registerForm: FormGroup;
  /* variables */
  isSubmitted = false;

  constructor(public fb: FormBuilder, public router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.registrationDataForm();
  }

  //* Register form */
  registrationDataForm() {
    this.registerForm = this.fb.group({
      fname: ['', [Validators.required, Validators.minLength(2)]],
      lname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
  /* Get register form */
  get formControls() { return this.registerForm.controls; }

  //* Submit form */
  onSubmit() {
    this.isSubmitted = true;
    if (this.registerForm.invalid) {
      this.toastr.error('Please fill up the all field', 'Error');
      return;
    }
    this.router.navigateByUrl('/login');
    this.toastr.success('Register successfully', 'Success');
  }

}
