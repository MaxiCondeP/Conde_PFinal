/* Se simula un carrito de compras, de una página que vende impresiones de fotografias,
*/

//se inicializan totales
let contadorCarrito = 0;
let totalCarrito = 0;

///////////////////////////////////////////////////////////ARRAY DE IMAGENES A LA VENTA//////////////////////////////////////////////////////

let productos = [
    { codigo: "0001", descripcion: "", autor: "", img: "https://i.ibb.co/DQMWsKP/Maxi-1.jpg" },
    { codigo: "0002", descripcion: "", autor: "", img: "https://i.ibb.co/DQMWsKP/Maxi-1.jpg" },
    { codigo: "0003", descripcion: "", autor: "", img: "https://i.ibb.co/DQMWsKP/Maxi-1.jpg" },
    { codigo: "0004", descripcion: "", autor: "", img: "https://i.ibb.co/DQMWsKP/Maxi-1.jpg" },
    { codigo: "0005", descripcion: "", autor: "", img: "https://i.ibb.co/DQMWsKP/Maxi-1.jpg" },
    { codigo: "0006", descripcion: "", autor: "", img: "https://i.ibb.co/DQMWsKP/Maxi-1.jpg" }
]
///////////////////////////////////////////////////////////FUNCIONES CARRITO//////////////////////////////////////////////////////



    //recorro el storage, y traigo la lista
    const traerListaStorage=()=>{
        let listaOrden=[];
        if(localStorage.getItem('carrito') != null){
            listaOrden=JSON.parse(localStorage.getItem("carrito"));
        }
       return listaOrden; 
    }



    //recorro array de items y sumo cantidades
    const contarCantidad=(listaOrden)=> {
        let cant = 0;
        for (let i = 0; i < listaOrden.length; i++) {
            cant += listaOrden[i].cantidad;
        }
        return cant;
    }

    //recorro array de items y sumo totales
    const calcularMonto=(listaOrden)=> {
        let monto = 0;
        for (let i = 0; i < listaOrden.length; i++) {
            monto += listaOrden[i].total;
        }
        return monto;
    }

    //se calcula el monto a descontar acorde al porcentaje de  descuento
    const calcularDescuento=(monto, descuento)=> {
        let descuentoTotal = ((monto * descuento) / 100);
        return descuentoTotal;
    }

    ///se calcula el monto total , haciendo el descuento correspondiente.
    const calcularTotal=(monto, descuentoTotal)=> {
        let total = monto - descuentoTotal;
        return total;
    }

    const mostrarTotal=()=> {
        console.log("Cant Items: " + this.cantidad + "\nMonto Total: $" + this.total);
    }


  /////////////////////////////////////////////////CLASE ITEM///////////////////////////////////////////////////


class Item {
    constructor(codigo) {
        this.codigo = codigo;
        this.cantidad = this.pedirCantidad();
        this.tamano = this.elegirTamano();
        this.precio = this.calcularUnidad();
        this.total = this.calcularTotal();
    }


    //pide cantidad requerida, valido que sea mayor a cero y numérico
    pedirCantidad() {
        let cantidad =0; 
        do{
            cantidad= prompt("Ingrese cantidad requerida");
            if ((isNaN(cantidad))|| (cantidad==0)){
                cantidad=prompt("Ingrese cantidad requerida en nros(Mayor a cero)")
            }
                
        }while (cantidad==0);
    return parseInt(cantidad);
    }

    //pide el tamaño, que define el precio
    //va a ser reemplazado por un selector en el html
    elegirTamano() {
        let tamano = 0;// se pone en cero que sera el valor que tomara como tañano erróneo
        let ingreso = parseInt(prompt("Seleccione el tamaño de la imagen:\n 1 - 10x15\n 2 - 13x18\n 3 - 15x21"));

        do {
            if ((ingreso == 1) || (ingreso == 2) || (ingreso == 3)) {
                tamano = ingreso;
            } else {
                ingreso = parseInt(prompt("CODIGO INCORRECTO\nSeleccione el tamaño de la imagen:\n 1 - 10x15\n 2 - 13x18\n 3 - 15x21"));
            }
        } while (tamano == 0);
        return tamano;
    }

    calcularUnidad() {
        let precio = 0
        switch (this.tamano) {
            case 1:
                precio = 150;
                break;
            case 2:
                precio = 200;
                break;
            case 3:
                precio = 250;
                break;
        }
        return precio;
    }

    //Calcula el total de cada item agregado a la orden
    calcularTotal() {
        let total = this.precio * this.cantidad;
        return total;
    }

    confirmar() {
        console.log("Agregado!\n" + this.cantidad + " x COD#" + this.codigo + "\n Precio: $" + this.total)
    }

}




//funcion que contiene pide datos y contruye objeto Item
function cargarItem(codigo) {
    const item1 = new Item(codigo);
    item1.confirmar();
    return item1;
}


