function atualizarTabelaPix() {
    const dataSelecionada = document.getElementById('dataSelecionada').value;
    const url = `/Classement_backend/pix/exibir_dados_pix.php?data=${dataSelecionada}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const tabelaPix = document.getElementById('tabelaPix').getElementsByTagName('tbody')[0];
            tabelaPix.innerHTML = ""; // Limpa o conteúdo atual da tabela
            let valorTotal = 0;
            let quantidadeTotal = 0;

            // Adiciona as novas linhas à tabela
            data.forEach((row, index) => {
                const newRow = tabelaPix.insertRow();
                newRow.insertCell(0).textContent = (index + 1).toString() + "º";
                newRow.insertCell(1).textContent = row.operador;
                newRow.insertCell(2).textContent = row.nome_operador;
                newRow.insertCell(3).textContent = Number(row.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                // Converte transacoes para número inteiro
                const transacoes = parseInt(row.transacoes, 10);
                newRow.insertCell(4).textContent = transacoes;

                // Atualiza os totais
                valorTotal += Number(row.valor);
                quantidadeTotal += transacoes;
            });
            // Atualiza o valor total no tfoot
            document.getElementById('valorTotal').textContent = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            // Atualiza a quantidade total no tfoot
            document.getElementById('qntdTotal').textContent = quantidadeTotal;
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
}

// Função para ser chamada quando a data é alterada
function dataSelecionadaAlterada() {
    atualizarTabelaPix();
}

// Função para ser chamada quando a data é alterada
function dataSelecionadaAlteradaPesquisaAvancada() {
    pesquisaAvancada();
}

// Adiciona um ouvinte de evento para detectar a alteração no input
document.getElementById('dataSelecionada').addEventListener('change', dataSelecionadaAlterada);
document.getElementById('dataSelecionada1').addEventListener('change', dataSelecionadaAlteradaPesquisaAvancada);
document.getElementById('dataSelecionada2').addEventListener('change', dataSelecionadaAlteradaPesquisaAvancada);

document.addEventListener('DOMContentLoaded', () => {
    // Obtemos o elemento de input 'dataSelecionada'
    const dataSelecionadaInput = document.getElementById('dataSelecionada');
    const dataSelecionadaInput1 = document.getElementById('dataSelecionada1');
    const dataSelecionadaInput2 = document.getElementById('dataSelecionada2');

    // Criamos uma nova data representando a data atual
    const dataAtual = new Date();

    // Formatamos a data no formato YYYY-MM-DD
    const dataFormatada = `${dataAtual.getFullYear()}-${(dataAtual.getMonth() + 1).toString().padStart(2, '0')}-${dataAtual.getDate().toString().padStart(2, '0')}`;

    // Definimos o valor do input como a data formatada
    dataSelecionadaInput.value = dataFormatada;
    dataSelecionadaInput1.value = dataFormatada;
    dataSelecionadaInput2.value = dataFormatada;    
    
    // Chamamos a função para atualizar a tabela
    atualizarTabelaPix();
});

function pesquisaAvancada() {
    const dataSelecionada = document.getElementById('dataSelecionada');
    const dataSelecionada1 = document.getElementById('dataSelecionada1').value;
    const dataSelecionada2 = document.getElementById('dataSelecionada2').value;

    if (dataSelecionada2) {
        dataSelecionada.disabled = true; // Desabilita a primeira data

        // Variaveis no backend
        // $dataInicial = $_GET['data_inicial'];
        // $dataFinal = $_GET['data_final'];
        const url = `/Classement_backend/pix/pesquisa_avancada_pix.php?data_inicial=${dataSelecionada1}&data_final=${dataSelecionada2}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const tabelaPix = document.getElementById('tabelaPix').getElementsByTagName('tbody')[0];
                tabelaPix.innerHTML = "";
                let valorTotal = 0;
                let quantidadeTotal = 0;

                data.forEach((row, index) => {
                    const newRow = tabelaPix.insertRow();
                    newRow.insertCell(0).textContent = (index + 1).toString() + "º";
                    newRow.insertCell(1).textContent = row.operador;
                    newRow.insertCell(2).textContent = row.nome_operador;
                    newRow.insertCell(3).textContent = Number(row.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                    // Converte transacoes para número inteiro
                    const transacoes = parseInt(row.transacoes, 10);
                    newRow.insertCell(4).textContent = transacoes;

                    // Atualiza os totais
                    valorTotal += Number(row.valor);
                    quantidadeTotal += transacoes;
                });
                // Atualiza o valor total no tfoot
                document.getElementById('valorTotal').textContent = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                // Atualiza a quantidade total no tfoot
                document.getElementById('qntdTotal').textContent = quantidadeTotal;
            })
            .catch(error => console.error('Erro ao buscar dados:', error));
    } else {
        dataSelecionada1.disabled = false; // Habilita a primeira data se a pesquisa avançada for cancelada
        alert('Selecione ambas as datas para a pesquisa avançada.');
    }
}

function togglePesquisaForm() {
    const pesquisaSimples = document.getElementById('pesquisaSimples');
    const pesquisaAvancada = document.getElementById('pesquisaAvancada');
    const tipoPesquisa = document.querySelector('input[name="tipoPesquisa"]:checked').value;

    if (tipoPesquisa === 'simples') {
        pesquisaSimples.style.display = 'block';
        pesquisaAvancada.style.display = 'none';
        dataSelecionada.disabled = false;
        dataSelecionadaAlterada();
    } else {
        pesquisaSimples.style.display = 'none';
        pesquisaAvancada.style.display = 'block';
        dataSelecionadaAlteradaPesquisaAvancada();
    }
}
