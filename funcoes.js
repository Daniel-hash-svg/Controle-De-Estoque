function validarProduto(idNomeProduto, idCodProduto, idQuantidadeProduto) { 
    let nome = document.getElementById(idNomeProduto).value;
    let codigo = document.getElementById(idCodProduto).value;
    let quantidade = document.getElementById(idQuantidadeProduto).value;

    if( nome == "" || codigo == "") {
        alert("Nome do produto ou o código estão em branco. Por favor, preencha ambos.");
    }
    else cadastrarProduto(nome,codigo, parseInt(quantidade)); 
}

function cadastrarProduto(produto, codigo, quantidade) {
    // esses 3 parâmetros são as let que tem na função anterior.
    let novoProduto = {nome: produto, codigo: codigo, quantidade: quantidade}; // um objeto com as infos desse produto novo que tou querendo cadastrar.

    if(typeof(Storage) !== 'undefined') { 

      let produtos = localStorage.getItem("produtos"); 

      if(produtos == null) {
        produtos = [] 
      } 

    else { 
        produtos = JSON.parse(produtos);  
      }
        
        produtos.push(novoProduto); 
      
        localStorage.setItem("produtos", JSON.stringify(produtos));  

        alert("Foram cadastrados com sucesso "+quantidade+" unidades do produto "+produto+"!");
        atualizarTotalEstoque("totalEstoque"); 
        location.reload();
    }
    else { // se não tiver compatibilidade.
        alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação")
    }
}


function atualizarTotalEstoque(idCampo) {
    localStorage.setItem("totalEstoque", ++document.getElementById(idCampo).innerHTML)
} 

function carregarTotalEstoque(idCampo) { // essa função é chamada quando carrega a página
    if (typeof(Storage) !== "undefined") {
        
        let totalEstoque = localStorage.getItem("totalEstoque"); 

     
        if(totalEstoque == null) {
            totalEstoque = 0;
        }  

        document.getElementById(idCampo).innerHTML = totalEstoque; 
    }
    
    else alert("A versão do seu navegador é muito antiga. Por isso não será possível executar essa aplicação.")
}

function listarEstoque() {
    if(typeof(Storage) !== "undefined") {
        let produtos = localStorage.getItem("produtos"); 
        
        document.write("<h1>Estoque:</h1>") 
        if(produtos == null) {
            document.write("<h3>Ainda não há nenhum item no estoque</h3>");
        } // caso não tenha nenhum produto cadastrado no estoque ainda.
        
        else {
            produtos = JSON.parse(produtos);
            produtos.forEach(produto => {
                document.write("<ul>"); 
                document.write("<li>Nome do produto: "+produto.nome+" </li>");
                document.write("<li>Código do produto: "+produto.codigo+" </li>");
                document.write("<li>Quantidade no estoque: "+produto.quantidade+" </li>");
                document.write("</ul>");     
            }); 
             
              
        }
    }
    else alert("A versão do seu navegador é muito antiga. Por isso não será possível visualizar o estoque.")
}
