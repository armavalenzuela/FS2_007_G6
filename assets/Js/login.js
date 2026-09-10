
// Lista de dominios de correo permitidos 
var dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

// Esta funcion revisa si el correo cumple con las 3 reglas (dominio, correo valido, longitud)
function correoEsValido(correo) {
  correo = correo.trim().toLowerCase();

  if (correo.length === 0) {
    return false;
  }
  if (correo.length > 100) {
    return false;
  }

  // Revisamos uno por uno los dominios 
  var terminaEnDominioPermitido = false;
  for (var i = 0; i < dominiosPermitidos.length; i++) {
    if (correo.endsWith(dominiosPermitidos[i].toLowerCase())) {
      terminaEnDominioPermitido = true;
    }
  }
  return terminaEnDominioPermitido;
}

// Esta funcion revisa si la contraseña cumple con los requisitos (caracteres, longitud)
function passwordEsValida(password) {
  return password.length >= 8 && password.length <= 10;
}

// Muestra los errores en pantalla
function marcarComoInvalido(input, mensaje) {
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");
  var divError = input.nextElementSibling;
  divError.textContent = mensaje;
}

// Marca el campo como correcto (quita el rojo y el mensaje de error)
function marcarComoValido(input) {
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
}

// Esta es la funcion principal: se ejecuta cuando el usuario aprieta "Iniciar sesion"
function validarFormularioLogin(evento) {
  evento.preventDefault();

  var inputCorreo = document.getElementById("loginCorreo");
  var inputPassword = document.getElementById("loginPassword");

  var correo = inputCorreo.value.trim();
  var password = inputPassword.value.trim();

  var formularioValido = true;

  if (correoEsValido(correo)) {
    marcarComoValido(inputCorreo);
  } else {
    marcarComoInvalido(inputCorreo, "Ingresa un correo válido (@duoc.cl, @profesor.duoc.cl o @gmail.com)");
    formularioValido = false;
  }

  if (passwordEsValida(password)) {
    marcarComoValido(inputPassword);
  } else {
    marcarComoInvalido(inputPassword, "La contraseña debe tener entre 8 y 10 caracteres.");
    formularioValido = false;
  }

  // Si las dos validaciones pasaron, buscamos si existe un usuario con ese correo
  if (formularioValido) {
    var usuarioEncontrado = buscarUsuarioPorCorreo(correo);

    if (usuarioEncontrado === null || usuarioEncontrado.contrasena !== password) {
      marcarComoInvalido(inputCorreo, "Correo o contraseña incorrectos.");
      marcarComoInvalido(inputPassword, "Correo o contraseña incorrectos.");
      return;
    }

    iniciarSesion(usuarioEncontrado);
    redirigirSegunTipoDeUsuario(usuarioEncontrado);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var formulario = document.getElementById("formLogin");
  formulario.addEventListener("submit", validarFormularioLogin);
});
