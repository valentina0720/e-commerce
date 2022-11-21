const id = localStorage.getItem("prodID"); // accedo al item prodID del localStorage

const url =(PRODUCT_INFO_URL+id+".json"); //armo la url utilizando el ID almacenado en el localStorage de manera que cambie según el producto seleccionado


fetch(url) //utilizo fetch para poder acceder a los datos de la api, obtenerlos en formato json y luego ejecutar la función showInfo(data)
.then(function(response){
  return response.json(); 
})
.then(function(data){
    showInfo(data);
    showProductsR(data.relatedProducts);
})
 

function showInfo(data) { 
// función que va a utilizar los datos del json para mostrarlos estructurados en el HTML
  let info = "";

  info =
  `
  <br>
  <h1>`+ data.name +`</h1>
  <br>
  <hr>
  <div>
     <p><b>Precio</b></p>
     <p>`+ data.currency + data.cost +`</p>
  </div>

  <div>
     <p><b>Descripción</b></p>
     <p>`+ data.description +`</p>
  </div>
  <div>
     <p><b>Categoría</b></p>
     <p>`+ data.category +`</p>
  </div>
  <div>
     <p><b>Cantidad de vendidos</b></p>
     <p>`+ data.soldCount+`</p>
  </div>
    
  <div id="carouselImages" class="carousel carousel-dark slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselImages" data-bs-slide-to="0" class="active" aria-current="true" ></button>
    <button type="button" data-bs-target="#carouselImages" data-bs-slide-to="1" ></button>
    <button type="button" data-bs-target="#carouselImages" data-bs-slide-to="2" ></button>
    <button type="button" data-bs-target="#carouselImages" data-bs-slide-to="3" ></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="` + data.images[0] + `" class="d-block w-100" >
    </div>
    <div class="carousel-item">
      <img src="` + data.images[1] + `" class="d-block w-100">
    </div>
    <div class="carousel-item">
      <img src="` + data.images[2] + `" class="d-block w-100">
    </div>
    <div class="carousel-item">
    <img src="` + data.images[3] + `" class="d-block w-100" >
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselImages" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselImages" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    `
    document.getElementById("containerInfo").innerHTML = info;
}


const urlComments = PRODUCT_INFO_COMMENTS_URL + id + ".json";
//url que va a variar según el producto seleccionado y va a dirigir a la api de los comentarios correspondientes
let commentsArray = []; 

