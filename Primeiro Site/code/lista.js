var lista = document.getElementById("elementosDaLista");
var lisLista = lista.getElementsByTagName("li");

function CriarTarefa(){
    var newListElement = document.createElement("li");

    var elementText = document.createTextNode("Teste");

    newListElement.appendChild(elementText);

    newListElement.id = "element" + (lisLista.length + 1);

    lista.appendChild(newListElement);
}

function RemoverTarefa(){
    
}