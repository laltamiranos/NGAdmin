import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { VariablesService } from 'src/app/services/variableGL.service';
import swal from 'sweetalert';
import { Toast } from 'src/app/shared/models/toast.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { PutUserAction } from 'src/app/store/actions';

import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
  providers: [Md5]
})
export class UpdateUserComponent implements OnInit {

  @Input() _user: Usuario;
  user: Usuario;
  form: FormGroup;
  submitted = false;
  isequals: boolean;

  listSexos = [ { name: "Masculino", code: "M" },
                { name: "Femenino", code: "F" }];

  selectedSexo  = {
                  name: "",
                  code: ''
                };
  constructor(
    private formBuilder: FormBuilder,
    private variablesService: VariablesService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.user = new Usuario();
    this.user.id = this._user.id;
    this.user.usuario = this._user.usuario;
    this.user.correo = this._user.correo;    
    this.user.sexo = this._user.sexo;

    this.selectedSexo = this.listSexos.find(x => x.name == this.user.sexo);
    
    this.form = this.formBuilder.group({
      usuario: new FormControl(this.user.usuario ? this.user.usuario : '', [Validators.required, Validators.minLength(7)]),
      correo: new FormControl(this.user.correo ? this.user.correo : '', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)]),
      sexo: new FormControl(this.selectedSexo ? this.selectedSexo : '', [Validators.required]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{10,}')]),
      rcontrasena: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{10,}')]),
    });
  }

  get f() { return JSON.stringify(this.form.controls); }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) return;
    else {
      if(this.form.value.contrasena == this.form.value.rcontrasena){
        this.isequals = true;
        this.user.correo = this.form.value.correo;
        this.user.usuario = this.form.value.usuario;
        this.user.sexo = this.form.value.sexo.name;
        this.user.contrasena = Md5.hashStr(this.form.value.contrasena);
        swal({
          title: `¿Actualizar Datos del Usuario?`,
          icon: "info",
          buttons: ["Cancelar", "Actualizar"],
          dangerMode: false,
        })
        .then((willOK) => {
          if (willOK) {
            this.store.dispatch(new PutUserAction(this.user));
            this.variablesService.toast.next(new Toast('success', 'Exito', 'Actualizando Datos.', 2000));
          }
          else {
            this.variablesService.toast.next(new Toast('error', 'Accion cancelada', 'No se actualizaron los datos.', 2000));
          }
        });
        
        this.submitted = false;
      }else{
        this.isequals = false;
        this.submitted = false;
      }
    }
  }
}
