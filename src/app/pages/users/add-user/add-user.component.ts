import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { PostUserAction } from 'src/app/store/actions';
import { VariablesService } from 'src/app/services/variableGL.service';
import swal from 'sweetalert';
import { Toast } from 'src/app/shared/models/toast.model';

import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styles: [``],
  providers: [Md5]
})
export class AddUserComponent implements OnInit {

  user: Usuario;
  form: FormGroup;
  submitted = false;

  listSexos = [ { name: "Masculino", code: "M" },
                { name: "Femenino", code: "F" }];

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private variablesService: VariablesService,
    private _md5: Md5,
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      usuario: new FormControl('', [Validators.required, Validators.minLength(7)]),
      correo: new FormControl('', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)]),
      sexo: new FormControl('', [Validators.required]),                                                 //^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})
                                                                                                        //'(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'      
      contrasena: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{10,}')]),
    });
  }

  get f() { return JSON.stringify(this.form.controls); }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) return;
    else {
      let hash = Md5.hashStr(this.form.value.contrasena);
      this.user = new Usuario(
        null,
        this.form.value.correo,
        this.form.value.usuario,
        hash,
        null,
        this.form.value.sexo.name,
        null,
        null);

      swal({
        title: `¿Quieres crear este Usuario?`,
        text: `Usuario: ${this.user.usuario}`,
        icon: "info",
        buttons: ["Cancelar", "Crear"],
        dangerMode: false,
      })
        .then((willOK) => {
          if (willOK) {
            this.store.dispatch(new PostUserAction(this.user));
            this.variablesService.toast.next(new Toast('success', 'Exito', 'Creando Usuario', 2000));
          }
          else {
            this.variablesService.toast.next(new Toast('error', 'Accion cancelada', 'No se creo el Usuario.', 2000));
          }
        });

      this.submitted = false;
    }
  }
}
