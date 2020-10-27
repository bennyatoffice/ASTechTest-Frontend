import { Injectable } from '@angular/core';

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let login = localStorage.getItem('login');
    console.log('interceptor' + login);

    if (login == null) {
      let request = req.clone({
        headers: new HttpHeaders().append('Authorization', ''),
      });

      return next.handle(request);
    } else {
      let request = req.clone({
        headers: new HttpHeaders().append('Authorization', 'Bearer '+login),
      });

      return next.handle(request);
    }
  }

  constructor() {}
}
