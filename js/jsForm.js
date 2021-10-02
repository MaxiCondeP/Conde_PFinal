// const validarFormulario=()=>{
//     $("#formFinalizar").validate({
//         rules: {
//           nombre : {
//             required: true,
//             minlength: 3
//           },
//           apellido: {
//             required: true,
//             minlength: 3
//           },
//           email: {
//             required: true,
//             email: true
//           },
//           celular: {
//             required: true,
//             number: true,
//             maxlengt: 10
//           },
//           direccion: {
//             required: true,
//             min: 5
//           },
//           ciudad: {
//             required: true,
//             minlength: 3
//           },
//           cp: {
//             required: true,
//             minlength: 4
//           },
//           nombreTC: {
//             required: true,
//             minlength: 3,
//           },
//           nroTC: {
//             required: true,
//             minlength: 16,
//             maxlengt:16,
//             number:true
//           },
//           vencTC: {
//             required: true,
//             minlength: 4,
//             number:true
//           },
//           codigoTC: {
//             required: true,
//             minlength: 3,
//             number:true
//           }
//         },
//         messages : {
//           name: {
//             required: "Campo Obligatorio. Mínimo 3 caracteres",
//             minlength: "Campo Obligatorio. Mínimo 3 caracteres"
//           },
//           apellido: {
//             required: "Campo Obligatorio. Mínimo 3 caracteres",
//             minlength: "Campo Obligatorio. Mínimo 3 caracteres"
//           },
//           email: {
//             email: "Campo Obligatorio. Ingrese un email válido."
//           },
//           celular: {
//             required: "Campo Obligatorio. Ingrese su celular(sin 0 ni 15 )"
//           },
//           direccion: {
//             required: "Campo Obligatorio. Ingrese su dirección."
//           },
//           ciudad: {
//             required: "Campo Obligatorio. Ingrese su ciudad."
//           },
//           cp: {
//             required: "Campo Obligatorio. Ingrese su código postal."
//           },
//           nombreTC: {
//             required: "Campo Obligatorio.Ingrese el Nombre impreso en la tarjeta."
//           },
//           numeroTC: {
//             required: "Campo Obligatorio.Ingrese el nro de tarjeta(16 dígitos).",
//             minlength:"Campo Obligatorio.Ingrese el nro de tarjeta(16 dígitos).",
//             maxlengt="Campo Obligatorio.Ingrese el nro de tarjeta(16 dígitos)."
//           },
//           vencTC: {
//             required: "Campos Obligatorios. Ingrese el vencimiento de la tarjeta.",
//             minlength:"Campos Obligatorios. Ingrese el vencimiento de la tarjeta."
//           },
//           codTC: {
//             required: "Campos Obligatorios. Ingrese el vencimiento de la tarjeta.",
//             minlength:"Campos Obligatorios. Ingrese el vencimiento de la tarjeta."
//           }
//         }
//       });
//     }





////////////////////Validación de datos y eventos del formulario de compra////////////////////////////////////////////




const validarCant=(texto, cantRequerido)=>{
    let cantCaracteres= 0;
    let resultado=false;
    if(texto!=" "){ //valido que el caracter no sea un espacio
        cantCaracteres= texto.length;        
    }
    if((cantCaracteres>0)&&(cantCaracteres<= cantRequerido)){
         resultado=true;
    }
    return resultado;
}


