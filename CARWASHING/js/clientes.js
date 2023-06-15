
let clientes = [];
let editando = false;
let LS = window.localStorage;

 if (LS.getItem('clientes')) {
     clientes = JSON.parse(LS.getItem('clientes'));
 }

imprimirTabla(clientes);

const form = document.querySelector('#form-anadir');

form.addEventListener('submit', e => {
    e.preventDefault(); // Prevenir que se recargue la página enviando el form
    
    anadirCliente();
});

function  anadirCliente(){
    const identificacion = document.querySelector('#identificacion').value;
    const nombres = document.querySelector('#nombres').value;
    const apellidos = document.querySelector('#apellidos').value;
    const placa= document.querySelector('#placa').value;
    const tipo = document.querySelector('#tipo').value;
    const email = document.querySelector('#email').value;
    const telefono = document.querySelector('#telefono').value;

    const nuevoCliente = {
        id: editando === false ? Date.now() : editando, // Condición ternaria
        identificacion,
        nombres,
        apellidos,
        placa,
        tipo,
        email,
        telefono,
        puntos: 0
    }

    if (editando) {
        nuevoCliente.id = editando
        // clientes.forEach(cliente =>{
        //     if (cliente.id == editando){
        //         cliente.nombres = nuevoCliente.nombres;
        //         cliente.apellidos = nuevoCliente.apellidos;

        //     }
        // })
        clientes = clientes.map(cliente => cliente.id === editando ? nuevoCliente : cliente)
        // Revierto los cambios en los titulos
        document.querySelector('#btn-Add').textContent = 'Añadir';

    } else {
        clientes.push(nuevoCliente);
    }

    editando = false;

    LS.setItem('clientes', JSON.stringify(clientes));

    form.reset();

    imprimirTabla(clientes);
}


function imprimirTabla(dic){
    let tabla = document.querySelector("#tabla-clientes");
    tabla.innerHTML = "";

    dic.forEach(cliente => {
        tabla.innerHTML += `
        <tr>
        <td>${cliente.identificacion}</td>
        <td>${cliente.nombres}</td>
        <td>${cliente.apellidos}</td>
        <td>${cliente.placa}</td>
        <td>${cliente.tipo}</td>
        <td>${cliente.email}</td>
        <td>${cliente.telefono}</td>
        <td class="">
        <div class="d-flex justify-content-center align-items-center">
        <button class="btn btn-primary me-1" onclick="cargarDatos(${cliente.id})"> EDITAR </button>
        <button class="btn btn-danger" onclick="eliminar(${cliente.id})">ELIMINAR</button>
        </div>
        </td>
        </tr>
        `
    });
}

function eliminar(id){
    clientes = clientes.filter(cliente => cliente.id !== id);
    LS.setItem('clientes', JSON.stringify(clientes));
    imprimirTabla(clientes)
}

function cargarDatos(id){
    document.getElementById("btn-Add").textContent = "Guardar Cambios";


    clientes.forEach(cliente => {
        if (cliente.id == id){
            identificacion.value = cliente.identificacion;
            nombres.value = cliente.nombres;
            apellidos.value = cliente.apellidos;
            telefono.value = cliente.telefono;
        }
        
    })

    editando = id;
    
}