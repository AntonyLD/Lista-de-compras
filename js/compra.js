const quantidadeComprada = document.querySelector("#quantidade-comprada")
const valorUnitario = document.querySelector("#valor-unitario")
const valorTot = document.querySelector("#valor-tot")
const listCompra = document.querySelector("#lista-comprar")


const motrarProdutosCompra = () =>{
    listCompra.innerHTML = "";

    let produtos = JSON.parse(localStorage.getItem("produtos")) || []

    produtos.forEach((produto) => {
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
                    <input id="quantidade-comprada" type="text">
                </div>
                <div>
                    <label for="">valor unitario</label>
                    <input id="valor-unitario" type="text">
                </div>
                <div>
                    <p>valor total R$:</p>
                    <p>200</p>
                </div>
            </div>
        </div>
        `
        
        listCompra.appendChild(item)
    });
}



document.addEventListener("DOMContentLoaded", motrarProdutosCompra);