import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { RouterConstants } from '../constants/router-constants';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

  public constructor() { }

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setParams: {
        'api_key': RouterConstants.apiKey.trim(),
      }
    });

    return next.handle(request);
  }
}

