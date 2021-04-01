import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    const apiReq = req.clone({
      url: `${baseUrl}${req.url}`,
      setHeaders: {
        'X-Forwarded-Proto': 'http',
        'X-Forwarded-Host': 'localhost',
        'X-Forwarded-Port': '5000'
      }});
    return next.handle(apiReq);
  }
}