const ValidacionFinalFormulario=()=>{
    let nombre= $("#iNombre").val();
    let apellido= $("#iApellido").val();
    let email= $("#iEmail").val();
    let celular= $("#iCelular").val();
    let direccion= $("#iDireccion").val();
    let ciudad= $("#iCiudad").val();
    let codPostal= $("#iCp").val();
    let nombreTC= $("#iNombreTC").val();
    let nroTC= $("#iNroTC").val();
    let vencTC= $("#iVencTC").val();
    let codTC= $("#iCodigoTC").val();

    let resultado=false;
    
    resultado= validarCant(nombre, 30);
    if(resultado==false){
        $("#alertaNombre").attr("style","display: block"); 
        
        return false;          
    }else{       
        if(resultado==true){
            $("#alertaNombre").attr("style","display: none");
        }  
    }
    
    
    resultado=validarCant(apellido, 30);
    if(resultado==false){
        $("#alertaApellido").attr("style","display: block");
        return false; 
    }else{       
        if(resultado==true){
            $("#alertaApellido").attr("style","display: none");
        }  
    } 
    
    resultado=validarCant(email, 30);
    if(resultado==false){
        $("#alertaEmail").attr("style","display: block");
        return false; 
    }else{       
        if(resultado==true){
            $("#alertaEmail").attr("style","display: none");
        }  
    }

    resultado=validarCant(celular,10);
    if((resultado==false)||(texto.length != 10)){
        $("#alertaCelular").attr("style","display: block");
        return false; 
    }else{       
        if((resultado==true)&&(texto.length== 10)){
            $("#alertaCelular").attr("style","display: none");
        }  
    }

    resultado=validarCant(direccion, 100);
    if(resultado==false){
        $("#alertaDireccion").attr("style","display: block");
        return false; 
    }else{       
        if(resultado==true){
            $("#alertaDireccion").attr("style","display: none");
        }  
    } 

    resultado=validarCant(ciudad, 100);
    if(resultado==false){
        $("#alertaCiudad").attr("style","display: block");
        return false; 
    }else{       
        if(resultado==true){
            $("#alertaCiudad").attr("style","display: none");
        }  
    }   

    resultado=validarCant(codPostal, 100);
    if(resultado==false){
        $("#alertaCp").attr("style","display: block");
        return false; 
    }else{       
        if(resultado==true){
            $("#alertaCp").attr("style","display: none");
        }  
    } 


    resultado=validarCant(nombreTC, 30);
    if(resultado==false){
        $("#alertaNombreTC").attr("style","display: block");
        return false; 
    }else{       
        if(resultado==true){
            $("#alertaNombreTC").attr("style","display: none");
        }  
    } 
    
    resultado=validarCant(nroTC,16);
    if((resultado==false)||(texto.length != 16)){
        $("#alertaNroTC").attr("style","display: block");
        return false; 
    }else{       
        if((resultado==true)&&(texto.length== 16)){
            $("#alertaNroTC").attr("style","display: none");
        }  
    }

    resultado=validarCant(vencTC, 4);
    if(resultado==false){
        $("#alertaCodVencTC").attr("style","display: block");
        return false; 
    }else{       
        if(resultado==true){
            $("#alertaCodVencTC").attr("style","display: none");
        }  
    }
    
    resultado=validarCant(codTC, 4);
    if(resultado==false){
        $("#alertaCodVencTC").attr("style","display: block");
        return false; 
    }else{       
        if(resultado==true){
            $("#alertaCodVencTC").attr("style","display: none");
        }   
    }   
        
         
        
        
        
          
         
    
        

}


const eventosFormulario=()=>{ // cargo eventos en inputs para validar dato ingresado, cantidad de carcteres(entre 1 y el valor maximo)
    $("#iNombre").on("change", function(){
        let texto= $("#iNombre").val();
        let resultado=validarCant(texto, 30);
        if(resultado==false){
            $("#alertaNombre").attr("style","display: block"); 
            return false;          
        }else{       
            if(resultado==true){
                $("#alertaNombre").attr("style","display: none");
            }  
        }   
    });

    $("#iApellido").on("change", function(){
        let texto= $("#iApellido").val();
        let resultado=validarCant(texto, 30);
        if(resultado==false){
            $("#alertaApellido").attr("style","display: block");
            return false; 
        }else{       
            if(resultado==true){
                $("#alertaApellido").attr("style","display: none");
            }  
        }   
    });

    $("#iEmail").on("change", function(){
        let texto= $("#iEmail").val();
        let resultado=validarCant(texto, 30);
        if(resultado==false){
            $("#alertaEmail").attr("style","display: block");
            return false; 
        }else{       
            if(resultado==true){
                $("#alertaEmail").attr("style","display: none");
            }  
        }   
    });
    $("#iEmail").blur(function(event) {  ///Utilizo la validacion del tipo de input para detectar que esté bien cargado
        event.target.checkValidity();
    }).bind('invalid', function(event) {
        $("#alertaEmail").attr("style","display: block");   
        return false; 
    });

    $("#iCelular").on("change", function(){
        let texto= $("#iCelular").val();
        let resultado=validarCant(texto,10);
        if((resultado==false)||(texto.length != 10)){
            $("#alertaCelular").attr("style","display: block");
            return false; 
        }else{       
            if((resultado==true)&&(texto.length== 10)){
                $("#alertaCelular").attr("style","display: none");
            }  
        } 
    });

    $("#iDireccion").on("change", function(){
        let texto= $("#iDireccion").val();
        let resultado=validarCant(texto, 100);
        if(resultado==false){
            $("#alertaDireccion").attr("style","display: block");
            return false; 
        }else{       
            if(resultado==true){
                $("#alertaDireccion").attr("style","display: none");
        }  
    }   
    });

    $("#iCiudad").on("change", function(){
        let texto= $("#iCiudad").val();
        let resultado=validarCant(texto, 100);
        if(resultado==false){
            $("#alertaCiudad").attr("style","display: block");
            return false; 
        }else{       
            if(resultado==true){
                $("#alertaCiudad").attr("style","display: none");
        }  
    }   
    });

    $("#iCp").on("change", function(){
        let texto= $("#iCp").val();
        let resultado=validarCant(texto, 100);
        if(resultado==false){
            $("#alertaCp").attr("style","display: block");
            return false; 
        }else{       
            if(resultado==true){
                $("#alertaCp").attr("style","display: none");
        }  
    } 
        
    });
    

    $("#iNombreTC").on("change", function(){
        let texto= $("#iNombreTC").val();
        let resultado=validarCant(texto, 30);
        if(resultado==false){
            $("#alertaNombreTC").attr("style","display: block");
            return false; 
        }else{       
            if(resultado==true){
                $("#alertaNombreTC").attr("style","display: none");
        }  
    }   
    });

    $("#iNroTC").on("change", function(){
        let texto= $("#iNroTC").val();
        let resultado=validarCant(texto,16);
        if((resultado==false)||(texto.length != 16)){
            $("#alertaNroTC").attr("style","display: block");
            return false; 
        }else{       
            if((resultado==true)&&(texto.length== 16)){
                $("#alertaNroTC").attr("style","display: none");
        }  
        } 
    });

    $("#iVencTC").on("change", function(){
        let texto= $("#iVencTC").val();
        let resultado=validarCant(texto, 4);
        if(resultado==false){
            $("#alertaCodVencTC").attr("style","display: block");
            return false; 
        }else{       
            if(resultado==true){
                $("#alertaCodVencTC").attr("style","display: none");
        }  
    }   
    });

    $("#iCodigoTC").on("change", function(){
        let texto= $("#iCodigoTC").val();
        let resultado=validarCant(texto, 4);
        if(resultado==false){
            $("#alertaCodVencTC").attr("style","display: block");
            return false; 
        }else{       
            if(resultado==true){
                $("#alertaCodVencTC").attr("style","display: none");
        }  
    }   
    });

    $("#btnEnviarPedido").on("click",function(){
        $("#iNombre").trigger("change");
        $("#iApellido").trigger("change");
        $("#iEmail").trigger("change");
        $("#iCelular").trigger("change");
        $("#iDireccion").trigger("change");
        $("#iCiudad").trigger("change");
        $("#iCp").trigger("change");
        $("#iNombreTC").trigger("change");
        $("#iNroTC").trigger("change");
        $("#iVencTC").trigger("change");
        $("#iCodigoTC").trigger("change");    
    });

}





