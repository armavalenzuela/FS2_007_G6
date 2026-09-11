
function pintarCarrito() {
  var carrito = obtenerCarrito();
  var contenedor = document.getElementById("listaCarrito");
  var subtotal = 0;

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p class='texto-secundario'>Tu carrito está vacío. <a href='catalog.html'>Ir al catálogo</a></p>";
  } else {
    var html = "";
    for (var i = 0; i < carrito.length; i++) {
      var lineaDelCarrito = carrito[i];
      var producto = buscarProductoPorCodigo(lineaDelCarrito.codigo);

      if (producto === null) {
        continue; // por si el codigo guardado ya no existe en el arreglo de productos
      }

      var subtotalDeLaLinea = producto.precio * lineaDelCarrito.cantidad;
      subtotal = subtotal + subtotalDeLaLinea;

      html += `
        <div class='card-producto p-3 mb-3 d-flex align-items-center justify-content-between flex-wrap gap-2'>
          <div>
            <h6 class='mb-1'>${producto.nombre}</h6>
            <p class='small texto-secundario mb-0'>${formatoPesos(producto.precio)} c/u</p>
          </div>
          <div class='d-flex align-items-center gap-2'>
            <input type='number' min='1' value='${lineaDelCarrito.cantidad}' class='form-control input-cantidad' style='width:70px;' data-codigo='${producto.codigo}'>
            <button class='btn btn-outline-mil-sabores btn-sm btn-quitar' data-codigo='${producto.codigo}'>Quitar</button>
          </div>
        </div>`;
    }
    contenedor.innerHTML = html;
  }

  document.getElementById("resumenSubtotal").textContent = formatoPesos(subtotal);
  document.getElementById("resumenTotal").textContent = formatoPesos(subtotal);

  // si el carrito esta vacio, se desactiva el boton de pagar
  var botonPagar = document.getElementById("btnPagar");
  if (carrito.length === 0) {
    botonPagar.classList.add("disabled");
  } else {
    botonPagar.classList.remove("disabled");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  pintarCarrito();

  // Botones de quitar y cambiar cantidad 
  var contenedor = document.getElementById("listaCarrito");

  contenedor.addEventListener("click", function (evento) {
    if (evento.target.classList.contains("btn-quitar")) {
      var codigo = evento.target.getAttribute("data-codigo");
      eliminarDelCarrito(codigo);
      pintarCarrito();
    }
  });

  contenedor.addEventListener("change", function (evento) {
    if (evento.target.classList.contains("input-cantidad")) {
      var codigo = evento.target.getAttribute("data-codigo");
      var nuevaCantidad = Number(evento.target.value);
      cambiarCantidadEnCarrito(codigo, nuevaCantidad);
      pintarCarrito();
    }
  });
});
