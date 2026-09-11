
function pintarResumenDeCheckout() {
  var carrito = obtenerCarrito();
  var contenedor = document.getElementById("resumenItems");
  var subtotal = 0;
  var html = "";

  for (var i = 0; i < carrito.length; i++) {
    var producto = buscarProductoPorCodigo(carrito[i].codigo);
    if (producto === null) {
      continue;
    }
    var subtotalLinea = producto.precio * carrito[i].cantidad;
    subtotal = subtotal + subtotalLinea;

    html += `
      <div class='d-flex justify-content-between small mb-1'>
        <span>${carrito[i].cantidad} x ${producto.nombre}</span>
        <span>${formatoPesos(subtotalLinea)}</span>
      </div>`;
  }

  contenedor.innerHTML = html;
  document.getElementById("chkSubtotal").textContent = formatoPesos(subtotal);
  document.getElementById("chkTotal").textContent = formatoPesos(subtotal);

  return subtotal;
}

function marcarComoInvalido(input) {
  input.classList.add("is-invalid");
}

function marcarComoValido(input) {
  input.classList.remove("is-invalid");
}

function validarFormularioCheckout(evento) {
  evento.preventDefault();

  var carrito = obtenerCarrito();
  if (carrito.length === 0) {
    alert("Tu carrito está vacío, agrega productos antes de continuar.");
    return;
  }

  var inputNombre = document.getElementById("chkNombre");
  var inputTelefono = document.getElementById("chkTelefono");
  var inputDireccion = document.getElementById("chkDireccion");
  var inputFecha = document.getElementById("chkFecha");

  var formularioValido = true;

  if (inputNombre.value.trim().length > 0) {
    marcarComoValido(inputNombre);
  } else {
    marcarComoInvalido(inputNombre);
    formularioValido = false;
  }

  if (inputTelefono.value.trim().length > 0) {
    marcarComoValido(inputTelefono);
  } else {
    marcarComoInvalido(inputTelefono);
    formularioValido = false;
  }

  if (inputDireccion.value.trim().length > 0) {
    marcarComoValido(inputDireccion);
  } else {
    marcarComoInvalido(inputDireccion);
    formularioValido = false;
  }

  if (inputFecha.value.length > 0) {
    marcarComoValido(inputFecha);
  } else {
    marcarComoInvalido(inputFecha);
    formularioValido = false;
  }

  if (formularioValido === false) {
    return;
  }

  // Guardamos un resumen del pedido
  var pedido = {
    nombre: inputNombre.value.trim(),
    total: document.getElementById("chkTotal").textContent,
    fechaEntrega: inputFecha.value,
    numeroDePedido: "MS-" + Math.floor(Math.random() * 900000 + 100000)
  };
  localStorage.setItem("ultimoPedidoMilSabores", JSON.stringify(pedido));

  localStorage.removeItem(CLAVE_CARRITO); // vaciamos el carrito porque la compra ya se hizo
  window.location.href = "confirmation.html";
}

document.addEventListener("DOMContentLoaded", function () {
  pintarResumenDeCheckout();
  document.getElementById("formCheckout").addEventListener("submit", validarFormularioCheckout);
});
