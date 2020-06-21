import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../shared/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router,private service:UserService){}

  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    console.log("Ruard open");
      if (localStorage.getItem('accessToken') != null)
      {
        let roles=next.data['permittedRoles'] as Array<string>;//из app-routing передается
        console.log("Ruard roles"+roles);
        if(roles){
          if(this.service.roleMatch(roles)) return true;
          else{
            this.router.navigate(['/forbidden']);
            return false;
          }

        }
        return true;
      }
    else {
      this.router.navigate(['/user/login']);
      return false;
    }
  }
}
