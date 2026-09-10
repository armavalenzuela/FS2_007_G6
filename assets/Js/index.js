
function pintarProductosDestacados() {
  var contenedor = document.getElementById("contenedorDestacados");
  var html = "";

  // Mostramos solo los primeros 4 productos como destacados
  for (var i = 0; i < 4 && i < productos.length; i++) {
    var producto = productos[i];
    html += `
      <div class='col-6 col-lg-3'>
        <div class='card-producto p-3'>
          <h6 class='mt-2'>${producto.nombre}</h6>
          <p class='precio mb-2'>${formatoPesos(producto.precio)}</p>
          <a href='products.html?codigo=${producto.codigo}' class='btn btn-mil-sabores btn-sm w-100'>Ver producto</a>
        </div>
      </div>`;
  }
  contenedor.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", pintarProductosDestacados);
