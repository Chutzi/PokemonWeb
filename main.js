
function Start() {
    var caja = document.getElementById("caja").value;
    CatchPokemon(caja);
}

function Next() {
    var caja = parseInt(document.getElementById("caja").value);
    caja += 1;
    CatchPokemon(caja);
    document.getElementById("caja").value = caja;
}

function Back() {
    var caja = parseInt(document.getElementById("caja").value);
    caja -= 1;
    CatchPokemon(caja);
    document.getElementById("caja").value = caja;
}

function CatchPokemon(caja) {

    var data = undefined;
    var request = new XMLHttpRequest();

    if (caja > 0 && caja < 899 && caja[0]!=0) {
        document.getElementById("imagen").setAttribute("src","source/cargando.gif")
        request.open('GET', `https://pokeapi.co/api/v2/pokemon/${caja}`, true);
        request.send();
        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                data = JSON.parse(this.response)
                showApiData(data);
            }
            buttons(caja);
        }
    }
    else {
        document.getElementById("caja").style.border = "red 3px solid";
        alert("Ingrese un numero valido, [1-898]");
    }

}

function buttons(caja) {
    document.getElementById("caja").style.border = "green 3px solid";
    if (caja == 1) {
        document.getElementById("next").style.display = "inline";
        document.getElementById("back").style.display = "none";
    }
    else if (caja == 898) {
        document.getElementById("next").style.display = "none";
        document.getElementById("back").style.display = "inline";
    }
    else {
        document.getElementById("next").style.display = "inline";
        document.getElementById("back").style.display = "inline";
    }
}

function showApiData(data) {
    var imagen = document.getElementById("imagen");
    var p = document.getElementById("p");

    console.log(data)
    imagen.setAttribute("src", data.sprites.front_default);
    imagen.setAttribute("style",
        "width: 150px; height: 150px; display: inline-block; margin: 40px auto;");
    p.textContent = data.name;
    showtable(data);
}

function showtable(data){
    var codigoHTML = 
    `<table class="table text-table" >
    <caption>Datos Actualizados</caption>
    <tr><th scope="col">ID</th><th scope="col">HP</th>
    <th scope="col">Attack</th><th scope="col">Defense</th>
    <th scope="col">Type</th>
    <th scope="col">Back Sprite</th></tr><td>${data.id}</td>
    <td>${data.stats[0].base_stat}</td>
    <td>${data.stats[1].base_stat}</td>
    <td>${data.stats[2].base_stat}</td>
    <td>${data.types[0].type.name}</td>
    <td><img src="${data.sprites.back_default}"></td>
    </table>`;
    document.getElementById("tabla").innerHTML = codigoHTML;
}
