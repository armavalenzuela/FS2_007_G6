//USUARIOS ALMACENADOS PARA PRUEBAS DE INICIO DE SESION

const USUARIOS = [
    { nombre: 'Admin', correo: 'admin@duoc.cl', contrasena: 'admin123', tipo: 'administrador' },
    { nombre: 'Vendedor', correo: 'vendedor@duoc.cl', contrasena: 'vendedor1', tipo: 'vendedor' },
    { nombre: 'Armando', correo: 'armando@gmail.com', contrasena: 'armand123', tipo: 'cliente' },
    { nombre: 'Sebastian', correo: 'sebastian@gmail.com', contrasena: 'sebas123', tipo: 'cliente' },
    { nombre: 'Juan', correo: 'juan@duoc.cl', contrasena: 'juan12345', tipo: 'cliente' }
];

function buscarUsuarioPorCorreo(correo) {
    correo = correo.trim().toLowerCase();

    for (var i = 0; i < USUARIOS.length; i++) {
        if (USUARIOS[i].correo.toLowerCase() === correo) {
            return USUARIOS[i];
        }
    }
    return null;
}

