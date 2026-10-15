// Captura os elementos do DOM
const formCompra = document.getElementById('formCompra');
const valorCompraInput = document.getElementById('valorCompra');
const resultadoDiv = document.getElementById('resultado');
const valorOriginalEl = document.getElementById('valorOriginal');
const percentualDescontoEl = document.getElementById('percentualDesconto');
const valorDescontoEl = document.getElementById('valorDesconto');
const valorFinalEl = document.getElementById('valorFinal');

// Função para formatar valores em Real (R$)
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

// Função que calcula o desconto com base no valor da compra
function calcularDesconto(total) {
    let percentual = 0;

    if (total < 100) {
        // Compra menor que 100 -> sem desconto
        percentual = 0;
    } else if (total >= 100 && total < 500) {
        // Compra entre 100 e 499.99 -> 5% de desconto
        percentual = 5;
    } else {
        // Compra maior ou igual a 500 -> 10% de desconto
        percentual = 10;
    }

    const valorDesconto = total * (percentual / 100);
    const totalComDesconto = total - valorDesconto;

    return {
        percentual: percentual,
        valorDesconto: valorDesconto,
        totalComDesconto: totalComDesconto
    };
}

// Evento de submit do formulário
formCompra.addEventListener('submit', function (evento) {
    // Evita o recarregamento da página
    evento.preventDefault();

    // Lê o valor digitado e converte para número
    const total = parseFloat(valorCompraInput.value);

    // Valida se o valor é um número válido e positivo
    if (isNaN(total) || total < 0) {
        alert('Por favor, informe um valor válido para a compra.');
        return;
    }

    // Calcula o desconto
    const resultado = calcularDesconto(total);

    // Exibe os resultados na tela
    valorOriginalEl.textContent = 'Valor da compra: ' + formatarMoeda(total);
    percentualDescontoEl.textContent = 'Desconto aplicado: ' + resultado.percentual + '%';
    valorDescontoEl.textContent = 'Valor do desconto: ' + formatarMoeda(resultado.valorDesconto);
    valorFinalEl.textContent = 'Total com desconto: ' + formatarMoeda(resultado.totalComDesconto);

    // Mostra a área de resultado
    resultadoDiv.classList.remove('oculto');
});