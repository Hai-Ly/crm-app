import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services';

@Injectable({
    providedIn: 'root'
})
export class ServerErrorInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.injector.get(AuthService).purgeAuth();
          this.injector.get(Router).navigate(['auth', 'signin']);
          return throwError(error);
        } else {
          return throwError(error);
        }
      })
    );
  }
}
