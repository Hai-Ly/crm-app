import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService} from '../../../core';

@Component({
  selector: 'crm-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;

  constructor( private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router) {

    this.signinForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
    });

  }

  get f() { return this.signinForm.controls; }

  ngOnInit() {

  }

  login() {
    const credentials = this.signinForm.value;
    this.authService.attemptAuth(credentials)
      .subscribe(
        user => {
          console.log(user);
          const redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '';
          this.router.navigateByUrl(redirectUrl);
        },
        err => {
            console.log(err)
            //this.message = new ErrorMessage(err);
        }
      );
  }
}
