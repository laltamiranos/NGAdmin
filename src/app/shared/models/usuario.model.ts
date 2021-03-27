export class Usuario {
    constructor(
        public id?: number,
        public correo?: string,
        public usuario?: string,
        public contrasena?: any,
        public estatus?: boolean,
        public sexo?: string,
        public fechaCreacion?: Date,
        public token?: string
    ){}
}