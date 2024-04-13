//FUNCIONALIDADES

//1) Permitir seleccionar cuentas mostrandolas en el DOM
//2) Generar balance cuenta
//3) Mostrar resumen de cuenta


//GENERAMOS LAS CLASES 

class Gasto{
    constructor(id,importe,desc,cuenta){
        this.id = id;
        this.importe = importe;
        this.desc = desc;
        this.cuenta = cuenta;
    }
}

class Ingreso{
    constructor(id,importe,desc,cuenta){
        this.id = id;
        this.importe = importe;
        this.desc = desc;
        this.cuenta = cuenta;
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

const gastoA = new Gasto(1,30000,"Arreglo PC",cuentaPrincipal.id);
const gastoB = new Gasto(2,3000,"Arreglo PC",cuentaBanco.id);
const gastoC = new Gasto(3,25000,"Arreglo PC",cuentaEfectivo.id);
const gastoD = new Gasto(4,10000,"Arreglo PC",cuentaPrincipal.id);
const gastoE = new Gasto(5,11000,"Arreglo PC",cuentaEfectivo.id);

const gastos = [gastoA,gastoB,gastoC,gastoD,gastoE];

const ingA = new Ingreso(1,3000000,"Pagina Web",cuentaPrincipal.id);
const ingB = new Ingreso(2,40000,"Regalo cumpleanios",cuentaEfectivo.id);

const ingresos = [ingA,ingB];

//GENERAMOS LAS CUENTAS EN EL DOM

const contenedorCuentas = document.getElementById("contenedorCuentas");
const contenedorResumen = document.getElementById("contenedorResumen");

const mostrarCuentas = () => {
    cuentas.forEach( cuenta =>{
        const card = document.createElement("div");
        card.classList.add("col-lg-4","col-md-6","col-sm-12");
        card.innerHTML=`
            <div class="card">
                <img src="${cuenta.img}" class="card-img-top imgCuentas" alt="${cuenta.nombre}">
                <div class="card-body">
                <h5 class="text-center">${cuenta.nombre}</h5>
                <p id="valorCuenta${cuenta.id}">$ ${cuenta.valor}</p>
                <div class="row">
                    <div class="col-lg-6 col-md-12 col-sm-12">
                        <button id="boton${cuenta.id}" class="colorBotonA btn">Calcular Balance</button>
                    </div>
                    <div class="col-lg-6 col-md-12 col-sm-12">
                    <button id="verResumen${cuenta.id}" class="colorBotonB btn">Ver Resumen</button>
                </div>
                </div>
            </div>
        `
        contenedorCuentas.appendChild(card);

        const boton = document.getElementById(`boton${cuenta.id}`);
        boton.addEventListener("click", ()=>{
            const valorCuenta = document.getElementById(`valorCuenta${cuenta.id}`);
            valorCuenta.innerHTML=""
            valor=document.createElement("div")
            valor.innerHTML=`<p id="valorCuenta">$ ${calcularBalance(cuenta.id)}</p>`
            valorCuenta.appendChild(valor);
        })

        const botonResumen = document.getElementById(`verResumen${cuenta.id}`);
        botonResumen.addEventListener("click",()=>{
            verResumen(cuenta.id)
        })
    })  
}

mostrarCuentas();

const calcularBalance = (id) =>{
    let balance =0;
    let totalGasto = 0;
    let totalIng = 0;
    
    gastos.forEach(gasto =>{
        if(gasto.cuenta === id){
            totalGasto = totalGasto+gasto.importe;
        }    
    })

    ingresos.forEach(ing =>{
        if(ing.cuenta === id){
            totalIng = totalIng+ing.importe;
        }
    })

    balance =(totalIng - totalGasto);
    return balance;
    
}

const verResumen = (id) =>{

    contenedorResumen.innerHTML="";

   balance = (calcularBalance(id)).toString();
   const gastosResumen = [];
   const ingresosResumen = [];

   gastos.forEach(gasto=>{
        if(gasto.cuenta === id){
            gastosResumen.push(gasto);
        }
   })

   ingresos.forEach(ing=>{
    if(ing.cuenta === id){
        ingresosResumen.push(ing);
    }
   })

   gastosResumen.forEach(gasto=>{
        cuentaResumen = cuentas.find(cuenta => cuenta.id === gasto.cuenta);
        const card = document.createElement("div");
        card.classList.add("col-lg-12","col-md-12","col-sm-12");
        card.innerHTML=`
        <div>
            <p class="text-center">la cuenta ${cuentaResumen.nombre} gasto $${gasto.importe} en ${gasto.desc}</p>
        </div>
        `
        contenedorResumen.appendChild(card);
   })

   ingresosResumen.forEach(ing=>{
    cuentaResumen = cuentas.find(cuenta => cuenta.id === ing.cuenta);
    const card = document.createElement("div");
    card.classList.add("col-lg-12","col-md-12","col-sm-12");
    card.innerHTML=`
    <div>
        <p class="text-center">la cuenta ${cuentaResumen.nombre} ingreso $${ing.importe} debido a ${ing.desc}</p>
    </div>
    `
    contenedorResumen.appendChild(card);

   })

   balanceResumen = document.createElement("div");
   balanceResumen.classList.add("col-lg-12","col-md-12","col-sm-12");
   balanceResumen.innerHTML=`
    <p class="text-center">El balance de la cuenta es $${balance}</p>
   `
   contenedorResumen.appendChild(balanceResumen);
}


