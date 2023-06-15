let cars= [];
let form = document.getElementById("form-anadir");

let LS = window.localStorage;
if (LS.getItem('cars')) {
    cars = JSON.parse(LS.getItem('cars'));
}

imprimirV(cars);

form.addEventListener('submit', e =>{
    e.preventDefault();
    agregarV();
})

function agregarV(){
    const nombre = document.getElementById("nombre").value;
    const valor = document.getElementById("valor").value;
    const descrip = document.getElementById("descrip").value;
    const puntos = document.getElementById("puntos").value;

    let nuevoV = {
        id: Date.now(),
        nombre,
        valor,
        descrip,
        puntos
    }

    cars.push(nuevoV);

    LS.setItem('cars', JSON.stringify(cars));

    imprimirV(cars);
}

function imprimirV(dic){
    let tabla = document.getElementById("tabla-vid");
    tabla.innerHTML = "";

    dic.forEach(car => {
        tabla.innerHTML += `
        <tr>
        <td>${car.id}</td>
        <td>${car.nombre}</td>
        <td>${car.valor}</td>
        <td>${car.descrip}</td>
        <td>${car.puntos}</td>
        <td class="">
        <div class="d-flex justify-content-center align-items-center">
        <button class="btn btn-danger" onclick="eliminar(${car.id})"> B </button>
        </div>
        </td>
        </tr>
        `
    });
}

function eliminar(id){
    cars = cars.filter(car => car.id !== id)
    LS.setItem('car', JSON.stringify(cars));
    imprimirV(cars)
}