var listaCarrito;
var listaFunkos;
var listaLibros;
var listaMangas;
var listaVideo;
var listaComics;
var listaDefinitiva = [];
var listaCarritoUsuario = [];
var flag = true;

window.onload = function renderizarCarrito(){
    obtenerFunkos();

    var xml = new XMLHttpRequest();
    var urlCarr = "http://localhost:3001/carrito";

    xml.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            listaCarrito = JSON.parse(this.responseText);
            obtenerDefinitiva();
        }
    };

    xml.open("GET", urlCarr, true);
    xml.send();
    
}

function obtenerDefinitiva(){
    listaCarrito.forEach(element => {
        if(element.nombreUsuario == sessionStorage.getItem("usuario")){
            flag = true;
            switch (element.Referencia.charAt(0)){
                case 'F':
                    listaFunkos.forEach(funko => {
                        if(funko.referencia.charAt(1) == element.Referencia.charAt(1)){
                            listaDefinitiva.push(funko);
                            
                            renderizarItem(funko, element.id);
                        }
                    });
                    
                    break;
            }
        }
        else{
            if(sessionStorage.getItem("usuario") == null){
                flag = false;
            }
        }
    });

    if(flag == false){
        alert("Debes iniciar sesión para ver el carrito");
    }


    actualizarTotal();
}

function renderizarItem(funko, elemento){
    var contenido = document.createElement("div");
    contenido.setAttribute("class", "contenido");

    var divImg = document.createElement("div");
    var divNombre = document.createElement("div");
    var divPrecio = document.createElement("div");
    var divCantidad = document.createElement("div");
    var divTotal = document.createElement("div");

    var boton = document.createElement("button");
    boton.setAttribute("type", "button");
    boton.setAttribute("onclick", "ObtenerUnico(this)");
    boton.setAttribute("id", funko.referencia);
    boton.textContent = "Eliminar";

    var separacion = document.createElement("hr");

    var img = document.createElement("img");
    img.setAttribute("src", funko.imagen);
    divImg.appendChild(img);

    var nombre = document.createElement("h3");
    nombre.textContent = "Nombre";
    var vnombre = document.createElement("p");
    vnombre.textContent = funko.nombre;
    divNombre.appendChild(nombre);
    divNombre.appendChild(vnombre);

    var precio = document.createElement("h3");
    precio.textContent = "Precio";
    var vprecio = document.createElement("p");
    vprecio.textContent = funko.precio + "€";
    divPrecio.appendChild(precio);
    divPrecio.appendChild(vprecio);

    var cantidad = document.createElement("h3");
    cantidad.textContent = "Cantidad";
    var icantidad = document.createElement("input");
    icantidad.setAttribute("class", "valorInput");
    icantidad.setAttribute("id", elemento);
    icantidad.setAttribute("type", "number");
    icantidad.setAttribute("placeholder", "Cantidad a comprar");
    icantidad.setAttribute("value", 1);
    icantidad.setAttribute("min", 1);
    icantidad.setAttribute("oninput", "validity.valid||(value='');");
    icantidad.setAttribute("onblur", "requerido(this)");
    divCantidad.appendChild(cantidad);
    divCantidad.appendChild(icantidad);

    var total = document.createElement("h3");
    total.textContent = "Sub Total";
    var vtotal = document.createElement("p");
    vtotal.textContent = funko.precio * icantidad.value + "€";
    divTotal.appendChild(total);
    divTotal.appendChild(vtotal);

    contenido.appendChild(divImg);
    contenido.appendChild(divNombre);
    contenido.appendChild(divPrecio);
    contenido.appendChild(divCantidad);
    contenido.appendChild(divTotal);
    contenido.appendChild(boton);

    document.getElementById("contenedor").appendChild(contenido);
    document.getElementById("contenedor").appendChild(separacion);
}

function ObtenerCarritoTotal(){
    var xml = new XMLHttpRequest();
    var url = "http://localhost:3001/carrito";

    xml.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            listaCarrito = JSON.parse(this.responseText);
        }
    };

    xml.open("GET", url, true);
    xml.send();
}

function ActualizarCantidades(nuevaCantidad, id){
    var xml = new XMLHttpRequest();
    var url = "http://localhost:3001/carrito/"+id;
    var elementoCambiado;

    listaCarrito.forEach(element => {
        if(element.id == id){
            elementoCambiado = element;
        }
    });

    xml.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            
        }
    };

    xml.open("PUT", url, true);
    xml.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xml.send(JSON.stringify({nombreUsuario: elementoCambiado.nombreUsuario, Referencia: elementoCambiado.Referencia, cantidad: parseInt(nuevaCantidad)}));
}



function requerido(input) {
     if (input.value == ''){ 
        alert("Debes comprar al menos un item de este tipo, si no lo quieres puedes clicar en eliminar");  	
        input.value = 1;
      }
      else{
        ObtenerCarritoTotal();

        ActualizarCantidades(input.value, input.id);

        var contenedorSubtotal = input.parentNode.parentNode.childNodes[4].childNodes[1];
        var contenedorPrecio = input.parentNode.parentNode.childNodes[2].childNodes[1];
        var subtotalNuevo = input.value * parseInt(contenedorPrecio.innerHTML.match(/\d+/g));
        contenedorSubtotal.innerHTML = subtotalNuevo + "€";


        actualizarTotal();
        }
        
} 

function actualizarTotal(){
    // PARA OBTENER EL PRECIO TOTAL FINAL DE TODO EL CARRITO:
    var listaprecios = document.querySelectorAll(".contenido");
    var preciototal = 0;
    listaprecios.forEach(element => {
        var conteneprecio = element.childNodes[element.childNodes.length-2];
        preciototal += parseInt(conteneprecio.childNodes[1].innerHTML);
    });
    document.getElementById("cantidadfinal").innerHTML = "Total: " + preciototal + "€";
    

}

function obtenerFunkos() {
    var xml = new XMLHttpRequest();
    var urlFunk = "http://localhost:3001/funkos";

    xml.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            listaFunkos = JSON.parse(this.responseText);
        }
    };

    xml.open("GET", urlFunk, true);
    xml.send();
}







function obtenerLibros() {
    var xml = new XMLHttpRequest();
    var urlLibr = "http://localhost:3001/libros";

    xml.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            listaLibros = JSON.parse(this.responseText);
        }
    };

    xml.open("GET", urlLibr, true);
    xml.send();
}

function obtenerMangas() {
    var xml = new XMLHttpRequest();
    var urlMang = "http://localhost:3001/mangas";

    xml.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            listaMangas = JSON.parse(this.responseText);
        }
    };

    xml.open("GET", urlMang, true);
    xml.send();
}

function obtenerVideojuegos() {
    var xml = new XMLHttpRequest();
    var urlVideo = "http://localhost:3001/videojuegos";

    xml.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            listaVideo = JSON.parse(this.responseText);
        }
    };

    xml.open("GET", urlVideo, true);
    xml.send();
}

function obtenerComics() {
    var xml = new XMLHttpRequest();
    var urlCom = "http://localhost:3001/comics";

    xml.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            listaComics = JSON.parse(this.responseText);
        }
    };

    xml.open("GET", urlCom, true);
    xml.send();
}
