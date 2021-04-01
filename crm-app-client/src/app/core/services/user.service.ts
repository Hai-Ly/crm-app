import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { User} from '../models';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private apiService: ApiService, private authService: AuthService) {

  }


  getUsers(): Observable<User[]> {
    return this.apiService.get('/users');
  }

  getUser(id: string): Observable<User> {
    return this.apiService.get(`/users/${id}`);
  }

  // Update the user on the server (email, pass, etc)
  updateUser(id: string, data: any): Observable<User> {
    return this.apiService.patch(`/users/${id}`, data);
  }

  deleteUser(id: string): Observable<void> {
    return this.apiService.delete(`/users/${id}`);
  }
}
