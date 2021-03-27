import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { VariablesService } from './variableGL.service';
import { Toast } from '../shared/models/toast.model';

@Injectable({
    providedIn: 'root'
})
export class ExceptionsService {

    constructor(
        private router: Router,
        private variablesService: VariablesService,
    ) { }

    _error(error) {
        localStorage.clear();
        localStorage.error = JSON.stringify(error);
        this.router.navigate(['/login'], { replaceUrl: true });
        setTimeout(() => {
            location.reload();
        }, 100);
    }

    _credencialesIncorrectas() {
        localStorage.clear();
        this.variablesService.toastLogin.next(new Toast('error','Error.', 'Credenciales Incorrectas.', 1000));
    }

    _toast(state: string, title: string, message: string) {
        this.variablesService.toast.next(new Toast(state,title,message, 1000));
    }
}