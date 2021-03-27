import { TestBed, async, ComponentFixture} from '@angular/core/testing';
import { FloginComponent } from './flogin.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { Usuario } from 'src/app/shared/models/usuario.model';

describe('Formulario Login /', () => {

    let component: FloginComponent;
    let fixture: ComponentFixture<FloginComponent>;

    beforeEach(async(() => {
        
        // refinar el módulo de prueba declarando el componente de prueba
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule],
            declarations: [FloginComponent]
        });

        // crear componentes y accesorios de prueba
        fixture = TestBed.createComponent(FloginComponent);

        // obtener el componente de prueba del accesorio
        component = fixture.componentInstance;
        component.ngOnInit();
    }));

    it('formulario no válido cuando está vacío', () => {
        expect(component.form.valid).toBeFalsy();
    });

    it('validez del campo de correo electrónico', () => {
        let errors = {};
        let email = component.form.controls.correo;
        expect(email.valid).toBeFalsy();

        // Se requiere correo electrónico
        errors = email.errors || {};
        expect(errors['required']).toBeTruthy();

        // Establezca un correo electrónico
        email.setValue("test");
        errors = email.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['email']).toBeTruthy();

        // Establezca el correo electrónico correcto
        email.setValue("test@example.com");
        errors = email.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['email']).toBeFalsy();
    });

    it('validez del campo de contraseña', () => {
        let errors = {};
        let password = component.form.controls.contrasena;

        // Se requiere correo electrónico
        errors = password.errors || {};
        expect(errors['required']).toBeTruthy();

        // Establezca un password
        password.setValue("12345");
        errors = password.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['minlength']).toBeTruthy();

        // Establezca el password correcto
        password.setValue("123456789");
        errors = password.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['minlength']).toBeFalsy();
    });

    it('Enviar el formulario al componente padre', () => {
        expect(component.form.valid).toBeFalsy();
        component.form.controls['correo'].setValue("test@test.com");
        component.form.controls['contrasena'].setValue("123456789");
        expect(component.form.valid).toBeTruthy();

        let user: Usuario;
        // Suscríbase al observable y almacene el usuario en una variable local.
        component.dataUser.subscribe(() => user = new Usuario(null,null,"test@test.com",null,null,null,null,null,null,null,"123456789"));

        // Trigger de la función de inicio de sesión
        component.onSubmit();

        // Ahora podemos comprobar para asegurarse de que el valor emitido es correcto        
        expect(user.correo).toBe("test@test.com");
        expect(user.contrasena).toBe("123456789");
    });
});