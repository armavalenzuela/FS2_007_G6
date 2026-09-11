
document.addEventListener("DOMContentLoaded", function () {
  var textoGuardado = localStorage.getItem("ultimoPedidoMilSabores");
  var contenedor = document.getElementById("datosPedido");

  if (textoGuardado === null) {
    contenedor.innerHTML = "<p class='texto-secundario mb-0'>No encontramos un pedido reciente.</p>";
    return;
  }

  var pedido = JSON.parse(textoGuardado);

  var html = `
    <p class='mb-1'><strong>Número de pedido:</strong> ${pedido.numeroDePedido}</p>
    <p class='mb-1'><strong>Nombre:</strong> ${pedido.nombre}</p>
    <p class='mb-1'><strong>Fecha de entrega:</strong> ${pedido.fechaEntrega}</p>
    <p class='mb-0'><strong>Total pagado:</strong> ${pedido.total}</p>`;

  contenedor.innerHTML = html;
});
