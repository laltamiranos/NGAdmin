import { Injectable } from '@angular/core';
import { Router, CanLoad } from '@angular/router';
import { ConfigService } from 'src/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private autService: ConfigService,
    private router: Router
  ) {}

  canLoad(): boolean {
    if (this.autService.token)
      return true;
    else {
      this.router.navigate(['/login'], { replaceUrl: true });
      return false;
    }
  }

}
