const data = document.getElementById("data");

var dateNow = new Date();

data.textContent = dateNow.getDate() + '/' + (dateNow.getMonth() + 1) + '/' + dateNow.getFullYear();

var gif = document.getElementById("gif")

gif.onmouseover = function(){
    gif.src = "./images/larry.jpeg"
    gif.width = 300;
    gif.height = 230;
};

gif.onmouseout = function(){
    gif.src = "./images/oii.gif"
}