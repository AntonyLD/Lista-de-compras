const listCompra = document.querySelector("#lista-comprar");
const formCompra = document.querySelector("#form-compra");
const historico = document.querySelector("#historico");
const valorTot = document.querySelector("#valor-total-compra");

let itensCompra = [];

const mostrarProdutosCompra = () => {
    listCompra.innerHTML = "";
    itensCompra = [];

    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    produtos.forEach((produto, index) => {
        const item = document.createElement("div");
        item.id = "item-compra";
        item.innerHTML = `
            <div class="container-item-compra">
                <div class="div-info-produto">
                    <div class="info-produto">
                        <h3>${produto.nome}</h3>
                        <p>Falta comprar: <span class="quantidade-faltante">${produto.quantidadeNecessaria}</span></p>
                    </div>
                    <p>Total Item R$: <span class="valor-total-item">0.00</span></p>
                </div>

                <div class="container-input-compra">
                    <div class="contaiter-style-input-compra">
                        <div class="div-style-input-compra">
                            <label>Quantidade a comprar</label>
                            <input class="quantidade-comprada" type="number" min="0">
                        </div>

                        <div class="div-style-input-compra">
                            <label>Valor unitário</label>
                            <input class="valor-unitario" type="number" min="0" step="0.01">
                        </div>
                    </div>

                    
                </div>
            </div>
        `
        const inputQtd = item.querySelector(".quantidade-comprada");
        const inputValor = item.querySelector(".valor-unitario");
        const spanTotal = item.querySelector(".valor-total-item");

        itensCompra[index] = {
            produtoId: produto.id,
            nome: produto.nome,
            valorUnitario: 0,
        };

        const atualizarItem = () => {
            const qtd = Number(inputQtd.value) || 0;
            const valor = Number(inputValor.value) || 0;

            const totalItem = calcularTotalItem(qtd, valor);

            spanTotal.textContent = totalItem.toFixed(2);

            itensCompra[index].quantidadeComprada = qtd;
            itensCompra[index].valorUnitario = valor;
            itensCompra[index].totalItem = totalItem;

            atualizarTotalCompra();
            atualizarItensFaltantes()
        };

        const atualizarItensFaltantes = () =>{
            const spanQuantFaltante = item.querySelector(".quantidade-faltante")
            const produtoAtual = produtos.find(p => p.id === produto.id)
            const faltanteBase = produtoAtual.quantidadeNecessaria - produtoAtual.quantidadeComprada
            const qtdDigitada = Number(inputQtd.value) || 0
            const simulacao = faltanteBase - qtdDigitada
            spanQuantFaltante.textContent = simulacao <= 0 ? 0 : simulacao

        }
        atualizarItensFaltantes()

        inputQtd.addEventListener("input", atualizarItem );
        inputValor.addEventListener("input", atualizarItem);

        listCompra.appendChild(item);
    });


    atualizarTotalCompra();
};

const calcularTotalItem = (quantidadeNecessaria, valorUnitario) => {

    return quantidadeNecessaria * valorUnitario;
};

const calcularQuantidadeItem = (qtdCadastrada, qtdComprada) =>{
    if (qtdCadastrada <= qtdComprada){
        qtdCadastrada = 0
        return qtdCadastrada
    }else {
        return qtdCadastrada - qtdComprada
    }
}

const calcularTotalCompra = (itens) => {
    return itens.reduce((acc, item) => acc + item.totalItem, 0);
};

const atualizarTotalCompra = () => {
    const total = calcularTotalCompra(itensCompra);
    if (isNaN(total)){
        valorTot.textContent = 0
    } else {
        valorTot.textContent = total.toFixed(2);
    }

};

formCompra.addEventListener("submit", (e) => {
    e.preventDefault();

    const compras = JSON.parse(localStorage.getItem("compras")) || [];
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    const itensFiltrados = itensCompra.filter(item => item.totalItem > 0);

    if (itensFiltrados.length === 0) return;

    const compra = {
        id: Date.now(),
        data: new Date().toLocaleDateString("pt-BR"),
        itens: itensFiltrados,
        totalCompra: calcularTotalCompra(itensFiltrados)
    };

    compras.push(compra);
    localStorage.setItem("compras", JSON.stringify(compras));

    itensFiltrados.forEach(item =>{
        const produto = produtos.find(p => p.id === item.produtoId);
        if (!produto) return;

        if (!produto.quantidadeComprada){
            produto.quantidadeComprada = 0
        }

        produto.quantidadeComprada += item.quantidadeComprada
    })

    localStorage.setItem("compras", JSON.stringify(compras))
    localStorage.setItem("produtos", JSON.stringify(produtos))

    alert("Compra salva com sucesso!");
    formCompra.reset()
});

document.addEventListener("DOMContentLoaded", mostrarProdutosCompra);
