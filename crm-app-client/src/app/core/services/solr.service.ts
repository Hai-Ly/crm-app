import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SolrService {

  constructor(private http: HttpClient) {

  }

  handleError(error: any) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      return throwError('Something bad happened; please try again later.');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ${ error.error.message}`);
      return throwError(error.error);
    }
    // return an observable with a user-facing error message
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    const httpOptions = {
      params:params,
      headers: new HttpHeaders({
        'Authorization': 'BASIC Z3Vlc3Q6MTIzNDU2Nzg=' // encode base64: guest:12345678
      })
    }
    
    return this.http.get(`${environment.sorlUrl}${path}`, httpOptions).pipe(
      catchError(this.handleError));
  }
}
