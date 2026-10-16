var calcs = document.getElementsByClassName("numero")
var textArea = document.getElementById("tela")

textArea.value = "";

var val1 = 0;
var val2 = 0;
var newResult;
var op = '&';
var reachedOP = 0;

for(let i = 0; i < calcs.length; i ++){
    calcs[i].textContent = i + 1;
    if(i == 9)
    {
        calcs[i].textContent = 0;
    }
}

function FazerOperacao(sinal){
    if(newResult != 0){
        textArea.value = "";

        newResult = 0;
        
        return;
    }

    if(op != '&'){
        return;
    }

    textArea.value += sinal;
    op = sinal;
}
function ProcessarNumero(valor){
    if(newResult != 0)
    {
        textArea.value = "";
    }

    textArea.value += valor;
    newResult = 0;
}

function MostrarResultado(){
    if(textArea.value == "")
    {
        return;
    }

    var indOP = textArea.value.indexOf(op);
    console.log(textArea.value);
    val1 = textArea.value.substring(0, indOP);
    val2 = textArea.value.substring(indOP+1, textArea.value.length);
    console.log(val1 + " e " + val2);
    var n1 = parseFloat(val1);
    var n2 = parseFloat(val2);
    var n3 = 0.0;

    switch(op){
        case '+':
            textArea.value = n1 + n2;
            
            break;
        case '-':
            textArea.value = n1 - n2;

            break;
        case '*':
            textArea.value = n1*n2;
            
            break;
        case '/':
            if(n2 == 0){
                textArea.value = "Divisão por Zero!!!"
                break;
            }

            textArea.value = n1/n2;

            break;
        default:
            break;
    }

    if(textArea.value == "NaN"){
        textArea.value = "Operação inválida!"
    }

    op = '&';

    val1 = 0;
    val2 = 0;
    newResult = 1;
    n = 0;
}

function LimparTela(){
    textArea.value = "";
    val1 = 0;
    val2 = 0;
    newResult = 1;
    n = 0;
    op = "&";
}

function Doom(){
    if(Math.random() > 0.25)
    {
        var video = document.getElementById('skel');

        video.style.src = "";
        video.style.src = "./images/runningSkel.gif";
        video.style.visibility = "visible";

        setTimeout(()=>{
            video.style.visibility = "hidden";
        }, 1000);   
    }
}