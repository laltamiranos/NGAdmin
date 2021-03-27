import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { ConfigService } from 'src/config/config.service';
import { Router, ActivationEnd } from '@angular/router';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';

import * as authActions from '../store/actions'
import { AuthService } from './auth.service';
import { SetTabAction, UpdateTabAction } from '../store/actions';
import { Tab } from 'src/app/shared/models/tab.model';
import { Subscription } from 'rxjs';
import { VariablesService } from './variableGL.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  tabs: Tab[] = null;
  tabsSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private config: ConfigService,
    private store: Store<AppState>,
    private authService: AuthService,
    private variablesService: VariablesService,
  ) {
    this.config.setLocal();

    this.router.events.pipe(filter(eve => eve instanceof ActivationEnd))
      .pipe(filter((eve: ActivationEnd) => eve.snapshot.firstChild === null))
      .pipe(map((eve: ActivationEnd) => eve.snapshot))
      .subscribe((d: any) => {
        switch (d._routerState.url) {
          case '/login':
            break;
          case '/not-found':
            break;
          default:
            this.tabsSubscription = this.store.select('tabs', 'list').subscribe((data: Tab[]) => this.tabs = data);
            let tabsinBreadcrumb = this.tabs.filter((x:Tab) => x.isBreadcrumb == true);

            if (tabsinBreadcrumb.length < 6)
              this.store.dispatch(new SetTabAction(new Tab(d._routerState.url, d.data.pagina, true)));
            else if (tabsinBreadcrumb.length == 6 && tabsinBreadcrumb.filter((x: Tab) => x.label == d.data.pagina).length > 0) {
              this.store.dispatch(new SetTabAction(new Tab(d._routerState.url, d.data.pagina, true)));
            }
            else {
              let lastTabInBreadcrumb = this.tabs.filter((x: Tab) => x.isBreadcrumb == true);
              let first: Tab = lastTabInBreadcrumb[0];
              this.store.dispatch(new UpdateTabAction(new Tab(first.routerLink, first.label, false)));
              this.store.dispatch(new SetTabAction(new Tab(d._routerState.url, d.data.pagina, true)));
            }

            this.variablesService.pagina.next(d.data.pagina);

            let user = this.authService.userAuth;
            if (user == null || user.id == null)
              this.store.dispatch(new authActions.SetUserAction());
            break;
        }
      });
  }
}
