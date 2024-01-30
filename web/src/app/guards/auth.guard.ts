import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivate,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const roles = localStorage.getItem('roles');
    console.log('roles', roles);
    console.log('route for', route.data['role']);
return true;
    // if (roles && roles.includes(route.data['role'])) {
    //   console.log('wewe', route.data['role']);

    //   return true;
    // } else {
    //   // Redirect to login or unauthorized page
    //    this.router.createUrlTree(['/login']);
    //    return false;
    // }
  }
}
