import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../services';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.jwtService.getToken().token;
    if (token && !req.headers.get('Authorization')) {
      const request = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
      return next.handle(request);
    } else {
      return next.handle(req).pipe(
        tap(evt => {
          if (evt instanceof HttpResponse) {
              let tokenReturn = evt.headers.get('OT-Authorization');
              if (tokenReturn) {
                tokenReturn = tokenReturn.substring(7); // remove 'Bearer '
                console.log('saveToken: ' + tokenReturn);
                this.jwtService.saveToken(tokenReturn);
              }
          }
        })
      );
    }
  }
}
