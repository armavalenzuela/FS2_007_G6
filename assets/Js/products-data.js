
// Cualquier pagina que necesite mostrar productos usa este archivo

var productos = [
  { codigo: "TC001", categoria: "Tortas Cuadradas", tipo: "cuadrada", nombre: "Torta Cuadrada de Chocolate", precio: 45000, stock: 12, descripcion: "Torta de chocolate con capas de ganache y un toque de avellanas." },
  { codigo: "TC002", categoria: "Tortas Cuadradas", tipo: "cuadrada", nombre: "Torta Cuadrada de Frutas", precio: 50000, stock: 8, descripcion: "Frutas frescas y crema chantilly sobre bizcocho de vainilla." },
  { codigo: "TT001", categoria: "Tortas Circulares", tipo: "circular", nombre: "Torta Circular de Vainilla", precio: 40000, stock: 15, descripcion: "Bizcocho de vainilla relleno con crema pastelera." },
  { codigo: "TT002", categoria: "Tortas Circulares", tipo: "circular", nombre: "Torta Circular de Manjar", precio: 42000, stock: 10, descripcion: "Torta tradicional chilena con manjar y nueces." },
  { codigo: "PI001", categoria: "Postres Individuales", tipo: "individual", nombre: "Mousse de Chocolate", precio: 5000, stock: 30, descripcion: "Postre individual cremoso, hecho con chocolate de alta calidad." },
  { codigo: "PI002", categoria: "Postres Individuales", tipo: "individual", nombre: "Tiramisú Clásico", precio: 5500, stock: 25, descripcion: "Postre italiano con capas de café, mascarpone y cacao." },
  { codigo: "PT001", categoria: "Pastelería Tradicional", tipo: "tradicional", nombre: "Empanada de Manzana", precio: 3000, stock: 40, descripcion: "Pastelería tradicional rellena de manzanas especiadas." },
  { codigo: "PT002", categoria: "Pastelería Tradicional", tipo: "tradicional", nombre: "Tarta de Santiago", precio: 6000, stock: 20, descripcion: "Tradicional tarta española con almendras y azúcar." },
  { codigo: "PV001", categoria: "Productos Vegana", tipo: "circular", nombre: "Torta Vegana de Chocolate", precio: 50000, stock: 6, descripcion: "Torta de chocolate húmeda, sin productos de origen animal." },
  { codigo: "TE001", categoria: "Tortas Especiales", tipo: "circular", nombre: "Torta Especial de Cumpleaños", precio: 55000, stock: 5, descripcion: "Diseñada para celebraciones, personalizable con mensajes." }
];

// Busca un producto por su codigo
function buscarProductoPorCodigo(codigo) {
  for (var i = 0; i < productos.length; i++) {
    if (productos[i].codigo === codigo) {
      return productos[i];
    }
  }
  return null;
}

// Convierte un numero en texto con formato de pesos chilenos
function formatoPesos(numero) {
  return "$" + numero.toLocaleString("es-CL");
}