///////////////////////////////////////////////////////////DOM E INTERACCION CON HTML//////////////////////////////////////////////////////
  //se crea dom para div carrito, donde se va a cargar la tabla
  const crearTabla=(nombre)=> {
    let listaOrden=traerListaStorage();       
    let tabla = document.createElement("table");
    tabla.setAttribute("class", "table table-dark table-sm");
    let cuerpoTabla = document.createElement("tbody");


    //Se cargan titulos de la tabla
    let nombreTabla = document.createElement("tr");
    nombreTabla.innerText =`Cliente: ${nombre}` ;
    let titulosTabla = document.createElement("tr");
    let celdaTitulo1 = document.createElement("td");
    celdaTitulo1.innerText = "CODIGO";
    titulosTabla.appendChild(celdaTitulo1);
    let celdaTitulo2 = document.createElement("td");
    celdaTitulo2.innerText = "CANTIDAD";
    titulosTabla.appendChild(celdaTitulo2);
    let celdaTitulo3 = document.createElement("td");
    celdaTitulo3.innerText = "PRECIO";
    titulosTabla.appendChild(celdaTitulo3);
    cuerpoTabla.appendChild(nombreTabla);
    cuerpoTabla.appendChild(titulosTabla);




    //Se recorre el array del carrito para  crear la tabla
    for (const item of listaOrden) {
        let miFila = document.createElement("tr");
        let miCeldaCodigo = document.createElement("td");
        miCeldaCodigo.innerText = item.codigo;
        miFila.appendChild(miCeldaCodigo);
        let miCeldaCantidad = document.createElement("td");
        miCeldaCantidad.innerText = item.cantidad;
        miFila.appendChild(miCeldaCantidad);
        let miCeldaPrecio = document.createElement("td");
        miCeldaPrecio.innerText = item.total;
        miFila.appendChild(miCeldaPrecio);
        cuerpoTabla.appendChild(miFila);
    }
    tabla.appendChild(cuerpoTabla);

    //Se  agrega total de la tabla
    let totalTabla = document.createElement("tr");
    let celdaTotal1 = document.createElement("td");
    celdaTotal1.innerText = "TOTAL: ";
    totalTabla.appendChild(celdaTotal1);
    let celdaTotal2 = document.createElement("td");
    celdaTotal2.innerText = calcularMonto(listaOrden);
    totalTabla.appendChild(celdaTotal2);
    let botonLimpiar = document.createElement("Button");
    botonLimpiar.innerText = "Vaciar Carrito";
    totalTabla.appendChild(botonLimpiar);
    botonLimpiar.setAttribute("class", "btn btn-danger");
    botonLimpiar.setAttribute("id", "btnLimpiar");
    // botonLimpiar.setAttribute("type", "submit");
    botonLimpiar.setAttribute("href", "carrito.html");
    cuerpoTabla.appendChild(totalTabla);

    return tabla;
}



const cargarTabla=(nombre)=>{ //creo tabla en html con compra generada
    const capturarCarrito = () => document.getElementById("carrito");
    const carrito = capturarCarrito();
    const tabla = crearTabla(nombre);
    carrito.replaceChild(tabla, carrito.firstChild);//remplazo la el 1er hijo, asi no repite la tabla
   
    // Genero evento para btn limpiar
    const capturarBoton = () => document.getElementById("btnLimpiar");
    const boton = capturarBoton();
    boton.onclick = () => {//limpio storage y recargo la pagina
        localStorage.removeItem("carrito");
        location.reload();
        
    };
}
    
//se cargan elementos en html en base a array de imagenes a vender
const cargarTienda = (productos) => {
    //se generan cards para compra carga de items al carrito
    const crearCard = () => {
        let card = document.createElement("div");
        card.setAttribute("class", "card");
        card.setAttribute("style", "width: 15rem");
        return card;
    }

    const crearImagen = (imagen) => {
        let img = document.createElement("img");
        img.setAttribute("src", imagen);
        img.setAttribute("class", "card-img-top");
        return img;
    }

    const agregarItems = (boton,codigo) => {
        //agrego el evento click
        boton.addEventListener("click", () => {//agrego el evento click 
            let listaOrden=[];
            let item = cargarItem(codigo);
            listaOrden.push(item);
            if (localStorage.getItem("carrito") === null) {
                localStorage.setItem("carrito",JSON.stringify(listaOrden));
            }else{
                let listaEnStorage = JSON.parse(localStorage.getItem('carrito'));
                listaEnStorage.push(item);
                localStorage.setItem('carrito', JSON.stringify(listaEnStorage))     
            }
            cargarTabla(nombre);
        })
    }

    const crearCuerpoCard = (codigo) => {
        let cuerpo = document.createElement("div");
        cuerpo.setAttribute("class", "card-body");
        let titulo = document.createElement("h5");
        titulo.innerHTML = `${codigo}`;
        let boton = document.createElement("button");
        boton.setAttribute("class", "btn btn-primary btnAgregar");
        boton.innerHTML = `Agregar al carrito`;
        agregarItems(boton, codigo);
        cuerpo.appendChild(titulo);
        cuerpo.appendChild(boton);
        return cuerpo;
    }


    const mostrarItems = (productos) => {
        let container = document.getElementById("tiendaContainer");
        for (let i = 0; i < productos.length; i++) {
            let card = crearCard();
            card.appendChild(crearImagen(productos[i].img));
            card.appendChild(crearCuerpoCard(productos[i].codigo));
            container.appendChild(card);
        }
    }
mostrarItems(productos);

}

////////////////////////////////////////Inicialización de Tienda/////////////////////////////////////////////////////////////////////


cargarTienda(productos);
let nombre=bienvenida();





////////////////////////////////////////PROCESO DE COMPRA/////////////////////////////////////////////////////////////////////

function bienvenida() {
    alert("¡Bienvenidx!\nGracias por elegirnos\nAcá empieza tu proceso de compra :)")
    let nombre = prompt("Ingrese su nombre");
    console.log("*CARRITO INICIALIZADO* - Cliente " + nombre)
    return nombre;
}