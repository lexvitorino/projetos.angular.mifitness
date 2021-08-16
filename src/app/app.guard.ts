import { StorageService } from './services/storage.service';
import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate, CanLoad {
  constructor(
    private storage: StorageService,
    private router: Router
  ) {
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.verificarAcesso();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.verificarAcesso();
  }

  private verificarAcesso() {
    return true;
  }
}
