const LS = window.localStorage;
let clientes = [];
let cars = [];
let datoCliente = [];
let datosCars = [];
let carSeleccionado;



if (LS.getItem('clientes')) {
    clientes = JSON.parse(LS.getItem('clientes'));
}

if(LS.getItem('cars')){
    cars = JSON.parse(LS.getItem('cars'))
}

const modClientes = document.querySelector('#clientes');
const modCars = document.querySelector('#cars');



imprimirCliente(clientes);

const inputBuscar = document.querySelector('#buscar-clientes');
inputBuscar.addEventListener('keyup', buscarClientes);


const btnSelectCliente = document.querySelector('#select-cliente');
btnSelectCliente.addEventListener('click', () => {

    modClientes.classList.add('d-none');
    modCars.classList.remove('d-none');

    cargarClienteTicket();
});



function buscarClientes(){
    if (isNaN(inputBuscar.value)){
        busqueda = clientes.filter(function(cliente){
            return (
                cliente.identificacion.toLowerCase().includes(inputBuscar.value.toLowerCase()) || 
                cliente.nombres.toLowerCase().includes(inputBuscar.value.toLowerCase()) || 
                cliente.apellidos.toLowerCase().includes(inputBuscar.value.toLowerCase()) || 
                cliente.placa.toLowerCase().includes(inputBuscar.value.toLowerCase())|| 
                cliente.tipo.toLowerCase().includes(inputBuscar.value.toLowerCase()) || 
                cliente.email.toLowerCase().includes(inputBuscar.value.toLowerCase())||
                cliente.telefono.toLowerCase().includes(inputBuscar.value.toLowerCase())
            )
        });

        if(busqueda.length === 1){
            btnSelectCliente.classList.remove('disabled');
        } else if (busqueda.length > 1 || busqueda.length < 1 && btnSelectCliente.classList.contains('disabled')) {
        }
        datoCliente = busqueda;
        imprimirCliente(busqueda);
        } else{
        let busqueda = clientes.filter(function(cliente){
            return cliente.identificacion.includes(inputBuscar.value);
            
        })
        if(busqueda.length === 1){
            btnSelectCliente.classList.remove('disabled');
        }
        else if (busqueda.length > 1 || busqueda.length < 1 && btnSelectCliente.classList.contains('disabled')) {
        }
        datoCliente = busqueda;
        imprimirCliente(busqueda);
    }
} 



function cargarClienteTicket(){
    const clienteDatos = document.querySelector('#clienteDatos');
    clienteDatos.innerHTML = `
                        <p><b>Documento:</b> ${datoCliente[0].identificacion}</p>
                        <p><b>Nombres:</b>${datoCliente[0].nombres} </p>
                        <p><b>Apellidos:</b> ${datoCliente[0].apellidos}</p>
                        <p><b>Placa del auto:</b>${datoCliente[0].placa} </p>
                        <p><b>Tipo:</b>${datoCliente[0].tipo} </p>
                        <p><b>Email:</b> ${datoCliente[0].email}</p>
                        <p><b>Telefono:</b>${datoCliente[0].telefono} </p> 
                  


            `
}



function imprimirCliente(dic){
    const tabla = document.getElementById("tabla-clientes");
    tabla.innerHTML = "";

    dic.forEach(cliente => {
        tabla.innerHTML += `<tr>
        <td>${cliente.identificacion}</td>
        <td>${cliente.nombres}</td>
        <td>${cliente.apellidos}</td>
        <td>${cliente.placa}</td>
        <td>${cliente.tipo}</td>
        <td>${cliente.email}</td>
        <td>${cliente.telefono}</td>
        </tr>`
    });
}



imprimirLavados(cars);

const inputBuscarV = document.querySelector('#datos');
inputBuscarV.addEventListener('keyup', buscarLavados);

const btnSelectV = document.querySelector('#comprar');
btnSelectV.addEventListener('click', () => {
    cargarLavadoTicket();
    
    document.querySelector('#form-tickets').classList.add('d-none');

    clientes.forEach((cliente,idx) => {
        if(cliente.id === datoCliente[0].id){
            clientes[idx].puntos += parseInt(datoLavados[0].puntos)
        }
    })

    LS.setItem('clientes', JSON.stringify(clientes));
});


function buscarLavados(){
    if (inputBuscarV.value) {
        busqueda = cars.filter(function (lavado) {
            return lavado.nombre.toLowerCase().includes(inputBuscarV.value.toLowerCase());
        });

        // Validar si es un sólo usuario
        if (busqueda.length === 1) {
            btnSelectV.classList.remove('disabled');
        } else if (busqueda.length > 1 || busqueda.length < 1 && btnSelectV.classList.contains('disabled')) {
            btnSelectV.classList.add('disabled');
        }

        datosCars = busqueda;

        imprimirLavados(busqueda);
    }
} 

function cargarLavadoTicket() {
    const lavadosDatos = document.querySelector('#carDatos');

    lavadosDatos.innerHTML = `
        <p><b>Valor lavado:</b> ${datosCars[0].valor}</p>
        <p><b>+IVA:</b> ${datosCars[0].valor * 0.16}</p>
        <p><b>+Tasa adicional:</b> ${datosCars[0].valor * 0.04}</p>
        <p><b>Total:</b> ${datosCars[0].valor * 1.08}</p>
        <hr>
        <p><b>Puntos de Fidelización de Lavado:</b> ${datosCars[0].puntos}</p>
    `
}


// TablasMostrar



function imprimirLavados(dic){
    const tabla = document.getElementById("tabla-cars");
    tabla.innerHTML = "";
    dic.forEach(cliente => {
        tabla.innerHTML += `<tr>
        <td>${cliente.id}</td>
        <td>${cliente.nombre}</td>
        <td>${cliente.tematica}</td>
        <td>${cliente.valor}</td>
        <td>${cliente.puntos}</td>
        </tr>`
    });
}

