// VALIDAR FORMULARIO
$(`#btnComprar`).on('click', function () {

    let nombre = $(`#txtNombre`).val();
    let apellido = $(`#txtApellido`).val();
    let dniEntrada= $(`#txtDni`).val();
    let localidad = $(`#txtLocalidad`).val();
    let nroTarjeta = $(`#txtNumeroTarjeta`).val();
    let correo = $(`#txtCorreo`).val();

    dniEntrada = parseInt(dniEntrada);
    nroTarjeta = parseInt (nroTarjeta) //paso a valor numérico el nro de tarjeta ingresado.
    
    if (nombre == "") {
        $(`#txtNombre`).css('border-color', 'red').fadeIn();
        return false; //Significa que cuando le de click, no va a pasar nada.
    } else {
        $(`#txtNombre`).css('border-color', 'green').fadeIn(); //Por si después lo rellena.
    }

    if (apellido == "") {
        $(`#txtApellido`).css('border-color', 'red').fadeIn();
        return false; //Significa que cuando le de click, no va a pasar nada.
    } else {
        $(`#txtApellido`).css('border-color', 'green').fadeIn(); //Por si después lo rellena.
    }  

    if (dniEntrada == "") {
        $(`#txtDni`).css('border-color', 'red').fadeIn();
        return false;
    } else if (!dniEntrada) {
        alert('Ingrese numero');
        return false;
    } else if (dniEntrada < 15000000) {
        alert("dni invalido")
        return false;
    } else {
        $(`#txtDni`).css('border-color', 'green').fadeIn();
    }

    if (localidad == "") {
        $(`#txtLocalidad`).css('border-color', 'red').fadeIn();
        return false; //Significa que cuando le de click, no va a pasar nada.
    } else {
        $(`#txtLocalidad`).css('border-color', 'green').fadeIn(); //Por si después lo rellena.
    }

    if (nroTarjeta == "") {
        $(`#txtNumeroTarjeta`).css('border-color', 'red').fadeIn();
        return false;
    } else if (!nroTarjeta) {
        alert('Ingrese numero');
        return false;
    } else if (nroTarjeta < 999999999999999) {
        alert("dni invalido")
        return false;
    } else {
        $(`#txtNumeroTarjeta`).css('border-color', 'green').fadeIn();
    }

    if (correo == "") {
        $(`#txtCorreo`).css('border-color', 'red').fadeIn();
        alert ("Ingrese correo");
        return false;
    } else {   
        $(`#txtCorreo`).css('border-color', 'green').fadeIn();
    }
    alert ('Compra finalizada');
        window.location.href='compraFinalizada.html';
})