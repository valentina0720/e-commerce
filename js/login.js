//traigo los input y botones del HTML utilizando el DOM 
localStorage.clear();
const enter = document.getElementById("enter");

const email = document.getElementById("email");

const password = document.getElementById("password");

const eAlert = document.getElementById("emailAlert");

const pAlert = document.getElementById("passwordAlert");

localStorage.clear()

//declaro la función validar
function validar() {
    if (!email.checkValidity()) {  //si el campo del usuario esta vacío
        eAlert.innerHTML = ("Ingresa tu email"); 
    }
    if (email.checkValidity()) {  //si el campo del usuario esta vacío
        eAlert.innerHTML = (""); 
    }
    if (password.value.length <= 4) { //si el campo de la contraseña esta vacío
        pAlert.innerHTML = ("Ingresa tu contraseña");
    }
    if (password.value.length > 4) { //si el campo de la contraseña esta vacío
        pAlert.innerHTML = ("");
    }
    if(email.checkValidity() & password.value.length > 4 ) { //si el campo del usuario y el campo de contraseña no estan vacíos:
        localStorage.setItem("user", email.value); //guardo el usuario en el localStorage
        window.location.href =("frontpage.html" );  //dirijo la página a la página principal (frontpage.html)}
    } 
}

enter.addEventListener("click", validar); //una vez que clickeo el botón de ingresar se ejecuta la función validar

//Creo un almacenamiento para los datos que luego voy a modificar en el perfil
localStorage.setItem("name1", "");
localStorage.setItem("name2", "");
localStorage.setItem("lastname1", "");
localStorage.setItem("lastname2", "");
localStorage.setItem("tel", "");