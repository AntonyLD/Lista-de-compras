const btnCadastrar = document.querySelector("#btn-cadastrar")
const nomeProduto = document.querySelector("#nome-produto")
const quantidadeProduto = document.querySelector("#quantidade-produto")
const formularioProduto = document.querySelector("#formulario-produto")
const listaDeProdutos = document.querySelector("#lista-de-produtos")
const btnComprar = document.querySelector("#btn-comprar")

const mostrarProdutos = () =>{ 
    listaDeProdutos.innerHTML = "";

    const produtos = JSON.parse(localStorage.getItem("produtos")) || []

    produtos.forEach((produto) => {
        const status = calcularStatus(produto)
        const visual = getVisualStatus(status);

        const item = document.createElement("div")
        item.id = "item-lista"
        item.innerHTML = 
        `
            <div class="main-info-produto">
                <div class="container-produtos">
                    <div class="div-info-produto">
                        <p class="nome-produto">${produto.nome}</p>
                        <p class="qtd-nes-produto">Total necessário: ${produto.quantidadeNecessaria}</p>
                        <p class="qtd-comprada-produto">Total comprado: ${produto.quantidadeComprada}</p>
                        <p class="status-produto ${visual.classe}">${visual.texto}</p>
                    </div>
                    <div class="div-btn-produto">
                        <button onclick="editarProdutos(${produto.id})">Editar</button>
                        <button onclick="excluirProdutos(${produto.id})">Apagar</button>
                    </div>
                </div>
            </div>
            
        `
        listaDeProdutos.appendChild(item)
    });
    
}

const cadastrar = () =>{
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    if(quantidadeProduto.value.trim() === "" || Number(quantidadeProduto.value) <= 0){
        return
    }

    if(produtoEmEdicao !== null){
        const produto = produtos.find(p => p.id === produtoEmEdicao)
        if (!produto) return;

        produto.nome = nomeProduto.value;
        produto.quantidadeNecessaria = Number(quantidadeProduto.value)

        produtoEmEdicao = null
        btnCadastrar.textContent = "Cadastrar";

    } else {
        produtos.push({
            id: Date.now(),
            nome: nomeProduto.value,
            quantidadeNecessaria: Number(quantidadeProduto.value),
            quantidadeComprada: 0
        })
    }

    localStorage.setItem("produtos", JSON.stringify(produtos))
    formularioProduto.reset()
    mostrarProdutos();
    btnCadastrar.textContent = "Cadastrar"
}

const excluirProdutos = (id) =>{
    const produtos = JSON.parse(localStorage.getItem("produtos")) || []
    
    const produtosAtualizados = produtos.filter(produto => produto.id !== id)

    localStorage.setItem("produtos", JSON.stringify(produtosAtualizados))
    mostrarProdutos()
}

let produtoEmEdicao = null

const editarProdutos = (id) => {
    const produtos = JSON.parse(localStorage.getItem("produtos")) || []

    const produto = produtos.find(p => p.id === id)
    if (!produto) return;

    nomeProduto.value = produto.nome
    quantidadeProduto.value = produto.quantidade

    produtoEmEdicao = id
    btnCadastrar.textContent = "Salvar";
}

const calcularStatus = (produto) =>{
    return produto.quantidadeComprada >= produto.quantidadeNecessaria
        ? "comprado" : "pendente" ;

}

function getVisualStatus(status) {
    const map = {
        comprado: {
        texto: "Comprado",
        classe: "status-comprado"
        },
        pendente: {
        texto: "Pendente",
        classe: "status-pendente"
        }
    };

    return map[status];
    }

formularioProduto.addEventListener("submit", (e) =>{
    e.preventDefault()
    cadastrar()
})

document.addEventListener("DOMContentLoaded", mostrarProdutos);

