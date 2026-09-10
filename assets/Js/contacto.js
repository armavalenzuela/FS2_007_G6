//Validacion de dominios permitidos
var dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

//Validacion de nombre de contacto
function nombreEsValido(nombre) {
  return typeof nombre === "string" && nombre.length > 0 && nombre.length <= 100 && !/[0-9]/.test(nombre);
}

//Validacion de correo electronico
function correoEsValido(correo) {
  if (correo.length === 0 || correo.length > 100) {
    return false;
  }
  var terminaEnDominioPermitido = false;
  for (var i = 0; i < dominiosPermitidos.length; i++) {
    if (correo.endsWith(dominiosPermitidos[i])) {
      terminaEnDominioPermitido = true;
    }
  }
  return terminaEnDominioPermitido;
}

//Validacion de comentario (Cantidad de caracteres)
function comentarioEsValido(comentario) {
  return comentario.length > 0 && comentario.length <= 500;
}

function marcarComoInvalido(input) {
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");
}

function marcarComoValido(input) {
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
}

// Validacion del formulario de contacto
function validarFormularioContacto(evento) {
  evento.preventDefault();
  
  var inputNombre = document.getElementById("contactoNombre");
  var inputCorreo = document.getElementById("contactoCorreo");
  var inputComentario = document.getElementById("contactoComentario");

  var formularioValido = true;

  if (nombreEsValido(inputNombre.value.trim())) {
    marcarComoValido(inputNombre);
  } else {
    marcarComoInvalido(inputNombre);
    formularioValido = false;
  }

  if (correoEsValido(inputCorreo.value.trim())) {
    marcarComoValido(inputCorreo);
  } else {
    marcarComoInvalido(inputCorreo);
    formularioValido = false;
  }

  if (comentarioEsValido(inputComentario.value.trim())) {
    marcarComoValido(inputComentario);
  } else {
    marcarComoInvalido(inputComentario);
    formularioValido = false;
  }

  if (formularioValido) {
    document.getElementById("mensajeEnviado").classList.remove("d-none");
    document.getElementById("formContacto").reset();
    document.getElementById("contadorComentario").textContent = "0";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("formContacto").addEventListener("submit", validarFormularioContacto);
});
