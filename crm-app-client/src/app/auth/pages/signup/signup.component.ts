import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core';
import { CustomErrorStateMatcher } from '../../CustomErrorStateMatcher';

@Component({
  selector: 'crm-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  matcher: CustomErrorStateMatcher;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {

      this.signupForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      }, {
        validator: this.checkPassword
      });

      this.matcher = new CustomErrorStateMatcher();
  }

  ngOnInit() {

  }

  get f() { return this.signupForm.controls; }

  checkPassword(group: FormGroup) {
    const password = group.get('password')!.value;
    const confirmPassword = group.get('confirmPassword')!.value;
    return password === confirmPassword ? null : { 'notSame': true };
  }

  register() {
    this.authService.signup(this.signupForm.value)
      .subscribe(
        user => {
          console.log(user);
          this.router.navigateByUrl('/');
        },
        err => {
           //this.message = new ErrorMessage(err);
        }  
      )
  }
}
