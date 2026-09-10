(function () {
    var rolesPermitidos = document.body.dataset.roles.split(",");

    if (!protegerPagina(rolesPermitidos, "../login.html")) {
        return;
    }

    if (localStorage.getItem("usuarioTipo") === "vendedor") {
        document.querySelectorAll(".solo-admin").forEach(function (elemento) {
            elemento.remove();
        });
    }
})();
