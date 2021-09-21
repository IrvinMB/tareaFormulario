function obtenerValorInput(input) {
  switch (input.tagName) {
    case "INPUT":
      return manejarInputs(input);
    case "SELECT":
      var esVal= true; 
      const indiceSeleccionado = input.selectedIndex;
      if (indiceSeleccionado > 0) {
        esVal= true;    
        accionesSobremensajeDeError(esVal, input.name);
        return input.options[indiceSeleccionado].value;
      }else{
        esVal= false;
      }
      accionesSobremensajeDeError(esVal, input.name);
      return undefined;

    default:
      return undefined;
  }
}

function manejarInputs(input) {
  var esValido=true;
  switch (input.type) {
    case "text":  
      if (input.value.trim() === "") {
        esValido= false;  
        
        accionesSobremensajeDeError(esValido, input.name);
        return esValido;
      }else{
        if (input.name=="cedula") {   
          var laExprecion = new RegExp("[0-9]{2}-[0-9]{4}-[0-9]{4}");  
          if (laExprecion.test(input.value)) {
            esValido= true;  
          }else{
            esValido= false;   
          }                   
        }     
      }
      accionesSobremensajeDeError(esValido, input.name);
      return esValido;
    case "number":
      console.log(input.name)
      if (input.value.trim() === "") {
        esValido= false;   
        accionesSobremensajeDeError(esValido, input.name);  
      }else{
        esValido= true;   
        accionesSobremensajeDeError(esValido, input.name);
      }
    return esValido;
    case "tel":  
      if (input.value.trim() === "") {
        esValido= false;        
        accionesSobremensajeDeError(esValido, input.name);    
      }else{
        if (input.name=="telefono") {   
          var laExprecion = new RegExp("[0-9]{4}-[0-9]{4}");  
          if (laExprecion.test(input.value)) {
            esValido= true;  
          }else{
            esValido= false;   
          }                   
        }        
      }
      accionesSobremensajeDeError(esValido, input.name);
      return esValido;
    case "email":
      // alert("El correo es invalido");
      accionesSobremensajeDeError(validateEmail(input.value), input.name);
      return validateEmail(input.value);
   
      // return input.value;
    default:
      return input.value;
  }
}
function accionesSobremensajeDeError(error, name){
  if (error) {
    document.getElementById("invalid-"+name).style="display:none;"
  } else {
    document.getElementById("invalid-"+name).style="display:block;"
  }
 

}
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(email);
}
function agregarListenerAForm() {
  const formulario = document.getElementById("formulario-matricula");

  formulario.addEventListener(
    "submit",
    (evento) => {
      let datos = {};
      const inputs = formulario.querySelectorAll(
        "input, select, checkbox, textarea"
      );

      inputs.forEach((input) => {
        let valor = obtenerValorInput(input);
        if (valor) {
          datos[input.name] = valor;
        } else {
          alert(`Por favor verifique los datos de ${input.name}`);
        }
      });

      console.log(datos);

      evento.preventDefault();
    },
    false
  );
}

function validarDisableBoton(valor) {
  const boton = document.getElementById("boton-enviar");
  console.log("EsValid", valor);
  console.log("Disabled", boton.disabled);

  if (valor !== boton.disabled) {
    boton.disabled = valor;
  }
}

function validarOnBlur(inputs) {
  let esValido = true;
  inputs.forEach((input) => {
    const valor = obtenerValorInput(input);
    console.log(valor);
    if (!valor) {
      esValido = false;
    }
  });

  validarDisableBoton(!esValido);
}

function agregarOnBlurListener() {
  const formulario = document.getElementById("formulario-matricula");
  const inputs = formulario.querySelectorAll(
    "input, select"
  );

  inputs.forEach((input) => {
    input.addEventListener("blur", (evento) => {
      validarOnBlur(inputs);
    });
  });
}

window.onload = function () {
  agregarListenerAForm();
  agregarOnBlurListener();
};
