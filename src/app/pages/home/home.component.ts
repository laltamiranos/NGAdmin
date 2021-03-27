import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/shared/models/usuario.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dataUsuario: Usuario;

  authSubscription: Subscription = new Subscription();
  
  constructor(
    private store: Store<AppState>,
  ) {
    this.authSubscription = this.store.select('auth','user').subscribe(usuario =>{
      if(usuario){
        this.dataUsuario = usuario;
      }else{
        this.dataUsuario = null;
      }
    });
  }

  ngOnInit() {

  }
}
