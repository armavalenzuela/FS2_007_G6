function obtenerUsuarioSesion() {
    var correo = localStorage.getItem("usuarioCorreo");
    return correo ? buscarUsuarioPorCorreo(correo) : null;
}

function iniciarSesion(usuario) {
    localStorage.setItem("sesionActiva", "true");
    localStorage.setItem("usuarioNombre", usuario.nombre);
    localStorage.setItem("usuarioCorreo", usuario.correo);
    localStorage.setItem("usuarioTipo", usuario.tipo);
}

function cerrarSesion(rutaLogin) {
    localStorage.removeItem("sesionActiva");
    localStorage.removeItem("usuarioNombre");
    localStorage.removeItem("usuarioCorreo");
    localStorage.removeItem("usuarioTipo");
    window.location.href = rutaLogin || "../login.html";
}

function redirigirSegunTipoDeUsuario(usuario) {
    var destinos = {
        administrador: "admin/admin-home.html",
        vendedor: "admin/admin-productos.html",
        cliente: "profile.html"
    };

    window.location.href = destinos[usuario.tipo] || "profile.html";
}

function protegerPagina(rolesPermitidos, rutaLogin) {
    var sesionActiva = localStorage.getItem("sesionActiva") === "true";
    var tipoUsuario = localStorage.getItem("usuarioTipo");
    var tienePermiso = rolesPermitidos.indexOf(tipoUsuario) !== -1;

    if (!sesionActiva || !tienePermiso) {
        window.location.href = rutaLogin || "../login.html";
        return false;
    }

    return true;
}
