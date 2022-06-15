function insertarLog(pagina, accion){
    var json = new XMLHttpRequest();
    var url = "http://localhost:3001/log";

    var fecha = new Date();

    json.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Log guardado con evento: " + accion + " en la página: "+ pagina);
        }
    };

    json.open("POST", url, true);
    json.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    json.send(JSON.stringify({Username: sessionStorage.getItem("usuario"), Pantalla: pagina, DateHour: fecha, Accion: accion}));
} 


function obtenerLog(){
    var json = new XMLHttpRequest();
    var url = "http://localhost:3001/log";
    json.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var listaLog = JSON.parse(this.responseText);
            listaLog.forEach(element =>{
                console.log("ID: " + element.id +", Usuario: "+ element.Username + ", Pantalla: " + element.Pantalla + ", Fecha: " +  element.DateHour + ", Acción: " + element.Accion);
            })
        }
    };

    json.open("GET", url, true);
    json.send();
}