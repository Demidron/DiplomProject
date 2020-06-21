import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { UserService } from '../shared/user.service';

@Injectable()
export class AuthInteceptor implements HttpInterceptor{

    constructor(private router: Router,private service:UserService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { //from HttpInterceptor
        if (localStorage.getItem('accessToken') != null) {
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'))
            });
            return next.handle(clonedReq).pipe(
                tap(
                    succ => { },
                    err => {
                        if (err.status == 401){
                            console.log("Token expired");
                            // this.service.refreshToken(localStorage.getItem('accessToken'),localStorage.getItem('refreshToken')).subscribe(
                            //     (res: any) => {
                            //         localStorage.setItem('refreshToken', res.refreshToken);
                            //         localStorage.setItem('accessToken', res.accessToken.token);
                            //         this.router.navigateByUrl('/home');
                            //         console.log("Token refreshed");
                                    
                            //       },
                            //       err => {
                            //         localStorage.removeItem('refreshToken');
                            //         localStorage.removeItem('accessToken');
                            //         this.router.navigateByUrl('/user/login');
                            //       }
                            // )
                            // localStorage.removeItem('token');
                            // this.router.navigateByUrl('/user/login');
                        }
                        else if(err.status==403){
                            this.router.navigateByUrl('/user/forbidden');
                        }
                    }
                )
            )
        }
        else
            return next.handle(req.clone());
    }
}