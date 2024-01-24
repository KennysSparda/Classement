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

document.addEventListener('DOMContentLoaded', () => {
    // Obtemos o elemento de input 'dataSelecionada'
    const dataSelecionadaInput = document.getElementById('dataSelecionada');

    // Criamos uma nova data representando a data atual
    const dataAtual = new Date();

    // Formatamos a data no formato YYYY-MM-DD
    const dataFormatada = `${dataAtual.getFullYear()}-${(dataAtual.getMonth() + 1).toString().padStart(2, '0')}-${dataAtual.getDate().toString().padStart(2, '0')}`;

    // Definimos o valor do input como a data formatada
    dataSelecionadaInput.value = dataFormatada;

    // Adicionamos um ouvinte de evento para detectar alterações na data
    dataSelecionadaInput.addEventListener('change', dataSelecionadaAlterada);

    // Chamamos a função para atualizar a tabela
    atualizarTabelaPix();
});

// Variaveis no backend
// $dataInicial = $_GET['data_inicial'];
// $dataFinal = $_GET['data_final'];