//FUNCIONALIDADES

//1) Permitir seleccionar cuentas
//2) Permitir agendar gasto en cuenta
//3) Permitir borrar gasto en cuenta
//4) Permitir anotar ingreso en cuenta
//5) Permitir borrar ingreso en cuenta
//6) Generar balance cuenta


//GENERAMOS LAS CLASES 

class Gasto{
    constructor(id,importe,desc,){
        this.id = id;
        this.importe = importe;
        this.desc = desc;
    }
}

class Ingreso{
    constructor(id,importe,desc){
        this.id = id;
        this.importe = importe;
        this.desc = desc;
    }
}

class Cuenta{
    constructor(id,nombre,img){
        this.id = id;
        this.nombre = nombre;
        this.img = img;
        this.valor = 0.0;
    }
}

//INSTANCIAMOS LAS CUENTAS

const cuentaPrincipal = new Cuenta(1,"Cuenta Principal","./img/principal.png");
const cuentaEfectivo = new Cuenta(2,"Efectivo","./img/efectivo.png");
const cuentaBanco = new Cuenta(3,"Banco","./img/banco.webp");

const cuentas = [cuentaPrincipal,cuentaEfectivo,cuentaBanco];

//INSTANCIAMOS LOS GASTOS e INGRESOS

const gastos = [];

const ingresos = [];

//GENERAMOS LAS CUENTAS EN EL DOM

const contenedorCuentas = document.getElementById("contenedorCuentas");

const mostrarCuentas = () => {
    cuentas.forEach( cuenta =>{
        const card = document.createElement("div");
        card.classList.add("col-lg-4","col-md-6","col-sm-12");
        card.innerHTML=`
            <div class="card">
                <img src="${cuenta.img}" class="card-img-top imgCuentas" alt="${cuenta.nombre}">
                <div class="card-body">
                <h5 class="text-center">${cuenta.nombre}</h5>
                <p>$ ${cuenta.valor}</p>
                <div class="row">
                <div class="col-lg-6 col-md-12 col-sm-12">
                <button class="btn colorBotonA" id="${cuenta.id}">Agregar Gasto</buttton>
                </div>
                <div class="col-lg-4 col-md-12 col-sm-12">
                <button class="btn colorBotonB" id="${cuenta.id}">Quitar Gasto</buttton>
                </div>
                <div class="col-lg-4 col-md-12 col-sm-12">
                <button class="btn colorBotonA" id="${cuenta.id}">Agregar Ingreso</buttton>
                </div>
                <div class="col-lg-4 col-md-12 col-sm-12">
                <button class="btn colorBotonB" id="${cuenta.id}">Quitar Ingreso</buttton>
                </div>
                <div class="col-lg-4 col-md-12 col-sm-12">
                <button class="btn colorBotonC" id="${cuenta.id}">Ver Resumen</buttton>
                </div>
                </div>
            </div>
            </div>
        `
        contenedorCuentas.appendChild(card);
    })
}

mostrarCuentas();

