const btnCadastrar = document.querySelector("#btn-cadastrar")
const nomeProduto = document.querySelector("#nome-produto")
const quantidadeProduto = document.querySelector("#quantidade-produto")
const formularioProduto = document.querySelector("#formulario-produto")
const listaDeProdutos = document.querySelector("#lista-de-produtos")
const btnComprar = document.querySelector("#btn-comprar")

const mostrarProdutos = () =>{
    listaDeProdutos.innerHTML = "";

    const produtos = JSON.parse(localStorage.getItem("produtos")) || []

    produtos.forEach((produto, index) => {
        const item = document.createElement("div")

        item.innerHTML = 
        `
            
                <h2>${produto.nome}</h2>
                <p>Quantidade necessária: ${produto.quantidade}</p>
                <p>Quantidade comprada: 0</p>
                        <p>Status: Pendente</p>
                <button onclick="editarProdutos(${index})">Editar</button>
                <button onclick="excluirProdutos(${index})">Apagar</button>
            
        `
        listaDeProdutos.appendChild(item)
    });
}

const cadastrar = () =>{
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    if(quantidadeProduto.value.trim() === "" || Number(quantidadeProduto.value) <= 0){
        return
    }

    if(indexEmEdicao !== null){
        
        produtos[indexEmEdicao] = {
            nome: nomeProduto.value,
            quantidade: Number(quantidadeProduto.value)
        }

        indexEmEdicao = null
    } else {
        produtos.push({
            nome: nomeProduto.value,
            quantidade: Number(quantidadeProduto.value)
        })
    }

    localStorage.setItem("produtos", JSON.stringify(produtos))
    formularioProduto.reset()
    mostrarProdutos();
    btnCadastrar.textContent = "Cadastrar"
}

const excluirProdutos = (index) =>{
    const produtos = JSON.parse(localStorage.getItem("produtos")) || []

    produtos.splice(index, 1)
    localStorage.setItem("produtos", JSON.stringify(produtos))
    mostrarProdutos()
}

let indexEmEdicao = null

const editarProdutos = (index) => {
    const produtos = JSON.parse(localStorage.getItem("produtos")) || []

    nomeProduto.value = produtos[index].nome
    quantidadeProduto.value = produtos[index].quantidade
    indexEmEdicao = index
    btnCadastrar.textContent = "Salvar"
}

formularioProduto.addEventListener("submit", (e) =>{
    e.preventDefault()
    cadastrar()
})

document.addEventListener("DOMContentLoaded", mostrarProdutos);

