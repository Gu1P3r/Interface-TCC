import { HTTP_INTERCEPTORS, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { TokenStorageService } from './login/service/token-storage.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';

 
const TOKEN_HEADER_KEY = 'Authorization';
 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 
    constructor(private token: TokenStorageService, private router: Router) { }
 
    intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpEvent<any> | HttpUserEvent<any>>{
        let authReq = req;
        if (this.token.getToken() != null) {
            authReq = req.clone({ 
                headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.token.getToken())
                                    .set("Content-Type", "application/json")});
        }
        return next.handle(authReq).do(
            (err: any) => {
                if(err instanceof HttpErrorResponse){
                    if(err.status === 401){
                        this.router.navigate(['/login']);
                    }
                }
            }
        );
    }
}
