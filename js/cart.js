const subT = document.getElementById("subT");
const shippingCost = document.getElementById("shippingCost");
const total = document.getElementById("total");

const premium = document.getElementById("premium");
const express = document.getElementById("express");
const standard = document.getElementById("standard");

const url = CART_INFO_URL;
//constante que guarda la url de la api de los datos del producto a comprar
let tProducts = "";

document.addEventListener("DOMContentLoaded", function(){
fetch(url)//uso fetch para acceder a los datos de la constante url y luego los utilizo en la función showToBuy
.then(function(response){
  return response.json();
})
.then(function(data){
showToBuy(data.articles[0]);})
})

function showToBuy(info){ 
//función que utiliza los datos del producto (obtenidos a traves del fetch) y los estructura en una tabla que luego es incluida en el HTML por medio del DOM
//el input en el que determinamos la cantidad del producto que queremos comprar contiene un oninput de manera que al cambiar su contenido se ejecute la función changeSubtotal
   const count = info.count;
   const unitCost = info.unitCost;
   const currency = info.currency
 tProducts += 
`
    <tr>
      <td><img src="` + info.image + `" style="width: 80px ;"/></th>
      <td>` + info.name + `</td>
      <td>` + info.currency + `` + unitCost + `</td>
      <td><input type="number" id="tdCount" value="` + count +`" oninput="changeSubtotal(` + unitCost + `), setShippingCost(), totalCost()"></td>
      <td>` + currency + `<span id=tdsubtotal>` + unitCost + `</span></td>
    </tr>
   
` ;
document.getElementById("tBuys").innerHTML = tProducts;
subT.innerHTML = unitCost;
localStorage.setItem("subCount", unitCost); //inicialmente almaceno el valor del costo unitario en el localStorage con nombre "subCount"
}

function changeSubtotal(unitCost){
//función que se ejecuta una vez modificada la cantidad de producto a comprar
//calcula en precio subtotal (multiplicando la cantidad elegida por el precio unitario) y finalmente con el DOM lo agrega al HTML
  const tdCount = document.getElementById("tdCount");
  const tdsubtotal = document.getElementById("tdsubtotal");
  localStorage.setItem("subCount", parseInt(tdCount.value * unitCost)) //me cambia al valor del "subCount" del localStorage según la cantidad de producto que lleve
  
  const subCount  = localStorage.getItem("subCount");
  tdsubtotal.innerHTML = (subCount);
  subT.innerHTML= subCount;
}

function setShippingCost(){ //funcion que calcula el precio de envio (según el tipo de envio seleccionado), lo almacena en el localStorage
  // y lo agrega al HTML utilizando el DOM
  const subCount  = parseInt(localStorage.getItem("subCount"));
  let  shippingC = "";
  if(premium.checked){
    shippingC = parseInt(subCount * 0.15);
  }
  if(express.checked){
    shippingC =parseInt( subCount * 0.07);
  }
  if(standard.checked){
    shippingC = parseInt(subCount * 0.05);
  }
  shippingCost.innerHTML = shippingC;
  localStorage.setItem("cost", shippingC);
}

function totalCost(){ //función que calcula el precio total y lo agrega al HTML utilizando el DOM
const subCount  = parseInt(localStorage.getItem("subCount"));
const cost = parseInt(localStorage.getItem("cost"));
const totalC = subCount+cost;
total.innerHTML = totalC;
}

//Validación del formulario
const creditCard = document.getElementById("creditCard");
const wireTransfer = document.getElementById("wireTransfer");
const cardNumber = document.getElementById("cardNumber");
const segurityNumber = document.getElementById("segurityNumber");
const expire = document.getElementById("expire");
const accountNumber = document.getElementById("accountNumber");
const selectedPay = document.getElementById("selectedPay");
const warning = document.getElementById("warning");

function check() {//función dada por bootstrap para verificar el formulario y agregue un if para que verifique tambien si hay medio de pago seleccionado
  
 const form = document.getElementById("form1id");
 
  form.addEventListener('submit', function (event) {
    if (!form.checkValidity()) {
       event.preventDefault()
       event.stopPropagation()
      }

    form.classList.add('was-validated')
      
    if (!creditCard.checked & !wireTransfer.checked){
        warning.innerText = "Debe seleccionar un medio de pago"
      }

    if(form.checkValidity()){
       alert("Haz comprado con éxito!");
       window.location.href =("cart.html")
      }
      }, false)
      
}
check();



function check2() { //función que desactiva los campos según el medio de pago seleccionado
  if (creditCard.checked){
    cardNumber.disabled = false;
    segurityNumber.disabled = false;
    expire.disabled = false;
    accountNumber.disabled = true;
    selectedPay.innerHTML = "Tarjeta de credito";
    warning.innerText = "";
  }
  if (wireTransfer.checked){
    cardNumber.disabled = true;
    segurityNumber.disabled = true;
    expire.disabled = true;
    accountNumber.disabled = false;
    selectedPay.innerText = "Transferencia bancaria"
    warning.innerText = "";
  } 
}
