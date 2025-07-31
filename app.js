// Precios por tipo de entrada
const precioGeneral = 1000;
const precioVIP = 2000;
const precioPlatino = 3000;

// Código de descuento válido
const codigoValido = 'ROCK10';
const descuentoPorcentaje = 0.1;

// Elementos del DOM
const form = document.getElementById('reservaForm');
const alertContainer = document.getElementById('alertContainer');

// Al enviar el formulario
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const tipo = document.getElementById('tipoEntrada').value;
    const codigo = document.getElementById('codigoDescuento').value.trim().toUpperCase();

    let errores = "";

    if (nombre === "") {
        errores += "• El nombre no puede estar vacío<br>";
    }

    if (isNaN(cantidad) || cantidad < 1) {
        errores += "• La cantidad de entradas debe ser mayor a 0<br>";
    }

    if (tipo !== "general" && tipo !== "vip" && tipo !== "platino") {
        errores += "• Debe seleccionar un tipo de entrada válido<br>";
    }

    if (errores !== "") {
        mostrarError(errores);
        return;
    }

    let precioUnitario = 0;

    if (tipo === "general") precioUnitario = precioGeneral;
    if (tipo === "vip") precioUnitario = precioVIP;
    if (tipo === "platino") precioUnitario = precioPlatino;

    const subtotal = precioUnitario * cantidad;
    let descuento = 0;

    if (codigo === codigoValido) {
        descuento = subtotal * descuentoPorcentaje;
    }

    const total = subtotal - descuento;

    mostrarExito(nombre, cantidad, total);
});

function mostrarError(mensaje) {
    alertContainer.style.display = 'block';
    alertContainer.className = 'alert-container alert-error show';
    alertContainer.innerHTML = `
        <strong>❌ Error de Datos</strong><br><br>${mensaje}
    `;

    document.getElementById('reservaConfirmada').style.display = 'none';
    document.getElementById('resumenUsuario').style.display = 'none';
}

function mostrarExito(nombre, cantidad, total) {
    alertContainer.style.display = 'none';

    const divConfirmada = document.getElementById('reservaConfirmada');
    const divResumen = document.getElementById('resumenUsuario');

    divConfirmada.style.display = 'block';
    divConfirmada.textContent = "🎉 Reserva Confirmada";

    const precioPorEntrada = total / cantidad;

    divResumen.style.display = 'block';
    divResumen.textContent = `Hola ${nombre}, pagarás $${total}. Precio por entrada: $${precioPorEntrada}`;
}