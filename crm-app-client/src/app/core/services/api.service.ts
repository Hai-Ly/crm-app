// tslint:disable: no-any

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`, { params });
  }

  put(path: string, body: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}${path}`, body);
  }

  patch(path: string, body: any): Observable<any> {
    return this.http.patch(`${environment.apiUrl}${path}`, body);
  }

  post(path: string, body: any, options = {}): Observable<any> {
    console.log(`${environment.apiUrl}${path}`);
    return this.http.post(`${environment.apiUrl}${path}`, body, options);
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}${path}`);
  }
}
