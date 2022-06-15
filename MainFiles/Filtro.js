var botones = document.querySelectorAll("li");

function filtrar(botonPulsado) {
    var figures = document.querySelectorAll("figure");
    

    for (i = 0; i < figures.length; i++) {
        figures[i].style.display = "none";
        if (figures[i].querySelector("img").className == botonPulsado) {
            figures[i].style.display = "initial";
        } else if(botonPulsado == "todos"){
            figures[i].style.display = "initial";
        }
    }
}
