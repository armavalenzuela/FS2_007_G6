
//Muestra el detalle de un producto segun el codigo que se ingresa en la URL
function mostrarDetalleDelProducto() {
  var parametros = new URLSearchParams(window.location.search);
  var codigo = parametros.get("codigo");

  var producto = buscarProductoPorCodigo(codigo);
  var contenedor = document.getElementById("detalleProducto");

  if (producto === null) {
    var plantilla = document.getElementById("plantillaNoEncontrado");
    contenedor.innerHTML = plantilla.innerHTML;
    return;
  }

  document.title = "Pastelería Mil Sabores | " + producto.nombre;

  var html = `
    <div class='row g-4'>
      <div class='col-md-6'>
        <div class='card-producto detalle-img-producto'>
          <img src='${producto.imagen}' alt='${producto.nombre}' class='w-100 h-100' style='object-fit:cover;' onerror="this.remove(); this.parentElement.classList.add('p-5','text-center'); this.parentElement.textContent='${producto.categoria}';">
        </div>
      </div>
      <div class='col-md-6'>
        <h1 class='fs-2'>${producto.nombre}</h1>
        <p class='texto-secundario'>${producto.descripcion}</p>
        <p class='precio fs-3'>${formatoPesos(producto.precio)}</p>
        <label class='form-label' for='inputCantidad'>Cantidad</label>
        <input type='number' id='inputCantidad' class='form-control mb-3' value='1' min='1' style='max-width:120px;'>
        <button id='btnAgregar' class='btn btn-mil-sabores btn-lg w-100'>Añadir al carrito</button>
      </div>
    </div>`;

  contenedor.innerHTML = html;

  // Boton para agregar el producto al carrito
  document.getElementById("btnAgregar").addEventListener("click", function () {
    var cantidad = Number(document.getElementById("inputCantidad").value);
    agregarAlCarrito(producto.codigo, cantidad);

    var toast = new bootstrap.Toast(document.getElementById("toastAgregado"));
    toast.show();
  });
}

document.addEventListener("DOMContentLoaded", mostrarDetalleDelProducto);
