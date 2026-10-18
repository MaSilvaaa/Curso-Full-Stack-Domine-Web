let lista = document.getElementById("elementosDaLista");
let form = document.getElementById("addForm")
let botao = document.getElementById('confirmarRem');

LeituraInicial();

function CriarTarefa(){
    form.style.visibility = "visible";
}

async function RemoverTarefa(){
    botao.style.visibility = "visible";

    let deletes = Array.from(document.getElementsByClassName('delete'));    
    
    for(let del of deletes){
        del.style.visibility = "visible";
    }

    let remover = await aguardarConfirmacao();

    for(let remove of deletes){
        if(remove.checked){
            remove.parentNode.parentNode.remove()
        }
    }

    deletes = Array.from(document.getElementsByClassName('delete'));

    for(let del of deletes){
        del.style.visibility = "hidden";
    }

    botao.style.visibility = "hidden";

    SalvarLista();
}

function ResetarCampo(){
    let campoIndice = document.getElementById("tarefaID");

    campoIndice.value = "";
    campoIndice.style.color = "white";
}

async function LeituraInicial(){
    try {
        let dadosJson;
        const dadosLocais = localStorage.getItem("minhas_tarefas");
        
        if (dadosLocais) {
            dadosJson = JSON.parse(dadosLocais);
        } else {
            const resposta = await fetch("Data/tarefas.json");
            dadosJson = await resposta.json();
        }
        
        const listaTarefas = dadosJson.tarefas;
        for(let tarefa of listaTarefas){
            AdicionarElemento(tarefa.ID, tarefa.Text, tarefa.Check);
        }
    } catch (erro) { console.error(erro); }
}

function AdicionarElemento(ID, descricao, state){
    const newListElement = document.createElement("li");

    const newDiv = document.createElement("div");
    const newCheckBox = document.createElement("input");
    const newP = document.createElement("p");
    const newDelete = document.createElement("input")

    newDiv.className = "flexTarefa";
    newDiv.style.display = "flex";
    newDiv.style.flexDirection = "row";
    newDiv.style.backgroundColor = "black";
    newDiv.style.backgroundImage = "none";
    
    newCheckBox.type = "checkbox";
    newCheckBox.style.flex = "left";
    newCheckBox.checked = state;
    newCheckBox.className = "did"

    newP.style.backgroundColor = "black";
    newP.textContent = ID + ": " +descricao;
    newP.style.flex = "center";
    newP.style.flex = "1";

    newDelete.type = "checkbox";
    newDelete.style.flex = "right";
    newDelete.className = "delete";

    if(state){
        newP.style.textDecoration = "line-through";
        newP.style.color = "red";
    }

    newCheckBox.addEventListener('change', () => {
        SalvarLista();

        if(newCheckBox.checked == true){
            newP.style.textDecoration = "line-through";
            newP.style.color = "red";
        } else {
            newP.style.textDecoration = "none";
            newP.style.color = "white";
        }
    });

    newDiv.appendChild(newCheckBox);    
    newDiv.appendChild(newP);
    newDiv.appendChild(newDelete);
    newListElement.appendChild(newDiv);

    if(!document.getElementById("elemento" + ID)){
        newListElement.id = "elemento" + ID;
        lista.appendChild(newListElement);
    } else {
        return false;
    }

    return true;
}

function SalvarLista() {
    const tarefas = [];

    const itens = lista.getElementsByTagName("li");

    for (let item of itens) {
        const idOriginal = item.id; 
        
        if (!idOriginal) continue;

        const idStr = idOriginal.replace("elemento", "");
        
        if(idStr.trim() === "") continue;

        const id = idStr;

        const checkbox = item.querySelector("input[type='checkbox']");
        const paragrafo = item.querySelector("p");

        if (paragrafo && checkbox) {
            const textoCompleto = paragrafo.textContent;
            let descricao = "";

            if (textoCompleto.includes(":")) {
                descricao = textoCompleto.substring(textoCompleto.indexOf(":") + 2);
            } else {
                console.error("Erro na formatação! O texto não possui : para separar o ID");
                descricao = textoCompleto; 
            }

            if (descricao === "undefined") {
                descricao = "Nova Tarefa " + id;
            }

            tarefas.push({
                ID: id,
                Text: descricao,
                Check: checkbox.checked
            });
        }
    }

    const dadosParaSalvar = { tarefas: tarefas };
    
    const jsonString = JSON.stringify(dadosParaSalvar, null, 4);
    EnviarParaOBackend(jsonString);
}

function EnviarParaOBackend(jsonString) {
    localStorage.setItem("minhas_tarefas", jsonString);
    console.log("Salvo no LocalStorage do navegador!");
}

form.addEventListener('submit', function TratarForm(evento){
    console.log("recebido");

    evento.preventDefault();

    const dadosDoForms = new FormData(form);

    ConcluirAdd(dadosDoForms);
});

function ConcluirAdd(formsData){
    const nome = formsData.get('nome');
    const desc = formsData.get('desc');

    AdicionarElemento(nome, desc, false);
    console.log("adicionado: " + nome);
    form.style.visibility = "hidden"
    
    SalvarLista();
}

function aguardarConfirmacao() {
  return new Promise((resultado) => {
    
    botao.addEventListener('click', () => {
      resultado(true);
    }, { once: true });
    
  });
}