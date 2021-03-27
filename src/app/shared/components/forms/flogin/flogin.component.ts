import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ConfigService } from 'src/config/config.service';
import { Router } from '@angular/router';
import { VariablesService } from 'src/app/services/variableGL.service';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { SwalModel } from 'src/app/shared/models/swal.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-flogin',
  templateUrl: './flogin.component.html',
  styles: [``]
})
export class FloginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  submitted = false;

  loading: boolean = false;
  error: any;

  @Output() dataUser = new EventEmitter<Usuario>();
  loginSubcripcion: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private config: ConfigService,
    private store: Store<AppState>,
    private variablesService: VariablesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginSubcripcion = this.store.select('login').subscribe((data:any) => {
      if (data.user && data.user.token) {
        localStorage.d = data.user.token;
        this.config.setLocal();
        this.variablesService.swal.next(new SwalModel("Bienvenido",data.user.correo,"success"));
        this.router.navigate(['/home'], { replaceUrl: true });
      }

      this.loading = data.loading;
      this.error = data.error;
    });

    this.form = this.fb.group({
      correo: new FormControl('', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(9)])
    });
  }

  ngOnDestroy() {
    if (this.loginSubcripcion) {
      this.loginSubcripcion.unsubscribe();
    }
  }

  get f() { return JSON.stringify(this.form.controls); }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    if (this.form.invalid) {
      this.loading = false
      return;
    }
    else {
      this.dataUser.emit(new Usuario(null, this.form.value.correo, null, this.form.value.contrasena,null, null, null, null));
      this.submitted = false;
    }
  }
}
