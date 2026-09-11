// Dibuja en pantalla un arreglo de productos dentro de #grillaProductos
function pintarProductos(listaDeProductos) {
  var grilla = document.getElementById("grillaProductos");
  var contador = document.getElementById("contadorResultados");

  contador.textContent = listaDeProductos.length + " productos encontrados";

  var htmlCompleto = "";
  for (var i = 0; i < listaDeProductos.length; i++) {
    var producto = listaDeProductos[i];

    htmlCompleto += `
      <div class='col-6 col-md-4'>
        <div class='card-producto p-3'>
          <div class='card-img-top mb-3'>
            <img src='${producto.imagen}' alt='${producto.nombre}' class='w-100 h-100' style='object-fit:cover;' onerror='this.remove()'>
          </div>
          <a href='products.html?codigo=${producto.codigo}' class='text-decoration-none'>
            <h6 class='mt-2'>${producto.nombre}</h6>
          </a>
          <p class='small texto-secundario mb-2'>${producto.descripcion}</p>
          <p class='precio mb-2'>${formatoPesos(producto.precio)}</p>
          <button class='btn btn-mil-sabores btn-sm w-100 btn-agregar' data-codigo='${producto.codigo}'>Añadir</button>
        </div>
      </div>`;
  }

  grilla.innerHTML = htmlCompleto;
}

// Revisa los 3 filtros y devuelve solo los productos que cumplen con estos
function aplicarFiltros() {
  var texto = document.getElementById("inputBusqueda").value.toLowerCase();
  var categoriaElegida = document.getElementById("filtroCategoria").value;
  var tipoElegido = document.getElementById("filtroTipo").value;
  var ordenElegido = document.getElementById("filtroOrden").value;

  var resultado = [];
  for (var i = 0; i < productos.length; i++) {
    var producto = productos[i];
    var coincideTexto = producto.nombre.toLowerCase().indexOf(texto) !== -1;
    var coincideCategoria = categoriaElegida === "" || producto.categoria === categoriaElegida;
    var coincideTipo = tipoElegido === "" || producto.tipo === tipoElegido;

    if (coincideTexto && coincideCategoria && coincideTipo) {
      resultado.push(producto);
    }
  }

  if (ordenElegido === "asc") {
    resultado.sort(function (a, b) { return a.precio - b.precio; });
  }
  if (ordenElegido === "desc") {
    resultado.sort(function (a, b) { return b.precio - a.precio; });
  }

  pintarProductos(resultado);
}

// Llena el select de categorias con las categorias que existan en products-data.js
function llenarSelectDeCategorias() {
  var selectCategoria = document.getElementById("filtroCategoria");
  var categoriasYaAgregadas = [];

  for (var i = 0; i < productos.length; i++) {
    var categoria = productos[i].categoria;
    if (categoriasYaAgregadas.indexOf(categoria) === -1) {
      categoriasYaAgregadas.push(categoria);
      selectCategoria.innerHTML += `<option value='${categoria}'>${categoria}</option>`;
    }
  }
}

//Limpia todos los filtros y vuelve a mostrar todos los productos
function limpiarFiltros() {
  document.getElementById("inputBusqueda").value = "";
  document.getElementById("filtroCategoria").value = "";
  document.getElementById("filtroTipo").value = "";
  document.getElementById("filtroOrden").value = "";
  aplicarFiltros();
}

document.addEventListener("DOMContentLoaded", function () {
  llenarSelectDeCategorias();
  pintarProductos(productos); // al entrar a la pagina, se muestran todos los productos sin filtrar

  document.getElementById("inputBusqueda").addEventListener("input", aplicarFiltros);
  document.getElementById("filtroCategoria").addEventListener("change", aplicarFiltros);
  document.getElementById("filtroTipo").addEventListener("change", aplicarFiltros);
  document.getElementById("filtroOrden").addEventListener("change", aplicarFiltros);
  document.querySelector(".btn-outline-mil-sabores").addEventListener("click", limpiarFiltros);

  // Agrega al carrito el producto que se presiona en el boton "Añadir" de la grilla 
  document.getElementById("grillaProductos").addEventListener("click", function (evento) {
    if (evento.target.classList.contains("btn-agregar")) {
      var codigo = evento.target.getAttribute("data-codigo");
      agregarAlCarrito(codigo, 1);
      alert("Producto agregado al carrito");
    }
  });
});
