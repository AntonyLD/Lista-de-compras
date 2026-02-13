const contaierInfoCompras = document.querySelector(".contaier-info-compra")
const infoItensComprados = document.querySelector(".div-info-compras")
const divInfoProdutos = document.querySelector(".info-itens-comprados-ocultar")


const mostrarHistoricoCompras = () =>{
    infoItensComprados.innerHTML = ""
    
    const historicoCompras = JSON.parse(localStorage.getItem("compras")) || [];

    historicoCompras.forEach((compra) => {
        const containerItens = document.createElement("div");
        containerItens.className = "info-itens-comprados";

        const infoCompra = document.createElement("div")
        infoCompra.className = "info-itens-comprados-ocultar"
        infoCompra.innerHTML = `
            
                <div class="info-historico-compra">
                    <div>
                        <h3 class="data-compra">${compra.data}</h3>
                    </div>
                    <div class="div-info-tot-compra">
                        <div>
                            <p>Total</p>
                            <h2 class="valor-tot-compra">${compra.totalCompra}</h2>
                        </div>
                        <div class="tot-compra-icon">
                            <button class="bnt-deletar"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ff3b3b"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
                            <img src="../img/Setinha.png" alt="">
                        </div>
                    </div>
                </div>
        `
        compra.itens.forEach((item) =>{
            const infoProduto = document.createElement("div")
            infoProduto.className = "info-itens-comprados"

            infoProduto.innerHTML = `
                            <div class="div-info-produtos">
                                <div class="info-pro-necess">
                                    <p class="nome-produto-comprado">${item.nome}</p>
                                    <p>Necessário</p>
                                    <p class="qtd-necessaria">18</p>
                                </div>
                                <div>
                                    <p>Comprado</p>
                                    <p class="qtd-comprada" >${item.quantidadeComprada}</p>
                                </div>
                                <div>
                                    <p>Valor Unitário</p>
                                    <p class="valor-unitario"> R$ ${item.valorUnitario}</p>
                                </div>
                                <div>
                                    <p>Valor Total</p>
                                    <p class="total-unitario">R$ ${item.totalItem}</p>
                                </div>
                                <div class="check-compra">
                                    <img src="../img/check.png" alt="">
                                </div>
                            </div>
            `
            
            containerItens.appendChild(infoProduto);
        })

        
        infoCompra.appendChild(containerItens);

        contaierInfoCompras.appendChild(infoCompra);

    });
    
}
mostrarHistoricoCompras()
// infoItensComprados.addEventListener("click", () => {
    
// })

