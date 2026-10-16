const data = document.getElementById("data");

var dateNow = new Date();

data.textContent = dateNow.getDate() + '/' + (dateNow.getMonth() + 1) + '/' + dateNow.getFullYear();

const gatinho = document.getElementById("gatinho");

gatinho.onmouseover = function(){
    gatinho.src = "images/Larry.jpg"
}

gatinho.onmouseout = function(){
    gatinho.src = "images/oii.gif"
}