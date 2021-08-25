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
        

    //se crea dom para div carrito, donde se va a cargar la tabla
    crearTabla(){
        let tabla= document.createElement("table");
        tabla.setAttribute("class", "table table-dark table-sm");
        let cuerpoTabla= document.createElement("tbody");
        

        //Se cargan titulos de la tabla
        let titulosTabla=document.createElement("tr");
        let celdaTitulo1=document.createElement("td");
        celdaTitulo1.innerText= "CODIGO";
        titulosTabla.appendChild(celdaTitulo1);
        let celdaTitulo2=document.createElement("td");
        celdaTitulo2.innerText= "CANTIDAD";
        titulosTabla.appendChild(celdaTitulo2);
        let celdaTitulo3=document.createElement("td");
        celdaTitulo3.innerText= "PRECIO";
        titulosTabla.appendChild(celdaTitulo3);
        cuerpoTabla.appendChild(titulosTabla);
        
       
       
        
    
        for(const item of this.listaOrden){
            let miFila=document.createElement("tr");
            let miCeldaCodigo=document.createElement("td");
            miCeldaCodigo.innerText= item.codigo;
            miFila.appendChild(miCeldaCodigo);
            let miCeldaCantidad=document.createElement("td");
            miCeldaCantidad.innerText= item.cantidad;
            miFila.appendChild(miCeldaCantidad);
            let miCeldaPrecio=document.createElement("td");
            miCeldaPrecio.innerText= item.total;
            miFila.appendChild(miCeldaPrecio);
            cuerpoTabla.appendChild(miFila);
        }
        tabla.appendChild(cuerpoTabla);

         //Se  agrega total de la tabla
         let totalTabla=document.createElement("tr");
         let celdaTotal1=document.createElement("td");
         celdaTotal1.innerText= "TOTAL: ";
         totalTabla.appendChild(celdaTotal1);
         let celdaTotal2=document.createElement("td");
         celdaTotal2.innerText= this.total;
         totalTabla.appendChild(celdaTotal2);
         let botonLimpiar=document.createElement("Button");
         botonLimpiar.innerText="Vaciar Carrito";
         totalTabla.appendChild(botonLimpiar);
         botonLimpiar.setAttribute("class", "btn btn-danger");
         botonLimpiar.setAttribute("id", "btnLimpiar");
         botonLimpiar.setAttribute("type", "submit");
         cuerpoTabla.appendChild(totalTabla);
         

        return tabla;
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
    let sigue= (prompt("¿Seguir Comprando?  S/N ")).toUpperCase();
    if (sigue!="N"){
        return true;
    }else{
        return false
    }
}


const iniciarCompra= () => {  //Se inicia la compra devolviendo el objeto carrito
    let nombre=bienvenida();
    const listaOrden=[];// Se carga en cada carrito un array con los objetos item agregados a la orden
    let sigue= true;
    while(sigue){
        listaOrden.push(cargarItem());
        sigue=preguntaSeguir();  //Pregunta si desea seguir
    }
    const carrito1= new Carrito(nombre, listaOrden);//Se construye carrito
    console.table(listaOrden);//chequeo el contenido del array en cada carga
    return carrito1;
}

const interactuarConHtml = (carrito1) => {  
    let titulo=document.createElement("h2");
    titulo.innerHTML = `<h2 class="text-light">Cliente: ${carrito1.nombre}</h2>`;
    

    //creo tabla en html con compra generada
    const capturarCarrito = () => document.getElementById("carrito");
    const carrito = capturarCarrito();
    const tabla= carrito1.crearTabla();
    carrito.appendChild(titulo);
    carrito.appendChild(tabla);
    carrito1.mostrarTotal();
    carrito1.despedir(); 

    //esto me genero dudas, ya que no se si necesito capturar un elemento creado a traves del dom
    const capturarBoton=()=> document.getElementById("btnLimpiar");
    const boton= capturarBoton();
    boton.onclick = () => {
        carrito.removeChild(tabla);///Elimino la tabla cargada en eldocument
        carrito.removeChild(titulo);
        interactuarConHtml(iniciarCompra());};   //Reinicio el proceso
  }



  interactuarConHtml(iniciarCompra());