// Array para armazenar os alunos
let alunosCadastrados = [];
let alunosAprovados = [];

// Função que coleta, verifica e armazena detalhes dos alunos.
function CadastroAlunos () {
    const inNomeAluno = document.getElementById("inNomeAluno");
    const inRA = document.getElementById("inRA");
    const inIdade = document.getElementById("inIdade");
    const inMedia = document.getElementById("inMedia");
    const inSexo = document.getElementById("inSexo");

    // Obtenha o conteúdo dos campos e armazena na variavel de suporte para as validações
    let nome = inNomeAluno.value;
    let ra = inRA.value;
    let idade = inIdade.value;
    let media = inMedia.value;
    let sexo = inSexo.value;
    let situacao = ""; //Variavel que receberá se o aluno foi aprovado ou reprovado através de calculo
    

    // Validação de entrada
    if (nome == "") { // Verificar se o nome foi preenchido
        alert ("Preencha o Nome do Aluno!");
        inNomeAluno.focus(); //Posiciona inNomeAluno
        return;
    } else if (ra == "") { // Verificar se o ra foi preenchido
        alert ("Preencha o RA do Aluno!");
        inRA.focus(); //Posiciona no campo inRA
        return;
    } else if (idade == "") { // Verificar se a idade foi preenchida
        alert ("Preencha a Idade do Aluno!");
        inIdade.focus(); //Posiciona no campo inIdade
        return;
    } else if (media == "") { // Verificar se a media foi preenchida
        alert ("Preencha a Media do Aluno!");
        inMedia.focus(); //Posiciona no campo inMedia
        return;
    }

    //Validar situação (Aprovado - Reprovado)
    if(media >= 6.0) {
        situacao = "Aprovado"
    } else {
        situacao = "Reprovado"
    }

    // Objeto para representar os alunos cadastados
    let alunos = {
        nome: nome,
        ra: ra,
        idade: idade,
        media: media,
        sexo: sexo,
        situacao: situacao
    }

    // Adicione os alunos ao array de alunosCadastrados
    alunosCadastrados.push(alunos);

    // Chame a função para exibir a listagem de títulos
    listaAlunos()

    // Chame a função Limpar campos
    LimparCampos() 
}

// Função que exibe os dados dos alunos cadastrados na div do HTML
function listaAlunos() {
    // Referência ao elemento HTML - div com id "listaAlunos")
    let listagemElement = document.getElementById("listaAlunos");

    // Limpe o conteúdo atual da listagem
    listagemElement.innerHTML = "";

    // Itere sobre o array de títulos cadastrados e crie elementos HTML para exibir as informações
    for (let alunos of alunosCadastrados) {
        let tituloElement = document.createElement("div");
        tituloElement.textContent = `Nome: ${alunos.nome}, RA: ${alunos.ra}, Idade: ${alunos.idade}, Media: ${alunos.media}, Sexo: ${alunos.sexo}, Situação: ${alunos.situacao}`;
        listagemElement.appendChild(tituloElement);
    }
}

// Função que limpa os dados preenchidos
function LimparCampos () {
    // Limpa os conteúdos dos elementos
    document.getElementById("inNomeAluno").value = ""
    document.getElementById("inRA").value = ""
    document.getElementById("inIdade").value = ""
    document.getElementById("inMedia").value = "";
    document.getElementById("inSexo").selectedIndex = 0; // Define a primeira opção como selecionada
}

// Função download JSON
function DownloadJSON() {
    // Converte o array de Alunos em uma string JSON
    let alunosJSON = JSON.stringify(alunosCadastrados);

    // Crie um elemento <a> para fazer o download do arquivo
    let a = document.createElement("a");
    a.href = "data:application/json;charset=utf-8," + encodeURIComponent(alunosJSON); // Correção aqui
    a.download = "alunos.json"; // Nome do arquivo

    // Simule um clique no elemento <a> para iniciar o download
    a.click();
}

// Ordenar por nome utilizando Bubble Sort (A-Z)
function OrdenarpNome() {
    const listaAlunosElement = document.getElementById("listaAlunos");
    listaAlunos.innerHTML = "";
    let swap;
    let loopCount = 0; // Contador de loop

    do {
        swap = false;
        for (let i = 0; i < alunosCadastrados.length - 1; i++) {
            if (alunosCadastrados[i].nome > alunosCadastrados[i + 1].nome) {
                // Trocar os alunos de posição
                [alunosCadastrados[i], alunosCadastrados[i + 1]] = [alunosCadastrados[i + 1], alunosCadastrados[i]];
                swap = true;
            }
            loopCount++; // Incrementar o contador de loop
        }
    } while (swap);

    console.log(`Bubble Sort por nome concluído em ${loopCount} iterações.`); // Exibe o número de iterações no console

    // Após a ordenação, chame a função listaAlunos para exibir os dados
    listaAlunos();
}

// Ordenar por RA utilizando Bubble Sort (Z-A)
function OrdenarpRA() {
    const listaAlunosElement = document.getElementById("listaAlunos");
    listaAlunosElement.innerHTML = "";
    let swap;
    let loopCount = 0; // Contador de execuções

    do {
        swap = false;
        for (let i = 0; i < alunosCadastrados.length - 1; i++) {
            if (alunosCadastrados[i].ra < alunosCadastrados[i + 1].ra) {
                // Trocar os alunos de posição
                [alunosCadastrados[i], alunosCadastrados[i + 1]] = [alunosCadastrados[i + 1], alunosCadastrados[i]];
                swap = true;
            }
            loopCount++; // Incrementar o contador de execuções
        }
    } while (swap);

    console.log(`Bubble Sort por RA concluído em ${loopCount} execuções.`); // Exibe o número de execuções no console

    // Após a ordenação, chame a função listaAlunos para exibir os dados
    listaAlunos();
}

// Ordenar por nome Aprovados (A-Z)
function OrdenarpNomeA() {

}

//Botões e evenos
    // Botões azuis
document.getElementById("btCadastrar").addEventListener("click", CadastroAlunos); // Evento clique botão "Cadastrar Aluno"
document.getElementById("btLimpar").addEventListener("click", LimparCampos); // Evento clique botão "Limpar Campos"

    // Botões amarelos
document.getElementById("btListar").addEventListener("click", listaAlunos); // Evento clique botão "Listar"
document.getElementById("btExportJSON").addEventListener("click", DownloadJSON); // Evento clique botão "Exportar em JSON"
    
    // Botões verdes
document.getElementById("btOrdenarNome").addEventListener("click", OrdenarpNome); // Evento clique botão "Ordenar por nome"
document.getElementById("btOrdenarRA").addEventListener("click", OrdenarpRA); // Evento clique botão "Ordenar por RA"
document.getElementById("btOrdenarNomeAprovados").addEventListener("click", OrdenarpNomeA); // Evento clique botão "Ordenar por Nome de aprovados"
