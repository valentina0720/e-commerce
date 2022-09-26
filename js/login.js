//traigo los input y botones del HTML utilizando el DOM 
const enter = document.getElementById("enter");

const email = document.getElementById("email");

const password = document.getElementById("password");

const eAlert = document.getElementById("emailAlert");

const pAlert = document.getElementById("passwordAlert");

localStorage.clear()

//declaro la función validar
function validar() {
    if (email.value.length == 0) {  //si el campo del usuario esta vacío
        eAlert.innerHTML = ("Ingresa tu email"); 
    }
    if (password.value.length == 0) { //si el campo de la contraseña esta vacío
        pAlert.innerHTML = ("Ingresa tu contraseña");
    }
    else { //si el campo del usuario y el campo de contraseña no estan vacíos:
        localStorage.setItem("usuario", email.value); //guardo el usuario en el localStorage
        window.location.href =("frontpage.html" );  //dirijo la página a la página principal (frontpage.html)}
    } 
}

enter.addEventListener("click", validar); //una vez que clickeo el botón de ingresar se ejecuta la función validar