const quantidadeComprada = document.querySelector(".quantidade-comprada")
const valorUnitario = document.querySelector(".valor-unitario")
const valorTot = document.querySelector("#valor-tot")
const listCompra = document.querySelector("#lista-comprar")
const formCompra = document.querySelector("#form-compra")

let itensCompra = []

const motrarProdutosCompra = () =>{
    listCompra.innerHTML = "";

    let produtos = JSON.parse(localStorage.getItem("produtos")) || []
    

    produtos.forEach((produto, index) => {
        let item = document.createElement("div")

        item.innerHTML = 
        `
        <div>
            <div>
                <div>
                    <h3>${produto.nome}</h3>
                    <p>falta comprar: ${produto.quantidade}</p>
                </div>
                <div>
                    <p>status</p>
                </div>
            </div>
            <div>
                <div>
                    <label for="">Quantidade comprada</label>
                    <input class="quantidade-comprada" type="text">
                </div>
                <div>
                    <label for="">valor unitario</label>
                    <input class="valor-unitario" type="text">
                </div>
                <div>
                    <p >valor total R$:</p>
                    <p class="valor-total">0</p>
                </div>
            </div>
        </div>
        `
        const inputQtd = item.querySelector(".quantidade-comprada")
        const inputValor = item.querySelector(".valor-unitario")
        const spanTotal = item.querySelector(".valor-total")

        itensCompra[index] = {
            produtoId: produto.id,
            nome: produto.nome,
            quantidade: 0,
            valorUnitario: 0,
            total: 0
        }


        const atualizarItem = () =>{
            const qtd = Number(inputQtd.value) || 0
            const valor = Number(inputValor.value) || 0

            const total = calcularTotalItem(qtd, valor)

            spanTotal.textContent = total.toFixed(2)
            
            itensCompra[index].quantidade = qtd
            itensCompra[index].valorUnitario = valor
            itensCompra[index].total = total

            atualizarTotalCompra()
        }
        
        inputQtd.addEventListener("input", atualizarItem)
        inputValor.addEventListener("input", atualizarItem)
        listCompra.appendChild(item)
    });
}

const atualizarTotalCompra = () => {
    const total = calcularTotalCompra(itensCompra)
    document.querySelector("#valor-tot").textContent = total.toFixed(2)
}


const calcularTotalItem = (quantidade, valorUnitario) => {
  return quantidade * valorUnitario
}

const calcularTotalCompra = (itens) =>{
    return itens.reduce((acc, item) => acc + item.total, 0)
}

formCompra.addEventListener("submit", (e) => {
    e.preventDefault()

    const compras = JSON.parse(localStorage.getItem("compras")) || []

    const itensFiltrados = itensCompra.filter(item => item.total > 0)

    const compra = {
        id: Date.now(),
        data: new Date().toLocaleDateString("pt-BR"),
        itens: itensFiltrados,
        totalCompra: calcularTotalCompra(itensFiltrados)
    }

    compras.push(compra)

    localStorage.setItem("compras", JSON.stringify(compras))
})





document.addEventListener("DOMContentLoaded", motrarProdutosCompra);