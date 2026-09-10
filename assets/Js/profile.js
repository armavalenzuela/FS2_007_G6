// Dominios de correo que cuentan como "correo Duoc" para efectos de beneficios
var dominiosDuoc = ["@duoc.cl", "@profesor.duoc.cl"];

// Codigo promocional valido para el beneficio "FELICES50"
var CODIGO_FELICES50 = "FELICES50";

// Devuelve la clave de localStorage donde se guardan los datos extra de un correo
function claveDatosExtra(correo) {
  return "perfilExtra_" + correo.trim().toLowerCase();
}

// Obtiene los datos de perfil que no vienen en USUARIOS (fecha nacimiento, telefono, codigo aplicado)
function obtenerDatosExtraPerfil(correo) {
  var guardado = localStorage.getItem(claveDatosExtra(correo));
  if (!guardado) {
    return { fechaNacimiento: "", telefono: "", codigoFelices50Aplicado: false };
  }
  return JSON.parse(guardado);
}

// Guarda (mezclando con lo existente) los datos extra de perfil de un correo
function guardarDatosExtraPerfil(correo, datosNuevos) {
  var datosActuales = obtenerDatosExtraPerfil(correo);
  var datosCombinados = Object.assign(datosActuales, datosNuevos);
  localStorage.setItem(claveDatosExtra(correo), JSON.stringify(datosCombinados));
  return datosCombinados;
}

// Calcula la edad en años a partir de una fecha de nacimiento "yyyy-mm-dd"
function calcularEdad(fechaNacimiento) {
  if (!fechaNacimiento) {
    return null;
  }

  var hoy = new Date();
  var nacimiento = new Date(fechaNacimiento + "T00:00:00");
  if (isNaN(nacimiento.getTime())) {
    return null;
  }

  var edad = hoy.getFullYear() - nacimiento.getFullYear();
  var aunNoCumpleEsteAnio =
    hoy.getMonth() < nacimiento.getMonth() ||
    (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate());

  if (aunNoCumpleEsteAnio) {
    edad--;
  }
  return edad;
}

// Regla de negocio: descuento 50% para socios de 50 años o mas
function calificaParaDescuentoPorEdad(fechaNacimiento) {
  var edad = calcularEdad(fechaNacimiento);
  return edad !== null && edad >= 50;
}

// Regla de negocio: torta de cumpleaños gratis para correos institucionales Duoc
function calificaParaTortaDuoc(correo) {
  correo = (correo || "").trim().toLowerCase();
  for (var i = 0; i < dominiosDuoc.length; i++) {
    if (correo.endsWith(dominiosDuoc[i])) {
      return true;
    }
  }
  return false;
}

// Pinta un badge de beneficio como activo o inactivo
function marcarBeneficio(idBadge, activo, textoActivo, textoInactivo) {
  var badge = document.getElementById(idBadge);
  if (!badge) {
    return;
  }
  badge.textContent = activo ? textoActivo : textoInactivo;
  badge.classList.toggle("text-bg-success", activo);
  badge.classList.toggle("text-bg-secondary", !activo);
}

// Recalcula y refresca en pantalla los 3 beneficios segun las reglas de negocio
function actualizarBeneficios(usuario, datosExtra) {
  var tieneDescuentoPorEdad = calificaParaDescuentoPorEdad(datosExtra.fechaNacimiento);
  var tieneTortaDuoc = calificaParaTortaDuoc(usuario.correo);
  var tieneCodigo = datosExtra.codigoFelices50Aplicado === true;

  marcarBeneficio("estadoDescuento", tieneDescuentoPorEdad, "Activo", "No aplica");
  marcarBeneficio("estadoTortaDuoc", tieneTortaDuoc, "Activo", "No aplica");
  marcarBeneficio("estadoCodigo", tieneCodigo, "Aplicado", "No aplicado");

  // Si el codigo ya esta aplicado, no tiene sentido seguir mostrando el formulario para canjearlo
  var grupoCodigo = document.getElementById("grupoCodigoPromocional");
  if (grupoCodigo) {
    grupoCodigo.classList.toggle("d-none", tieneCodigo);
  }
}

// Rellena el formulario de "Mi cuenta" con los datos del usuario que inicio sesion
function cargarDatosDePerfil() {
  var usuario = obtenerUsuarioSesion();
  if (!usuario) {
    return;
  }

  var datosExtra = obtenerDatosExtraPerfil(usuario.correo);

  var inputNombre = document.getElementById("perfilNombre");
  var inputCorreo = document.getElementById("perfilCorreo");
  var inputFechaNacimiento = document.getElementById("perfilFechaNacimiento");
  var inputTelefono = document.getElementById("perfilTelefono");

  if (inputNombre) {
    inputNombre.value = usuario.nombre;
  }
  if (inputCorreo) {
    inputCorreo.value = usuario.correo;
  }
  if (inputFechaNacimiento) {
    inputFechaNacimiento.value = datosExtra.fechaNacimiento || "";
  }
  if (inputTelefono) {
    inputTelefono.value = datosExtra.telefono || "";
  }

  actualizarBeneficios(usuario, datosExtra);
}

// Guarda fecha de nacimiento y telefono (los unicos datos editables que no vienen en USUARIOS)
function guardarCambiosDePerfil(evento) {
  evento.preventDefault();

  var usuario = obtenerUsuarioSesion();
  if (!usuario) {
    return;
  }

  var inputFechaNacimiento = document.getElementById("perfilFechaNacimiento");
  var inputTelefono = document.getElementById("perfilTelefono");

  var datosExtra = guardarDatosExtraPerfil(usuario.correo, {
    fechaNacimiento: inputFechaNacimiento.value,
    telefono: inputTelefono.value,
  });

  actualizarBeneficios(usuario, datosExtra);
}

// Valida y aplica el codigo promocional FELICES50 a la cuenta del usuario en sesion
function aplicarCodigoPromocional() {
  var usuario = obtenerUsuarioSesion();
  if (!usuario) {
    return;
  }

  var inputCodigo = document.getElementById("inputCodigoPromocional");
  var mensaje = document.getElementById("mensajeCodigoPromocional");
  var codigoIngresado = inputCodigo.value.trim().toUpperCase();

  if (codigoIngresado !== CODIGO_FELICES50) {
    mensaje.textContent = "El código ingresado no es válido.";
    mensaje.className = "small mt-2 mb-0 text-danger";
    return;
  }

  var datosExtra = guardarDatosExtraPerfil(usuario.correo, { codigoFelices50Aplicado: true });
  mensaje.textContent = "¡Código aplicado con éxito!";
  mensaje.className = "small mt-2 mb-0 text-success";
  inputCodigo.value = "";
  actualizarBeneficios(usuario, datosExtra);
}

document.addEventListener("DOMContentLoaded", function () {
  cargarDatosDePerfil();

  var formulario = document.getElementById("formPerfil");
  if (formulario) {
    formulario.addEventListener("submit", guardarCambiosDePerfil);
  }

  var botonAplicarCodigo = document.getElementById("btnAplicarCodigo");
  if (botonAplicarCodigo) {
    botonAplicarCodigo.addEventListener("click", aplicarCodigoPromocional);
  }
});
