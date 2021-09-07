/* Se simula un carrito de compras, de una página que vende impresiones de fotografias,
*/

//se inicializan totales
let contadorCarrito = 0;
let totalCarrito = 0;

///////////////////////////////////////////////////////////ARRAYS//////////////////////////////////////////////////////

////imagenes a la venta
let productos = [
    { codigo: "0001", descripcion: "", autor: "", img: "https://i.ibb.co/DQMWsKP/Maxi-1.jpg" },
    { codigo: "0002", descripcion: "", autor: "", img: "https://i.ibb.co/zQrZBN8/Maxi-2.jpg" },
    { codigo: "0003", descripcion: "", autor: "", img: "https://i.ibb.co/jh5RKhM/Maxi-3.jpg" },
    { codigo: "0004", descripcion: "", autor: "", img: "https://i.ibb.co/0B65yZ8/Maxi-6.jpg" },
    { codigo: "0005", descripcion: "", autor: "", img: "https://i.ibb.co/c13S70X/Maxi-5.jpg" },
    { codigo: "0006", descripcion: "", autor: "", img: "https://i.ibb.co/0B65yZ8/Maxi-6.jpg" }
]

///cupones de descuento
let cupones=[
    { codigo: "DTO10CART", porcentaje:"10"},
    { codigo: "DTO15CART", porcentaje:"15"},
    { codigo: "DTO25CART", porcentaje:"25"},
    { codigo: "DTO50CART", porcentaje:"50"},
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

    //verifico si elemento ya exite en el storage. Si existe devuelve la posición, sino devuelve -1
    const existeEnStorage=(codigo, tamano)=>{
        let listaOrden=traerListaStorage();
        let existe=-1;
        for(let i=0; i<listaOrden.length; i++){
            if((listaOrden[i].codigo==codigo)&&(listaOrden[i].tamano==tamano)){
                existe=i;
            }
        }
        return existe;
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

    //verifica que exista cupon de descuento
    const aplicarCupon=(desc)=>{
        let porcentaje=0;
        for(cupon of cupones){
            if(cupon.codigo==desc){
                porcentaje= parseInt(cupon.porcentaje);
            }
        }
        return porcentaje;
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
    constructor(codigo, cantidad, tamano) {
        this.codigo = codigo;
        this.cantidad = cantidad;
        this.tamano = tamano;
        this.precio = this.calcularUnidad();
        this.total = this.calcularTotal();
    }

    //define el precio acorde al tamaño seleccionado por el usr
    calcularUnidad() {
        let precio = 0
        switch (this.tamano) {
            case "10x15":
                precio = 150;
                break;
            case "13x18":
                precio = 200;
                break;
            case "15x21 ":
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
function cargarItem(codigo, cantidad, tamano) {
    const item1 = new Item(codigo, cantidad, tamano);
    item1.confirmar();
    return item1;
}


///////////////////////////////////////////////////////////DOM E INTERACCION CON HTML//////////////////////////////////////////////////////
    //creo tabla en html con compra generada   
  const cargarTabla=(nombre)=> {
    let listaOrden=traerListaStorage();       
    //Se cargan titulos de la tabla, asegurandome que este vacio el div, para que no me duplique la tabla
    $("#carritoContainer").empty().append(`
        <p>Cliente: ${nombre}</p>
        
        <table class="table table-sm"> 
        <tbody id="cuerpoTCarrito"> 
        <thead>
        <td> CODIGO </td> 
        <td> TAMAÑO </td> 
        <td> CANTIDAD </td>  
        <td> PRECIO </td> 
        <td>        </td> 
        </thead>
        </tbody></table>`);


    //Se recorre el array del carrito para  crear la tabla
    for (let i = 0; i < listaOrden.length; i++){
        $("#cuerpoTCarrito").append(`<tr>
        <td>${listaOrden[i].codigo}</td>
        <td>${listaOrden[i].tamano}</td>
        <td><input  id="inputCantTabla${i}" width="2rem" type="number" max="99" min="0" value="${listaOrden[i].cantidad}"></input></td>
        <td>${listaOrden[i].total}</td>
        <td><button id="btnActualizar${i}" class="btn btn-warning btn_sm">♻</button>
        <button id="btnEliminar${i}"  class="btn btn-danger btn_sm"> x </button></td>
        </tr>`);  
       $(`#inputCantTabla${i}`).on("change", function(){
            $(`#btnActualizar${i}`).show();//muestro Actualizar
            $(`#btnEliminar${i}`).hide();//oculto Eliminar
       });
       $(`#btnActualizar${i}`).hide();
       $(`#btnActualizar${i}`).on("click", function(){
             $(`btnActualizar${i}`).hide();//vuelvo a ocultar Actualizar
             $(`btnEliminar${i}`).show();//vuelvo a mostrar Eliminar
             let cantidad=$(`#inputCantTabla${i}`).val();  //tomo el valor nuevo del input
             let posicion= existeEnStorage(listaOrden[i].codigo, listaOrden[i].tamano);//traigo la pocision del item a modificar      
             if(posicion!=-1){// me aseguro de que exista
                        if(cantidad==0){
                            listaOrden.splice(posicion, 1);//si queda en cero lo elimino
                        }else{//creo item con nueva cantidad y lo remplazo en la lista
                            let cod=listaOrden[posicion].codigo;
                            let tamano=listaOrden[posicion].tamano;
                            let cantidadNueva=cantidad;
                            listaOrden[posicion]=cargarItem(cod,cantidadNueva,tamano);    
                        }
                        localStorage.setItem('carrito', JSON.stringify(listaOrden)); //actualizo en storage
                        cargarTabla(nombre);
                    }
       });
       $(`#btnEliminar${i}`).on("click", function(){
        let posicion= existeEnStorage(listaOrden[i].codigo, listaOrden[i].tamano);//traigo la pocision del item
        listaOrden.splice(posicion, 1);
        localStorage.setItem('carrito', JSON.stringify(listaOrden)); //actualizo en storage
        cargarTabla(nombre);
       });
   
    
    }
 
    //Se  agrega total de la tabla
    $("#cuerpoTCarrito").append(`
    <tfoot colspan="2">
    <td>TOTAL:  $</td>
    <td>${calcularMonto(listaOrden)}</td>
    <td><button id="btnLimpiar" class="btn btn-danger btn-sm"> Vaciar Carrito </button>  </td>
    </tfoot>  
    `);
     // Genero evento para btn limpiar
    $("#btnLimpiar").on("click", function () {//limpio storage y recargo la pagina
        localStorage.clear();
        location.reload(); 
    });
   
    //pongo visible el div descuento y resumen
    $("#descuento").show();
    $("#resumenCompra").show();

}



//se cargan elementos en html en base a array de imagenes a vender

    const mostrarItems = (productos) => {
        // creo cards donde muestro las imagenes a vender style="width: 16rem"
        for (let i = 0; i < productos.length; i++) {
            $("#tiendaContainer").append(
             ` <div class="card" style="width: 18rem" > 
            <img src="${productos[i].img}" class="imgCarrito">
            <div class="card-body">
            <h5 class="card-title"> Código # ${productos[i].codigo} </h5>
            <p>Cant:</p>
            <input id="input${productos[i].codigo}" type="number" max="99" min="1" value="1"></input>
            <p>Tamaño:</p>
            <select id="select${productos[i].codigo}"  width= "max-content">
                    <option selected value="10x15">10x15 </option>
                    <option value="13x18">13x18 </option>
                    <option value="15x21">15x21 </option>
            </select>
            </div>
            <div class="card-footer">
            <button id= "btn${productos[i].codigo}"class="btn btn-success btn-sm"> Comprar </button>
            </div>
            </div>`);
            //agrego evento al boton creado
            $(`#btn${productos[i].codigo}`).on('click', function (){
            let listaOrden=[];
            let cod= productos[i].codigo;
            let cant= $(`#input${cod}`).val();
            let tamano=$(`#select${cod}`).val();
            let item = cargarItem(cod , cant, tamano)
            listaOrden.push(item);
            swal("¡Bien!", "Producto agregado al carrito :)", "success");
            if (localStorage.getItem("carrito") === null) {
                localStorage.setItem("carrito",JSON.stringify(listaOrden));
            }else{
                let listaEnStorage = JSON.parse(localStorage.getItem('carrito'));
                let existe= existeEnStorage(cod, tamano);
                if (existe=="-1") {//verifco si existe item(codigo y tamaño) en carrito
                    listaEnStorage.push(item);
                }else{
                    //sumo cantidad nueva y reemplazo por nuevo item con cantidad total
                    listaEnStorage = JSON.parse(localStorage.getItem('carrito'));
                    cantidadNueva=parseInt(listaEnStorage[existe].cantidad)+parseInt(cant);
                    listaEnStorage[existe]=cargarItem(cod,cantidadNueva,tamano);
                    console.log(cantidadNueva);
                }
                localStorage.setItem('carrito', JSON.stringify(listaEnStorage));     
            }
            cargarTabla(nombre);
            $("#carritoContainer").show(2000);
            
        });  
         //Gener evento de boton aplicar cupon de descuento
    $("#botonDto").on("click", function(){
        let cupon= ($("#inputDto").val()).toUpperCase(); //cupon ingresado por usr
        let descuento= aplicarCupon(cupon);// porc de descuento otorgado por cupon
        if(descuento=="0"){
            $("#pDto").html("Cupón inválido");
            $("#pDto").attr("style","color:red");
        }else{
            let monto=calcularMonto(listaOrden);//monto de la orden
            let totalDescuento= calcularDescuento(monto, descuento);//descuento a aplicar en $
            let totalFinal= calcularTotal(monto, totalDescuento);
            $("#pDto").html("Cupón aplicado!");
            $("#pDto").attr("style","color:green");
        }
    });
    }

    }




////////////////////////////////////////Inicialización de Tienda/////////////////////////////////////////////////////////////////////

$(document).ready(function(){
    mostrarItems(productos);
    $("#carritoContainer").hide();
    $("#resumenCompra").hide();
    $("#descuentoContainer").hide();
    $("#pPreguntaDesc").on("click", function(){
        $("#descuentoContainer").slideToggle(1000);
    });
});

let nombre=bienvenida();





////////////////////////////////////////PROCESO DE COMPRA/////////////////////////////////////////////////////////////////////

function bienvenida() {
    let nombre = "Prueba";
    console.log("*CARRITO INICIALIZADO* - Cliente " + nombre)
    return nombre;
}