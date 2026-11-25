import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { error } from 'console';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {

  constructor(private toast : ToastrService , private route : Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error : HttpErrorResponse)=>{
        if(error){
          const base = error.error;
          switch(base.statusCode){
            case 401:
              this.toast.error(base?.message);
              break;
            case 404:
              this.route.navigateByUrl('/notFound');
              this.toast.error(base?.message);
              break;
            case 500 : 
              this.route.navigateByUrl('/serverError');
              this.toast.error(base?.message);
            break;
            default:
              this.toast.error(base?.message);
              break;
          }
        }
        return throwError(()=>{
          console.log(error);
          return error;
        });
      })
    )
  }
}