fetch(urlComments)  
//fetch que va acceder a urlComments, obtener los datos en formato json, y agregarlos al array commentsArray; luego va a ejecutar la función showComments(commentsArray)
.then(function(response){
  return response.json(); 
})
.then(function(data){
   for (comment of data){
   showComments(comment);}
  })
 
 let comments = "";

 function showComments(com){
   // funcion que va a utilizar los datos del array y según el score de cada comentario va a mostrar el nombre de usuario, el comentario, la fecha y las estrellas checkeadas correspondientes y luego con el DOM va a agregar todo en el HTML
   
  if(com.score === 1){
   
    comments +=
   `
   <div >
   <p><b>&nbsp; `+com.user+`</b>&nbsp;&nbsp; `+com.dateTime+`</p>
   <div class="stars" >
   <span class="fa fa-star checked" ></span>
   <span class="fa fa-star" ></span>
   <span class="fa fa-star" ></span>
   <span class="fa fa-star" ></span>
   <span class="fa fa-star" ></span>
   </div>
   <p>&nbsp; `+com.description+`</p>
   <hr>
   </div>
   `}
   if(com.score === 2){
   
      comments +=
      `
      <div >
      <p><b>&nbsp; `+com.user+`</b>&nbsp;&nbsp; `+com.dateTime+`</p>
      <div class="stars" >
      <span class="fa fa-star checked" ></span>
      <span class="fa fa-star checked" ></span>
      <span class="fa fa-star" ></span>
      <span class="fa fa-star" ></span>
      <span class="fa fa-star" ></span>
      </div>
      <p>&nbsp; `+com.description+`</p>
      <hr>
      </div>
      `}
      if(com.score === 3){
   
         comments +=
         `
         <div >
         <p><b>&nbsp; `+com.user+`</b>&nbsp;&nbsp; `+com.dateTime+`</p>
         <div class="stars" >
         <span class="fa fa-star checked" ></span>
         <span class="fa fa-star checked" ></span>
         <span class="fa fa-star checked" ></span>
         <span class="fa fa-star" ></span>
         <span class="fa fa-star" ></span>
         </div>
         <p>&nbsp; `+com.description+`</p>
         <hr>
         </div>
         `}
         if(com.score === 4){
   
            comments +=
            `
            <div >
            <p><b>&nbsp; `+com.user+`</b>&nbsp;&nbsp; `+com.dateTime+`</p>
            <div class="stars" >
            <span class="fa fa-star checked" ></span>
            <span class="fa fa-star checked" ></span>
            <span class="fa fa-star checked" ></span>
            <span class="fa fa-star checked" ></span>
            <span class="fa fa-star" ></span>
            </div>
            <p>&nbsp; `+com.description+`</p>
            <hr>
            </div>
            `}
            if(com.score === 5){
   
               comments +=
               `
               <div >
               <p><b>&nbsp; `+com.user+`</b>&nbsp;&nbsp; `+com.dateTime+`</p>
               <div class="stars" >
               <span class="fa fa-star checked" ></span>
               <span class="fa fa-star checked" ></span>
               <span class="fa fa-star checked" ></span>
               <span class="fa fa-star checked" ></span>
               <span class="fa fa-star checked" ></span>
               </div>
               <p>&nbsp; `+com.description+`</p>
               <hr>
               </div>
               `}
  document.getElementById("commentsID").innerHTML = comments;

  
}

  //Una vez que se clicke sobre enviar, si hay algún comentario ingresado, va a recargar la página como si lo estuviera enviando
document.getElementById("send").addEventListener("click", function(){ //
if(document.getElementById("commentID").value != 0){
   document.getElementById("formComment").submit()
} 
})



function showProductsR(data){
  /*función que va a utilizar los datos del primer fetch para acceder a los ID de los dos productos relacionados y luego poder crear una const
  de la url correspondiente a cada uno para después poder utilizar nuevamente un fetch, acceder a los datos de las apis de los productos Y
  ejecutar la función correspondiente para mostrar la información*/
   const url0 = "https://japceibal.github.io/emercado-api/products/"+data[0].id+".json"
   const url1 = "https://japceibal.github.io/emercado-api/products/"+data[1].id+".json"
   fetch(url0)
   .then(function(response){
      return response.json(); 
    })
    .then(function(data0){
      showR0(data0);
    });
    fetch(url1)
    .then(function(response){
       return response.json(); 
     })
     .then(function(data1){
       showR1(data1);
     });
      
      
function showR0(data){
/*función que muestra los datos del primer producto relacionado (utilizando el DOM para poder incluirlo en el HTML) y utiliza el evento onclick
para que cuando clickemos sobre dicho producto se ejecute la función setProdID*/
         let pR = "";
         pR +=
         `
         <div onclick="setProdID(${data.id})">
         <img src="` + data.images[1] + `" class="img-product" style="width: 500px ;"/>
         <center><p> `+ data.name +`</p></center>
         </div>
         `
         document.getElementById("pR0").innerHTML = pR;
      }

 function showR1(data){
/*función que muestra los datos del segundo producto relacionado (utilizando el DOM para poder incluirlo en el HTML) y utiliza el evento onclick
para que cuando clickemos sobre dicho producto se ejecute la función setProdID*/
         let pR = "";
         pR +=
         `
         <div onclick="setProdID(${data.id})">
         <img src="` + data.images[1] + `" class="img-product" style="width: 500px ;"/>
         <center><p> `+ data.name +`</p></center>
         </div>
         `
         document.getElementById("pR1").innerHTML = pR;}
    
}

function setProdID(id){ /*función que va a guardar el ID del producto seleccionado y nos va a dirigir nuevamente a la página de "product-info" 
pero mostrando la información correspondiente al producto sobre el que clickeamos*/
   localStorage.setItem("prodID", id);
   window.location = "product-info.html";
 }


   

  
      

