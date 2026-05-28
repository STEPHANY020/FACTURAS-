let tipoActual = "Factura Tienda";
let editando = null;

function seleccionarTipo(tipo){
    tipoActual = tipo;
    document.getElementById("tipoFactura").innerText = tipo;
}

function mostrarFormulario(){
    document.getElementById("formulario").classList.toggle("hidden");
}

function obtenerFacturas(){
    return JSON.parse(localStorage.getItem("facturas")) || [];
}

function guardarEnStorage(data){
    localStorage.setItem("facturas", JSON.stringify(data));
}

function guardarFactura(){

    let facturas = obtenerFacturas();

    let factura = {
        tipo: tipoActual,
        fecha: document.getElementById("fecha").value,
        mes: document.getElementById("mes").value,
        cedula: document.getElementById("cedula").value,
        nombre: document.getElementById("nombre").value,
        direccion: document.getElementById("direccion").value,
        telefono: document.getElementById("telefono").value,
        correo: document.getElementById("correo").value,
        pago: document.getElementById("pago").value,
        producto: document.getElementById("producto").value,
        cantidad: document.getElementById("cantidad").value,
        valor: parseFloat(document.getElementById("valor").value),
        iva: "0%"
    };

    if(editando !== null){
        facturas[editando] = factura;
        editando = null;
    }else{
        facturas.push(factura);
    }

    guardarEnStorage(facturas);

    alert("Factura guardada correctamente");

    limpiarFormulario();

    window.location.href =
    "mailto:stephanyortizcantos68@gmail.com?subject=Factura Guardada&body=Se registró una nueva factura.";
}

function limpiarFormulario(){

    document.getElementById("fecha").value = "";
    document.getElementById("cedula").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("valor").value = "";
}

function verMes(mes){

    let facturas = obtenerFacturas();

    let datos = facturas.filter(f => f.mes === mes);

    let html = `
    <h2>Facturas de ${mes}</h2>

    <table>
        <tr>
            <th>Tipo</th>
            <th>Fecha</th>
            <th>Nombre</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Valor</th>
            <th>Acciones</th>
        </tr>
    `;

    let total = 0;

    datos.forEach((f, index)=>{

        total += Number(f.valor);

        html += `
        <tr>
            <td>${f.tipo}</td>
            <td>${f.fecha}</td>
            <td>${f.nombre}</td>
            <td>${f.producto}</td>
            <td>${f.cantidad}</td>
            <td>$${f.valor}</td>
            <td>
                <button class="action-btn edit"
                onclick="editarFactura(${index})">
                Editar
                </button>

                <button class="action-btn delete"
                onclick="eliminarFactura(${index})">
                Eliminar
                </button>
            </td>
        </tr>
        `;
    });

    html += `</table>`;

    html += `
    <div class="total-box">
        TOTAL DEL MES: $${total.toFixed(2)}
    </div>
    `;

    document.getElementById("tablaMes").innerHTML = html;
}

function editarFactura(index){

    let codigo = prompt("Ingrese código para editar:");

    if(codigo !== "002125"){
        alert("Código incorrecto");
        return;
    }

    let facturas = obtenerFacturas();

    let f = facturas[index];

    document.getElementById("fecha").value = f.fecha;
    document.getElementById("mes").value = f.mes;
    document.getElementById("cedula").value = f.cedula;
    document.getElementById("nombre").value = f.nombre;
    document.getElementById("direccion").value = f.direccion;
    document.getElementById("telefono").value = f.telefono;
    document.getElementById("correo").value = f.correo;
    document.getElementById("pago").value = f.pago;
    document.getElementById("producto").value = f.producto;
    document.getElementById("cantidad").value = f.cantidad;
    document.getElementById("valor").value = f.valor;

    editando = index;

    document.getElementById("formulario")
    .classList.remove("hidden");
}

function eliminarFactura(index){

    let codigo = prompt("Ingrese código para eliminar:");

    if(codigo !== "002125"){
        alert("Código incorrecto");
        return;
    }

    let facturas = obtenerFacturas();

    facturas.splice(index,1);

    guardarEnStorage(facturas);

    alert("Factura eliminada");
}