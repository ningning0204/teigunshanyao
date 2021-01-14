import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorService } from './error.service';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(
    private errorService: ErrorService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      withCredentials: true,
      headers: new HttpHeaders({
        'staffcode': localStorage.getItem("staffcode") == null ? '' : localStorage.getItem("staffcode"),
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }),
    });
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          event = event.clone({ body: this.modifyBody(event.body) });
        }
        return event;
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 403) {
            this.errorService.showDialog('Unauthorized!');
          }
        }
      })
    );
  }

  modifyBody(body: any) {
    if (body && body.result === true) {
      body = body.data;
      return body;
    } else {
      this.errorService.showDialog(body.message);
    }
  }
}
