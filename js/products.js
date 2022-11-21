const id = localStorage.getItem("catID") //constante: id de la categoría seleccionada en categories

const urlProducts = (PRODUCTS_URL+id+".json");
//la url va a variar según la categoría seleccionada

let prodArray = []
let varProdArray = prodArray ;/*declaro un nuevo array (varProdArray) que inicialmente va a ser igual al prodArray pero que a medida que se fitren los productos o se ingresen
rangos de precios va a variar*/


function showProducts(array) { /*función que nos va a mostrar en  el HTML (utilizando al DOM)
los productos del array que elijamos por parametro con la estructura requerida en el ejercicio*/
  
let list = "";
for (prod of array) {

list += 
//una vez que se clicke sobre un producto se va a ejecutar la función setProdID que toma como parametro el ID del producto correspondiente
`
<div class="list-group-item list-group-item-action cursor-active" onclick="setProdID(${prod.id})">  

       <div class="row">
          <div class="carImage">
              <img src="` + prod.image + `" class="img-product"/>
          </div>
          <div class="col">
          <br>
              <div class="carPropierties">
                  <h4>`+ prod.name+ " "+"&nbsp&nbsp&nbsp&nbsp"+ prod.currency + prod.cost+ `</h4>
              </div>
                  <p> `+ prod.description +`</p>
                  <p class="soldCount"> `+ prod.soldCount +" "+"vendidos"+`</p> 
              </div>
          </div>
      </div>
</div>
`
  document.getElementById("productsID").innerHTML = list; 
} }

function setProdID(id){ //función que va a guardar el ID del producto seleccionado y nos va a dirigir a la página de "product-info"
  localStorage.setItem("prodID", id);
  window.location = "product-info.html";
}

document.addEventListener("DOMContentLoaded", function(){
  fetch(urlProducts) 
  .then(function(response){
    return response.json(); //obtengo datos del fetch formato json
  })
  .then(function(data){ //recorre los datos del json, agrega cada producto al array "prodArray" y ejecuta la función showProducts utilizando por parametro prodArray
    for (prod of data.products){
    prodArray.push(prod);
    showProducts(prodArray); 
  }})

  
  document.getElementById("sortAsc").addEventListener("click", function(){ //a traves del DOM accedo al boton "sortAsc" y utilizando addEventListener
    varProdArray.sort((a, b) => (a.cost < b.cost ? -1 : 1 ));               //se logra que al clickearlo se ejecute la función siguiente que ordena los
    showProducts(varProdArray);                                               //productos según precio ascendente
  });
  
  document.getElementById("sortDesc").addEventListener("click", function(){ //a traves del DOM accedo al boton "sortDesc" y utilizando addEventListener
    varProdArray.sort((a, b) => (a.cost < b.cost? 1 : -1 ));                 //se logra que al clickearlo se ejecute la funció siguiente que ordena los   
    showProducts(varProdArray);                                                //productos según precio descendente
  });
    
  document.getElementById("sortBySoldCount").addEventListener("click", function(){ //a traves del DOM accedo al boton "sortByCount" y utilizando addEventListener
    varProdArray.sort((a, b) => (a.soldCount < b.soldCount ? 1 : -1 ));           //se logra que al clickearlo se ejecute la función siguiente que ordena los
    showProducts(varProdArray);                                                     //productos según su relevancia
  });

  document.getElementById("rangeFilterCost").addEventListener("click", function(){ /*a traves del DOM accedo al boton ""rangeFilterCost"" y utilizando addEventListener
  se logra que al clickearlo se ejecute la función siguiente que filtra los productos según su precio*/
   const minPrice = document.getElementById("rangeFilterCostMin").value; //accedo al valor del input del precio mínimo
   const maxPrice = document.getElementById("rangeFilterCostMax").value; //accedo al valor del input de precio máximo
   
  
   if (minPrice && !maxPrice){ //si solo esta definido el precio mínimo
    const minFilter = prodArray.filter(prod => prod.cost >= minPrice);//filtro de manera que queden solamente los productos con precio mayor o igual al digitado
    varProdArray = minFilter; //establezco los datos filtrdos como el array varProdArray 
   }
   if (maxPrice && !minPrice){ //si solo esta definido el precio máximo
    const maxFilter = prodArray.filter(prod => prod.cost <=  maxPrice);//filtro de manera que queden solamente los productos con precio menor o igual al digitado
    varProdArray = maxFilter;//establezco los datos filtrdos como el array varProdArray
   }
   if (minPrice && maxPrice){ //si estan definidos ambos rangos
    const allFilter = prodArray.filter(prod => minPrice <= prod.cost && maxPrice >= prod.cost); //filtro de manera que queden solamente los productos con precio correspondiente al rango establecido 
    varProdArray = allFilter //establezco los datos filtrdos como el array varProdArray
   }
   showProducts(varProdArray);//ejecuto showProdutcs utilizando como parametro varProdArray
  })

  document.getElementById("clearRangeFilter").addEventListener("click", function(){ 
   
   const minPrice = document.getElementById("rangeFilterCostMin"); //accedo al valor del input del precio mínimo
   const maxPrice = document.getElementById("rangeFilterCostMax"); //accedo al valor del input de precio máximo
   varProdArray = prodArray //varArray vuelve a tener los mismos elemetos que al inicio, es decir todos los productos de la categoría
    showProducts(prodArray)  //muestro nuevamente todos los productos
    minPrice.value = ""; //se vacía el campo de precio mínimo
    maxPrice.value = ""; //se vacía el campo de precio maximo
});   
})

//Desafiate 2
const search  = document.getElementById("search");
let searchArray = {};
//función que busca productos en el array varProdArray.
function searchProducts() {
  searchArray =
  varProdArray.filter(({name, description}) =>
  name.toLowerCase().includes(search.value.toLowerCase()) || description.toLowerCase().includes(search.value.toLowerCase()));
  if(searchArray.length > 0){
  showProducts(searchArray);}
  else{
    document.getElementById("productsID").innerHTML = "No hay productos relacionados"; 
  }
}



 
 