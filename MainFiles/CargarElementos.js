var listaUsuario = [];

window.onload = function renderizarProductos(){
    var xml = new XMLHttpRequest();
    var url = "http://localhost:3001/funkos";

    xml.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var listaFunkos = JSON.parse(this.responseText);
            printProductos(listaFunkos);
        }
    };

    xml.open("GET", url, true);
    xml.send();

    function printProductos(arr){
        arr.forEach(element => {
            var figura = document.createElement("figure");
            figura.setAttribute("class", "catalogo")
            var imag = document.createElement("img");
            imag.setAttribute("src", element.imagen);

            var fig1 = document.createElement("figcaption");
            var fig2 = document.createElement("figcaption");
            var fig3 = document.createElement("figcaption");
            fig1.textContent = element.nombre;
            fig2.textContent = element.precio + "€";

            var boton = document.createElement("button");
            boton.onclick = function(){ObtenerCarritoUsu(element.referencia)};
            boton.textContent = "Añadir";
            fig3.appendChild(boton);
            
            figura.appendChild(imag);
            figura.appendChild(fig1);
            figura.appendChild(fig2);
            figura.appendChild(fig3);

            var contenedor = document.querySelector(".catalogoContainer");
            contenedor.appendChild(figura);
        });
    }
}

function ObtenerCarritoUsu(ref) {
    var json = new XMLHttpRequest();
    var url = "http://localhost:3001/carrito";
    json.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var listaCarrito = JSON.parse(this.responseText);
            listaCarrito.forEach(element => {
                if (element.nombreUsuario == sessionStorage.getItem("usuario")) {
                    listaUsuario.push(element.Referencia);
                }
            });
            GuardarItem(ref);
        }
    };

    json.open("GET", url, true);
    json.send();
}

function GuardarItem(ref){  
    var flag = false;

    listaUsuario.forEach(element => {
        if(ref == element){
            flag = true;
        }
    });

    var xml = new XMLHttpRequest();
    var url = "http://localhost:3001/carrito";
    var nomUsu = sessionStorage.getItem("usuario");
    

    if(nomUsu != null){
        if(flag == false){
            xml.onreadystatechange = function () 
            {
                if (this.readyState == 4 && this.status == 200)
                {
                    insertarLog("CatalogoFunkos.html", "Añadir al carrito");
                }
            };

            xml.open("POST", url, true);
            xml.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xml.send(JSON.stringify({nombreUsuario: nomUsu, Referencia: ref, cantidad: 1}));
            alert("elemento guardado en el carrito");
        }
        else{
            alert("El producto ya se enecuentra añadido al carrito.");
        }
    }
    else{
        alert("Inicia sesión para añadir artículos al carrito.");
    }
}