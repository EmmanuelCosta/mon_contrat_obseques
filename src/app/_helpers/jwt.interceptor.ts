import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import Common from '../utils/Common'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available

        var c = new  Common();
        let currentUser = localStorage.getItem(c.getTokenName());
        if (currentUser ) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser}`
                }
            });
        }

        return next.handle(request);
    }
}