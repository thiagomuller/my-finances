import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpClient
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { dummySummary } from '../shared/test-utils/utils';


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor(private http: HttpClient) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.handleRequests(req, next);
  }

  handleRequests(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { urlWithParams, method } = req
    if (urlWithParams.includes('/getUserSummary/?userId') && method === 'GET') {
      console.log('INTERCEPTED')
      return of(new HttpResponse({ status: 200, body: dummySummary })).pipe()
    }
  }

}
