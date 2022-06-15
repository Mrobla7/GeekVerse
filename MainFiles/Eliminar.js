var botonesEliminar = document.querySelectorAll("button");
var listaCarrito=[];
var idUsuario;
var idItem;

function eliminar(boton) {

    var elementoABorrar = boton.parentNode;

    elementoABorrar.style.display = "none";
    
    var total = document.getElementById("cantidadfinal");

    total.innerHTML = "Total: " + (parseInt(total.innerHTML.match(/\d+/g)) - parseInt(elementoABorrar.childNodes[4].childNodes[1].innerHTML.match(/\d+/g))).toString() + "€";

    var url = "http://localhost:3001/carrito";
    var json = new XMLHttpRequest();
    
    json.onreadystatechange = function () 
    {
        if (this.readyState == 4 && this.status == 200)
        {
              
        }
    };
    json.open("DELETE", url+"/"+idItem, true);
    json.send();
}

function ObtenerUnico(boton){
    var json = new XMLHttpRequest();
    var url = "http://localhost:3001/carrito";
    json.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var listaCarrito = JSON.parse(this.responseText);
            listaCarrito.forEach(element =>{
                if(element.nombreUsuario == sessionStorage.getItem("usuario") && element.Referencia == boton.id)
                {
                    idItem = element.id;
                    eliminar(boton);
                }
            })          
        }
    };

    json.open("GET", url, true);
    json.send();
}

function obtenerCarrito(){
    var json = new XMLHttpRequest();
    var url = "http://localhost:3001/carrito";
    json.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var listaCarrito = JSON.parse(this.responseText);
            listaCarrito.forEach(element =>{
                if(element.nombreUsuario == sessionStorage.getItem("usuario"))
                {
                    idUsuario=element.id;
                    eliminarPorId(idUsuario);
                }
            })
            alert("deja de gastar");
            insertarLog("carrito.html", "Comprar");
            location.reload();
        }
    };

    json.open("GET", url, true);
    json.send();
}

function eliminarPorId(idUsuario){
    var url = "http://localhost:3001/carrito";
    var json = new XMLHttpRequest();
    
    json.onreadystatechange = function () 
    {
        if (this.readyState == 4 && this.status == 200)
        {
            
        }
    };
    json.open("DELETE", url+"/"+idUsuario, true);
    json.send();
}
