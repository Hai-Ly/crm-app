import { Injectable } from '@angular/core';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  getToken(): {id: string, token: string} {
    return {
      id: window.localStorage.currentUserId,
      token: window.localStorage.jwtToken
    };
  }

  saveToken(token: string): void {
    window.localStorage.jwtToken = token;
  }

  saveCurrentUserId(user: User): void {
    window.localStorage.currentUserId = user.id;
  }

  destroyToken(): void {
    window.localStorage.removeItem('currentUserId');
    window.localStorage.removeItem('jwtToken');
  }

}
