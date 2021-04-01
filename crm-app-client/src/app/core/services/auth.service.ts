import { Injectable } from '@angular/core';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';
import { distinctUntilChanged, tap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<User|undefined>(undefined);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  public forgotAccount!: {email: string};

  constructor( private apiService: ApiService, private jwtService: JwtService ) {

  }

  // Verify JWT in localstorage with server & load user's info. This runs once on application startup.
  populate(): void {
    const currentUserId = this.jwtService.getToken().id; // If JWT detected, attempt to get & store user's info
    if (currentUserId) {
      this.apiService.get('/users/' + currentUserId)
      .subscribe (
        (user: User) => this.setAuth(user),
        () => this.purgeAuth() // err
      );
    } else {
      this.purgeAuth(); // Remove any potential remnants of previous auth states
    }
  }

  setAuth(user: User): void {
    this.jwtService.saveCurrentUserId(user);  // Save JWT sent from server in localstorage
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  getCurrentUser(): User|undefined {
    return this.currentUserSubject.value;
  }

  purgeAuth(): void {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next(undefined);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(credentials: {email: string, pwd: string}): Observable<User> {
    return this.apiService.post('/auth/signin', credentials).pipe(tap( (user: User) => this.setAuth(user)));
  }

  forgotPassword(data: {email: string}): Observable<any> {
    return this.apiService.post('/auth/forgotpwd', data);
  }

  resetPassword(data: {email: string, verifyCode: string, newPwd: string}): Observable<User> {
    return this.apiService.post('/auth/resetpwd', data).pipe(tap( (user: User) => this.setAuth(user)));
  }

  signup(data: {email: string, password: string, name: string}): Observable<User> {
    return this.apiService.post('/auth/signup', data).pipe(tap( (user: User) => this.setAuth(user)));
  }
}
