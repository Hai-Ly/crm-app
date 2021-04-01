import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core';

@Component({
  selector: 'crm-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.scss']
})
export class ForgotPwdComponent implements OnInit {

  forgotForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {

  }

  get f() { return this.forgotForm.controls; }

  resetPwd() {
    const data = this.forgotForm.value;
    if (this.forgotForm.invalid) {
      return ;
    }

    this.authService.forgotPassword(data).subscribe(
      result => {
        this.authService.forgotAccount = data;
        this.router.navigate(['/auth', 'resetpwd']);
        console.log(result);
      },
      err => {
        console.log(err);
      }
    );
  }
}
