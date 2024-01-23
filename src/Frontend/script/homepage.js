function atualizarTabelaPix() {
    const dataSelecionada = document.getElementById('dataSelecionada').value;
    const url = `/Classement_backend/pix/exibir_dados_pix.php?data=${dataSelecionada}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const tabelaPix = document.getElementById('tabelaPix').getElementsByTagName('tbody')[0];
            tabelaPix.innerHTML = ""; // Limpa o conteúdo atual da tabela

            // Adiciona as novas linhas à tabela
            data.forEach((row, index) => {
                const newRow = tabelaPix.insertRow();
                newRow.insertCell(0).textContent = (index + 1).toString(); // Adiciona a posição
                newRow.insertCell(1).textContent = row.operador;
                newRow.insertCell(2).textContent = row.nome_operador;
                newRow.insertCell(3).textContent = row.valor;
                newRow.insertCell(4).textContent = row.transacoes;
            });
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
}

// Função para ser chamada quando a data é alterada
function dataSelecionadaAlterada() {
    atualizarTabelaPix();
}

// Adiciona um ouvinte de evento para detectar a alteração no input
document.getElementById('dataSelecionada').addEventListener('change', dataSelecionadaAlterada);

// Chamada da função após o carregamento da página
document.addEventListener('DOMContentLoaded', () => {
    atualizarTabelaPix(); // Chama a função ao carregar a página
});