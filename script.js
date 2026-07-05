// Referências aos elementos do HTML
const form = document.getElementById("lista-mercado-form");
const nomeInput = document.getElementById("nomeItem");
const valorInput = document.getElementById("valorItem");
const lista = document.getElementById("lista-mercado");
const totalSpan = document.getElementById("total");
const limparBtn = document.getElementById("limpar-tela")

// Variáveis de controle
let total = 0;
let listaDeGastos = JSON.parse(localStorage.getItem("gastos")) || [];
let rendaMensal = parseFloat(localStorage.getItem("rendaMensal")) || 0;


// Função para atualizar a tela
function atualizarTela() {
    lista.innerHTML = "";
    total = 0;

    listaDeGastos.forEach((gasto) => {
        const li = document.createElement("li");
        li.textContent = `${gasto.descricao} ${gasto.categoria}: R$${gasto.valor.toFixed(2)}`;
        lista.appendChild(li);
        total += gasto.valor;
    });

    totalSpan.textContent = total.toFixed(2);
    atualizarGrafico();
}


//Evento de formulário 
form.addEventListener("submit", function(e) {
    e.preventDefault();
    const nome = nomeInput.value.trim();
    const valor = parseFloat(valorInput.value.trim());

    if (nome !== "" && !isNaN(valor) && valor >0) {
        const li = document.createElement("li");
        li.textContent = `${nome} - R$ ${valor.toFixed(2)}`;
        lista.appendChild(li);
        
        total += valor;
        totalSpan.textContent = total.toFixed(2);

        nomeInput.value = "";
        valorInput.value = "";
} else {
    alert("Preencha nome e valor do item");
} 
});

 // Limpar lista
limparBtn.addEventListener("click", function() {
        lista.innerHTML = "";
        total = 0;
        totalSpan.textContent = "0.00";
});

    // animação GSAP
    gsap.fromTo("#moeda", 
     { y: -200, opacity: 0 }, 
     { y: 0, opacity: 1, rotation: 360, duration: 2, ease: "bounce" }
    );
