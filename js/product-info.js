const user = document.getElementById("user");
const usuario = localStorage.getItem("usuario")
user.innerHTML = usuario;  
 
const id = localStorage.getItem("prodID"); // accedo al item prodID del localStorage

const url ="https://japceibal.github.io/emercado-api/products/"+id+".json" //armo la url utilizando el ID almacenado en el localStorage de manera que cambie según el producto seleccionado

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
  <div class="pictures" >
     <p><b>Imagenes ilustrativas</b></p>
     <div class="pic">
       <table>
       <tr>
       <td><img src="` + data.images[0] + `" class="img-info"/></td>
       <td><img src="` + data.images[1] + `" class="img-info"/></td>
       <td><img src="` + data.images[2] + `" class="img-info"/></td>
       <td><img src="` + data.images[3] + `" class="img-info"/></td>
       </tr>
       </table>
     </center>
     </div>
  </div>
    `
    document.getElementById("containerInfo").innerHTML = info;
}



const urlComments = "https://japceibal.github.io/emercado-api/products_comments/" + id + ".json";
//url que va a variar según el producto seleccionado y va a dirigir a la api de los comentarios correspondientes
let commentsArray = []; 

fetch(urlComments)  //fetch que va acceder a urlComments, obtener los datos en formato json, y agregarlos al array commentsArray; luego va a ejecutar la función showComments(commentsArray)
.then(function(response){
  return response.json(); 
})
.then(function(data){
   for (comment of data){
      commentsArray.push(comment)
   }
   showComments(commentsArray);
   
 })


 function showComments(array){
   // funcion que va a utilizar los datos del array y según el score de cada comentario va a mostrar el nombre de usuario, el comentario, la fecha y las estrellas checkeadas correspondientes y luego con el DOM va a agregar todo en el HTML
   console.log(array)
   let comments = "";
   
  for (com of array){
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
  document.getElementById("comentarios").innerHTML = comments;

  
} 
  }

  //Una vez que se clicke sobre enviar, si hay algún comentario ingresado, va a recargar la página como si lo estuviera enviando
document.getElementById("enviar").addEventListener("click", function(){ //
if(document.getElementById("comentario").value != 0){
   document.getElementById("formComment").submit()
} 
})

function showProductsR(data){
  
   const url0 = "https://japceibal.github.io/emercado-api/products/"+data[0].id+".json"
   const url1 = "https://japceibal.github.io/emercado-api/products/"+data[1].id+".json"
   console.log(url0)
   console.log(url1)
   fetch(url0)
   .then(function(response){
      return response.json(); 
    })
    .then(function(data0){
      showpR0(data0);
    });
    fetch(url1)
    .then(function(response){
       return response.json(); 
     })
     .then(function(data1){
       showpR1(data1);
     });
      
      
function showpR0(data){
         let pR = "";
         pR +=
         `
         <div>
         <img src="` + data.images[1] + `" class="img-product" style="width: 500px ;"/>
         <center><p> `+ data.name +`</p></center>
         </div>
         `
         document.getElementById("pR0").innerHTML = pR;
      }

 function showpR1(data){
         let pR = "";
         pR +=
         `
         <div>
         <img src="` + data.images[1] + `" class="img-product" style="width: 500px ;"/>
         <center><p> `+ data.name +`</p></center>
         </div>
         `
         document.getElementById("pR1").innerHTML = pR;}
    
    
}



   

  
      

