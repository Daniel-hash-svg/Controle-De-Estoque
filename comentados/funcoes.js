function validarProduto(idNomeProduto, idCodProduto, idQuantidadeProduto) { // essa função é chamada quando aperta o botão "Cadastrar". É pra ver se tem algum input vazio.
    const nome = document.getElementById(idNomeProduto).value;
    const codigo = document.getElementById(idCodProduto).value;
    const quantidade = document.getElementById(idQuantidadeProduto).value;

    if( nome == "" || codigo == "") {
        alert("Nome do produto ou o código estão em branco. Por favor, preencha ambos.");
    }
    else cadastrarProduto(nome,codigo, parseInt(quantidade)); // se preencheu todos, aí chama essa função de cadastro.
}

function cadastrarProduto(produto, codigo, quantidade) {
    // esses 3 parâmetros são as let que tem na função anterior.
    const novoProduto = {nome: produto, codigo: codigo, quantidade: quantidade}; // um objeto com as infos desse produto novo que tou querendo cadastrar.

    if(typeof(Storage) !== 'undefined') { // isso aqui é pra ver se o navegador tem compatibilidade com o localStorage. Nesse caso é pq tem compatibilidade sim.

      const produtos = localStorage.getItem("produtos"); // vai tentar pegar o valor dessa chave "produtos" lá no localStorage, caso tenha alguma coisa no local storage

      if(produtos == null) {
        produtos = [] // Pode ser que nenhum produto ainda tenha sido cadastrado. Se for assim, aí nesse caso eu deixo essa variável com array vazio.
      } 

      else { // caso já tenha um produto ou mais cadastrado(s), aí a variável produtos vai receber o conjunto das infos que se tinha lá no localStorage.
        produtos = JSON.parse(produtos);  // Quando pega os dados do localStorage com o getItem, ele retorna esses dados em string. Aí usa o json.parse pra poder ter em json e aí sim poder fazer operações nisso.
      }
        // ******************* nesse momento aqui a variável produtos pode ser um array vazio(caso nenhum produto tivesse sido cadastrado) ou pode ser um array de objetos, onde cada objeto é um produto já cadastrado. Como essa função vai cadastrar um produto novo, então adiciona nesse array o novo objeto com o produto novo.
        produtos.push(novoProduto); 
      
        localStorage.setItem("produtos", JSON.stringify(produtos));  // aí tem que atualizar esse novo valor da variável produtos no local storage. Vai acessar a chave "produtos" e usa o JSON.stringfy pra dar certo e ser compatível de enviar as infos lá como string. Se não tinha nenhum produto cadastrado,nem teria a chave produtos no localStorage, mas aí nesse momento passa a existir, quando cadastra o primeiro produto. *********************************************8

        alert("Foram cadastrados com sucesso "+quantidade+" unidades do produto "+produto+"!");
        atualizarTotalEstoque("totalEstoque"); // chama essa outra função
        location.reload(); // Após concluir essa função atualizarTotalEstoque, recarrega a página.
    }
    else { // se não tiver compatibilidade.
        alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação")
    }
}

// o parâmetro passado nessa função aqui é o "totalEstoque", isso é o id que eu botei no arquivo HTML lá no span do lado da imagem.
function atualizarTotalEstoque(idCampo) {
    localStorage.setItem("totalEstoque", ++document.getElementById(idCampo).innerHTML)
} // o "++document.getElementById(idCampo).innerHTML" quer dizer que é pra pegar o valor que tem naquele span, aumentar esse valor em 1, e aí depois armazena esse valor APENAS NO STORAGE(na chave "totalEstoque"). Armazenar esse novo valor no span é apenas na funçaõ abaixo ****************

function carregarTotalEstoque(idCampo) { // essa função é chamada quando carrega a página
    if (typeof(Storage) !== "undefined") {
        
        const totalEstoque = localStorage.getItem("totalEstoque"); // vai no storage e tenta achar a chave "totalEstoque" pra pegar o valor dessa chave. Coloca o resultado dessa "procura" nessa let de mesmo nome

        // Se essa variável totalEstoque(que recebe o resultado do getItem) for null, é pq a chave "totalEstoque" ainda não existe(pq ainda não tem nenhum produto cadastrado no estoque). Aí só pega a variável totalEstoque e armazena o valor 0 nela.
        if(totalEstoque == null) {
            totalEstoque = 0;
        }  

        // se encontrar essa chave no storage é pq ela já existe, e aí essa chave vai ter algum valor. Pega esse valor dela e bota lá no span do html.
        document.getElementById(idCampo).innerHTML = totalEstoque; // ************************* é aqui que atualiza o valor no span. Pega esse novo valor no storage(feito na função anterior) e aí atualiza no span agora.
    }
    // caso o storage fique undefined mesmo, aí é incompatível.
    else alert("A versão do seu navegador é muito antiga. Por isso não será possível executar essa aplicação.")
}

function listarEstoque() {
    if(typeof(Storage) !== "undefined") {
         produtos = localStorage.getItem("produtos"); // é pra pegar o valor dessa chave "produtos" no storage. Fica sem let, var ou const aqui pq essa foi const foi declarada lá em cima.
        
        document.write("<h1>Estoque:</h1>") // esse h1 vai ser escrito na outra página html verEstoque
        if(produtos == null) {
            document.write("<h3>Ainda não há nenhum item no estoque</h3>");
        } // caso não tenha nenhum produto cadastrado no estoque ainda.
        
        else {
            produtos = JSON.parse(produtos);
            produtos.forEach(produto => {
                document.write("<ul id='ul'>"); 
                document.write("<li id='li'>Nome do produto: "+produto.nome+" </li>");
                document.write("<li id='li'>Código do produto: "+produto.codigo+" </li>");
                document.write("<li id='li'>Quantidade no estoque: "+produto.quantidade+" </li>");
                document.write("</ul>");
                 
            }); // cada produto que vai aparecer na página verEstoque vai ser uma <ul></ul> com essas 3 LIs dentro e esse button.
            // document.write("<button id='removeBtn' onclick='removerItem()' >Remover do Estoque</button>"); 
             
              
        }
    }
    // se não for compatível com o navegador
    else alert("A versão do seu navegador é muito antiga. Por isso não será possível visualizar o estoque.")
}
// var removeBtn = document.getElementById("removeBtn");
// removeBtn.addEventListener("click", removerItem);


// function removerItem() { // precisa ficar sem parâmetro,inclusive quando chama no onclick

//         // const ul = document.getElementById("ul");
//         // const  removeBtn = document.getElementById("removeBtn")
//         // ul.parentNode.removeChild(ul); // remove a própria ul que envolve o button.
//         // removeBtn.parentNode.removeChild(removeBtn);

//          totalEstoque = localStorage.getItem("totalEstoque");
//          localStorage.setItem("totalEstoque", 0)
//          // document.getElementById(idCampo).innerHTML = 0;
//          produtos  = localStorage.getItem("produtos");
//          const teste = localStorage.setItem("produtos", "")
//          const novoStorageEstoque = JSON.parse(teste);
         
//          location.reload()
//          document.write(novoStorageEstoque)
// }
