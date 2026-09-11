
// Se guarda en localStorage para que el carrito no se borre al cambiar de pagina
var CLAVE_CARRITO = "carritoMilSabores";

// Devuelve el arreglo del carrito guardado en localStorage (o un arreglo vacio si no hay nada)
function obtenerCarrito() {
  var textoGuardado = localStorage.getItem(CLAVE_CARRITO);
  if (textoGuardado === null) {
    return [];
  }
  return JSON.parse(textoGuardado);
}

// Guarda el arreglo del carrito en localStorage
function guardarCarrito(carrito) {
  var textoParaGuardar = JSON.stringify(carrito);
  localStorage.setItem(CLAVE_CARRITO, textoParaGuardar);
  actualizarContadorCarrito();
}

// Agrega un producto al carrito. Si ya estaba, solo le suma la cantidad
function agregarAlCarrito(codigoProducto, cantidad) {
  var carrito = obtenerCarrito();
  var yaEstaEnElCarrito = false;

  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].codigo === codigoProducto) {
      carrito[i].cantidad = carrito[i].cantidad + cantidad;
      yaEstaEnElCarrito = true;
    }
  }

  if (yaEstaEnElCarrito === false) {
    carrito.push({ codigo: codigoProducto, cantidad: cantidad });
  }

  guardarCarrito(carrito);
}

// Cuenta cuantas unidades en total hay en el carrito, y lo muestra en el "badge" del navbar
function actualizarContadorCarrito() {
  var carrito = obtenerCarrito();
  var totalUnidades = 0;

  for (var i = 0; i < carrito.length; i++) {
    totalUnidades = totalUnidades + carrito[i].cantidad;
  }

  var badges = document.querySelectorAll(".contador-carrito");
  for (var j = 0; j < badges.length; j++) {
    badges[j].textContent = totalUnidades;
  }
}

// Cambia la cantidad de un producto que ya esta en el carrito
function cambiarCantidadEnCarrito(codigoProducto, nuevaCantidad) {
  var carrito = obtenerCarrito();
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].codigo === codigoProducto) {
      carrito[i].cantidad = nuevaCantidad;
    }
  }
  guardarCarrito(carrito);
}

// Elimina un producto del carrito por completo
function eliminarDelCarrito(codigoProducto) {
  var carritoNuevo = [];
  var carritoActual = obtenerCarrito();

  for (var i = 0; i < carritoActual.length; i++) {
    if (carritoActual[i].codigo !== codigoProducto) {
      carritoNuevo.push(carritoActual[i]);
    }
  }

  guardarCarrito(carritoNuevo);
}

// Apenas carga cualquier pagina que incluya este archivo, actualizamos el numerito del carrito y el año del footer
document.addEventListener("DOMContentLoaded", function () {
  actualizarContadorCarrito();
  actualizarAnioFooter();
});
