import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
import { AuthenticationService } from '../accounts/authentication-service.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (this.isLogin(request)) {
                return throwError('');
            }
            console.log(err);
            switch (err.status) {
                case 401:
                    // auto logout if 401 response returned from api
                    this.authenticationService.logout();
                    location.reload(true);
                    break;
                case 400:
                    return throwError(this.getValidationError(err.error.data ? err.error.data : err.error));
                case 409:
                    return throwError(err.error.data ? err.error.data.error : err.error);
                default:
                    return throwError('Sorry this operation could not be completed at this time.');
            }
            const error = err.error ? err.error.message : err.statusText ? err.statusText : '';
            return throwError(error);
        }));
    }

    isLogin(request: HttpRequest<any>): any {
        return request.url.search('/accounts/login') !== -1;
    }

    getValidationError(errors): string {
        let errorString = '';
        if (errors.status) {
            for (const key in errors) {
                if (errors.hasOwnProperty(key)) {
                    if (key !== 'status') {
                        errorString += errors.status;
                    }
                }
            }
        } else if (errors.errorMessage) {
            errorString += errors.errorMessage;
        } else {
            errors.forEach(element => {
                if (element.constraints) {
                    errorString += Object.values(element.constraints) + '\n';
                } else {
                    if (typeof (element) === 'string') {
                        errorString += element + '\n';
                    } else {
                        errorString += element.message + '\n';
                    }
                }
            });
        }
        return errorString;
    }
}
