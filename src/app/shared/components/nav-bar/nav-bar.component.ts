import { Component, OnInit, OnDestroy } from '@angular/core';
import { fadeAnimation } from 'src/app/shared/animations/fade';
import { VariablesService } from 'src/app/services/variableGL.service';
import { Usuario } from '../../models/usuario.model';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  animations: [fadeAnimation]
})
export class NavBarComponent implements OnInit, OnDestroy {

  user: Usuario;
  visibleAlertas: boolean = false;
  visibleNotify: boolean = false;
  visibileSideBar: boolean = false;
  contadorVisible: number = 0;

  visibleSwich: boolean = false;

  windowFullScreen: boolean = false;

  mostrarSideUser: boolean;
  sideUserSubcripcion: Subscription = new Subscription();
  
  userSubcripcion: Subscription = new Subscription();
  sideBarSubcripcion: Subscription = new Subscription();

  constructor(
    private variablesService: VariablesService,
    private store: Store<AppState>
  ) {
    this.userSubcripcion = this.store.select('auth','user').subscribe((user:any) => {
      if (user && user.id)
        this.user = user;
    });
    this.sideBarSubcripcion = this.variablesService.showSideBar.subscribe((state: boolean) => {
      this.visibileSideBar = state;
      this.visibleSwich = state;
    });
    this.sideUserSubcripcion = this.variablesService.showSideUser.subscribe(value => this.mostrarSideUser = value );
  }
  
  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.userSubcripcion) {
      this.userSubcripcion.unsubscribe();
    }
    if (this.sideBarSubcripcion) {
      this.sideBarSubcripcion.unsubscribe();
    }
    if (this.sideUserSubcripcion) {
      this.sideUserSubcripcion.unsubscribe();
    }
  }

  changeSideVisible(){
    this.contadorVisible ++;
    if(this.contadorVisible > 1){
      this.contadorVisible = 0;
    }
    this.visibleSwich = Boolean(this.contadorVisible);
    this.variablesService.showSideBar.next(this.visibleSwich);
  }

  changeSideViews() {
    this.variablesService.showSideViews.next(true);
  }

  changeSideUser() {
    this.variablesService.showSideUser.next(true);
  }

  handleChange($event) {
    this.variablesService.showSideBar.next($event);
  }

  fullScreen() {
    var elem: any = document.documentElement;
    if (!this.windowFullScreen)
      this.openFullscreen(elem);
    else {
      this.closeFullscreen(document);
    }
  }

  openFullscreen(elem: any) {
    this.windowFullScreen = true;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
  }

  closeFullscreen(document: any) {
    this.windowFullScreen = false;

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }
  }
}
