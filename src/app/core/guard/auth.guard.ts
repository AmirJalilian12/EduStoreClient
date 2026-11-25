import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first, map, Observable } from 'rxjs';
import { AcountService } from 'src/app/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate , CanLoad {
  constructor(private accountService : AcountService , private toast : ToastrService , private route : Router) {}
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.accountService.currentUser$.pipe(
      first(),
      map((user)=>{
        if(user){
          return true;
        }else{
          this.toast.error('ابتدا وارد سایت شوید');
          this.route.navigate(['account/login'],{
            queryParams: {return: route?.path}
          });
          return false;
        }
      })
    )
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.accountService.currentUser$.pipe(map((user)=>{
      if(user)
      {
        return true;
      }
      else{
        this.toast.error('ایتدا باید وارد سایت شوید');
        this.route.navigate(['/account/login'],{
          queryParams : {returnUrl : state.url}
        });
        return false;
      }
    }));
  }
  
}
