function askForRegister(){ 
    /*Función que me permite entrar al perfil solamente si tengo el usuario logeado, sino me redirije 
     a la pagina del login para ingresar el usuario */
    if(!localStorage.getItem("user")){ 
      window.location.href =("index.html");
    }}
    askForRegister();
    
    const saveChanges = document.getElementById("saveChanges");
    const userInformation = document.getElementById("userInformation");
    const userE = localStorage.getItem("user");
    //Creo el contenido del formulario que luego con el DOM incluire en el HTML.
    /*En el javascript del login declare los localStorage.setItem correspondientes a los getItem que luego utilizo como value 
    en los input, esto es para que estos valores se reinicien solamente si cierro sesión
    */
    let userInfo=
    `
    <div class="col-sm-6">
                  <label for="name1" class="form-label">Primer nombre*</label>
                  <input type="text" id="name1ID" class="form-control" required value=${localStorage.getItem("name1")} >
                </div>
                <div class="col-sm-6">
                  <label for="name2" class="form-label">Segundo nombre</label>
                  <input type="text" id="name2ID" class="form-control" value=${localStorage.getItem("name2")} >
                </div>
                <div class="col-sm-6">
                  <label for="lastname1ID" class="form-label">Primer apellido*</label>
                  <input type="text" id="lastname1ID" class="form-control" required value=${localStorage.getItem("lastname1")}>
                </div>
                <div class="col-sm-6">
                  <label for="lastname2" class="form-label">Segundo apellido</label>
                  <input type="text" id="lastname2ID" class="form-control" value=${localStorage.getItem("lastname2")}>
                </div>
                <div class="col-sm-6" id="userEmail">
                  <label for="email" class="form-label">E-mail</label>
                  <input type="email" id="emailID" class="form-control" value=${userE} required></input>
                </div>
                <div class="col-sm-6">
                  <label for="tel" class="form-label">Telefono de contacto</label>
                  <input type="tel" id="telID" class="form-control" value=${localStorage.getItem("tel")}>
                  <br>
                  <br>
                </div>
    </div>            
     <hr>
    `;
    userInformation.innerHTML = userInfo;
    
    document.addEventListener("DOMContentLoaded", ()=> {
       
        const name1ID = document.getElementById("name1ID");
        const name2ID = document.getElementById("name2ID");
        const lastname1ID = document.getElementById("lastname1ID");
        const lastname2ID = document.getElementById("lastname2ID");
        const telID = document.getElementById("telID");
        
        /*función que verifica que los datos requeridos esten ingresados y en caso afirmativo guarda la información ingresada
        en el localStorage */
        saveChanges.addEventListener("click", function(event){
         if(!userInformation.checkValidity()){
            event.preventDefault()
            event.stopPropagation()
            alert("Completa los datos")
         }
         if(userInformation.checkValidity()){
            localStorage.setItem("name1", name1ID.value);
            localStorage.setItem("name2", name2ID.value);
            localStorage.setItem("lastname1", lastname1ID.value);
            localStorage.setItem("lastname2", lastname2ID.value);
            localStorage.setItem("tel", telID.value);
            alert("Datos guardados correctamente");
          }
         })
      })