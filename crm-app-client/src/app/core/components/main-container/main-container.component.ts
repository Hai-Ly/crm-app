import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models';
import { Router } from '@angular/router';
import { AuthService } from '../../services';

@Component({
  selector: 'crm-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {

  user$: Observable<User|undefined>;

  constructor( private router: Router, private authService: AuthService) {
    this.user$ = this.authService.currentUser;
 }

  ngOnInit(): void {

  }

  onSignInClicked(): void {
    console.log("onSignInClicked");
    this.router.navigate(['auth', 'signin'], { queryParams: { redirectUrl: this.router.url }});
  }

  onSignOutClicked(): void {
    this.authService.purgeAuth();
    this.router.navigate(['auth', 'signin']);
  }

  onYourAccountClicked(): void {
    this.router.navigate(['/youraccount']);
  }

  onAdministratorClicked(): void {
    this.router.navigate(['/admin']);
  }


}
