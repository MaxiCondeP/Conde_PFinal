/* Se simula un carrito de compras,. de una pagina que vende inpresiones de fotografias,
donde se pide código de imagen,tamaño elegido, y capacidad de cargar descuento.
*/
//PRUEBA CON CLASES
//se inicializan totales
let contadorCarrito=0;
let totalCarrito=0;

function bienvenida(){
    alert("¡Bienvenidx!\nGracias por elegirnos\nAcá empieza tu proceso de compra :)")
    let nombre= prompt("Ingrese su nombre");
    console.log("*CARRITO INICIALIZADO* - Cliente "+ nombre)
    return nombre;
}

////CLASE CARRITO

class Carrito{
    constructor(nombre, listaOrden){
        this.nombre=nombre;
        this.listaOrden=listaOrden;      
        this.monto= this.calcularMonto();
        this.cantidad= this.contarCantidad();
        this.descuento=this.preguntarDescuento();
        this.descuentoTotal=this.calcularDescuento();
        this.total=this.calcularTotal();
    }
    

    //recorro array de items y sumo cantidades
    contarCantidad(){
        let cant=0;
        for (let i = 0; i < this.listaOrden.length; i++) {
            cant+=this.listaOrden[i].cantidad;
         }
        return cant;
    }

    //recorro array de items y sumo totales
    calcularMonto(){
        let monto=0;
        for (let i = 0; i < this.listaOrden.length; i++) {
            monto+=this.listaOrden[i].total;
         }
        return monto;
    }

    //Se consulta al cliente si tiene descuento y se asigna a propiedad de clase
    preguntarDescuento(){
        this.descuento=0;//0 sera el valor por defecto
        let respuesta= (prompt("¿Tiene descuento? S / N")).toUpperCase();
        
        if (respuesta=="S"){
            this.descuento=parseFloat(prompt("Ingrese porcentaje de descuento(Solo números)"));
        }
        return this.descuento;
    }


    //se calcula el monto a descontar acorde al la propiedad "descuento"
    calcularDescuento(){
       this.descuentoTotal=((this.monto * this.descuento)/100); 
       return this.descuentoTotal;     
    }

    ///se calcula el monto total , haciendo el descuento correspondiente.
    calcularTotal(){
        this.total= this.monto-this.descuentoTotal;
        return this.total;  
    }    
    mostrarTotal(){
        console.log("Cant Items: " +this.cantidad+"\nMonto Total: $"+this.total);
    }

    despedir(){
        alert("¡Gracias por tu compra!\nQue la disfrutes\nTotal: $"+ this.calcularTotal()+" ( "+this.cantidad+" Items ) ( Desc: -$"+this.calcularDescuento()+")")
    }
        

}

class Item{
    constructor(codigo, cantidad){
        this.codigo=this.pedirCodigo();
        this.cantidad=this.pedirCantidad();
        this.tamano=this.elegirTamano();
        this.precio=this.calcularUnidad();
        this.total=this.calcularTotal();
    }
    
    //pide el codigo de imagen
    pedirCodigo(){
       let codigo= prompt("Ingrese el código de la imagen");
        return codigo;
    }

    //pide cantidad requerida
    pedirCantidad(){
        let cantidad=parseInt(prompt("Ingrese cantidad requerida"));
        return cantidad;
    }
    
    //pide el tamaño, que define el precio
    elegirTamano(){
        let tamano= 0;// se pone en cero que sera el valor que tomara como tañano erróneo
        let ingreso= parseInt(prompt("Seleccione el tamaño de la imagen:\n 1 - 10x15\n 2 - 13x18\n 3 - 15x21"));
    
         do{
             if ((ingreso==1)||(ingreso==2)||(ingreso==3)){
                 tamano=ingreso;
             }else{
                ingreso= parseInt(prompt("CODIGO INCORRECTO\nSeleccione el tamaño de la imagen:\n 1 - 10x15\n 2 - 13x18\n 3 - 15x21"));
             }
        } while (tamano==0);
        return tamano;
    }

    calcularUnidad(){
        let precio=0
        switch (this.tamano) {
            case 1:
                precio=150;
                break;
            case 2:
                precio=200;
                break;
            case 3:
                precio=250;
                break;
        }
        return precio;
    }

    //Calcula el total de cada item agregado a la orden
    calcularTotal(){
        let total=  this.precio * this.cantidad;
        return total;
    }

    confirmar(){
        console.log("Agregado!\n"+this.cantidad+" x COD#" + this.codigo+"\n Precio: $"+this.total)
    }

}




//funcion que contiene pide datos y contruye objeto Item
function cargarItem(){
    const item1= new Item();
    item1.confirmar();
    return item1;
}

 //Pregunta si desea seguir comprando  devuelve la respesta
 function preguntaSeguir(){
    return (prompt("¿Seguir Comprando?  S/N ")).toUpperCase();
}

//Funcion para repeticion de carga, se pide como parámetro la respuesta del usuario, para contiunuar con el bucle
function cargarCarrito(sigue){
    while(sigue!="N"){
        listaOrden.push(cargarItem());
        sigue=preguntaSeguir();  //Pregunta si desea seguir
    }
}


let nombre=bienvenida();
const listaOrden=[];// Se carga en cada carrito un array con los objetos item agregados a la orden
listaOrden.push(cargarItem());
cargarCarrito(preguntaSeguir());
//Se construye carrito
const carrito1= new Carrito(nombre, listaOrden);
/*chequeo el contenido del array en cada carga, 
paso el listaOrden completo por que lo que muestra es una tabla con todo el contenido del arreglo*/
console.table(listaOrden);
carrito1.mostrarTotal();
carrito1.despedir();


