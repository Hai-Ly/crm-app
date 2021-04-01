import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core';
import { CustomErrorStateMatcher } from '../../CustomErrorStateMatcher';

@Component({
  selector: 'crm-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.scss']
})
export class ResetPwdComponent implements OnInit {

  account: {email: string};
  resetPwdForm: FormGroup;
  matcher: CustomErrorStateMatcher;
  
  constructor( private router: Router, private authService: AuthService) {
      this.matcher = new CustomErrorStateMatcher();
      this.account =  this.authService.forgotAccount;
      this.resetPwdForm = new FormGroup({
        verifyCode: new FormControl('', Validators.required),
        pwd: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPwd: new FormControl('', Validators.required)
      });
      //}, { validators: this.checkPassword});
  }

  ngOnInit() {
   
  }

  checkPassword(group: FormGroup) {
    const password = group.get('pwd')!.value;
    const confirmPassword = group.get('confirmPwd')!.value;
    return password === confirmPassword ? null : { 'notSame': true };
  }

  get f() { return this.resetPwdForm.controls; }

  resetPwd() {

    const data = this.resetPwdForm.value;
    if (!this.resetPwdForm.valid) {
      return;
    }

    this.authService.resetPassword({email: this.account.email, verifyCode: data.verifyCode, newPwd: data.pwd}).subscribe(
      user => {
        this.router.navigate(['/home']);
      },
      err => {
        // this.message = new ErrorMessage(err);
      }
    );
  }

}
