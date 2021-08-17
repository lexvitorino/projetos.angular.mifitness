import { StorageService } from './services/storage.service';
import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppActivate implements CanActivate, CanLoad {

  constructor(
    private storage: StorageService,
    private router: Router
  ) {
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return true;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    this.storage.getUser().then(snapshot => {
      if (snapshot && snapshot.myWorkouts) {
        if (!!this.storage.id && !!snapshot.myWorkouts) {
          this.router.navigate(['/appTab']);
        }
        return true;
      }
      return false;
    });
    return false;
  }
}
