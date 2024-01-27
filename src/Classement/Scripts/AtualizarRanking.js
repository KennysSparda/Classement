function atualizarTabelaPix() {
    const dataSelecionada = document.getElementById('dataSelecionadaPix').value;
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
function dataSelecionadaAlteradaPix() {
    atualizarTabelaPix();
}

// Função para ser chamada quando a data é alterada
function dataSelecionadaAlteradaPesquisaAvancadaPix() {
    pesquisaAvancadaPix();
}

// Adiciona um ouvinte de evento para detectar a alteração no input
document.getElementById('dataSelecionadaPix').addEventListener('change', dataSelecionadaAlteradaPix);
document.getElementById('dataSelecionadaPix1').addEventListener('change', dataSelecionadaAlteradaPesquisaAvancadaPix);
document.getElementById('dataSelecionadaPix2').addEventListener('change', dataSelecionadaAlteradaPesquisaAvancadaPix);

document.addEventListener('DOMContentLoaded', () => {
    // Obtemos o elemento de input 'dataSelecionada'
    const dataSelecionadaInputPix = document.getElementById('dataSelecionadaPix');
    const dataSelecionadaInputPix1 = document.getElementById('dataSelecionadaPix1');
    const dataSelecionadaInputPix2 = document.getElementById('dataSelecionadaPix2');
    const dataSelecionadaInputRecargas = document.getElementById('dataSelecionadaRecargas');
    const dataSelecionadaInputRecargas1 = document.getElementById('dataSelecionadaRecargas1');
    const dataSelecionadaInputRecargas2 = document.getElementById('dataSelecionadaRecargas2');
    const dataSelecionadaInputNPS = document.getElementById('dataSelecionadaNPS');
    const dataSelecionadaInputNPS1 = document.getElementById('dataSelecionadaNPS1');
    const dataSelecionadaInputNPS2 = document.getElementById('dataSelecionadaNPS2');

    // Criamos uma nova data representando a data atual
    const dataAtual = new Date();

    // Formatamos a data no formato YYYY-MM-DD
    const dataFormatada = `${dataAtual.getFullYear()}-${(dataAtual.getMonth() + 1).toString().padStart(2, '0')}-${dataAtual.getDate().toString().padStart(2, '0')}`;

    // Definimos o valor do input como a data formatada
    dataSelecionadaInputPix.value = dataFormatada;
    dataSelecionadaInputPix1.value = dataFormatada;
    dataSelecionadaInputPix2.value = dataFormatada;
    dataSelecionadaInputRecargas.value = dataFormatada;
    dataSelecionadaInputRecargas1.value = dataFormatada;
    dataSelecionadaInputRecargas2.value = dataFormatada;
    dataSelecionadaInputNPS.value = dataFormatada;
    dataSelecionadaInputNPS1.value = dataFormatada;
    dataSelecionadaInputNPS2.value = dataFormatada;

    // Chamamos a função para atualizar a tabela
    atualizarTabelaPix();
});

function pesquisaAvancadaPix() {
    const dataSelecionada1 = document.getElementById('dataSelecionadaPix1').value;
    const dataSelecionada2 = document.getElementById('dataSelecionadaPix2').value;

    if (dataSelecionada2) {
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
        alert('Selecione ambas as datas para a pesquisa avançada.');
    }
}

function togglePesquisaFormPix() {
    const pesquisaSimples = document.getElementById('pesquisaSimplesPix');
    const pesquisaAvancada = document.getElementById('pesquisaAvancadaPix');
    const tipoPesquisa = document.querySelector('input[name="tipoPesquisaPix"]:checked').value;

    if (tipoPesquisa === 'simples') {
        pesquisaSimples.style.display = 'block';
        pesquisaAvancada.style.display = 'none';
        dataSelecionadaAlteradaPix();
    } else {
        pesquisaSimples.style.display = 'none';
        pesquisaAvancada.style.display = 'block';
        dataSelecionadaAlteradaPesquisaAvancadaPix();
    }
}

function atualizarTabelaRecargas() {
    const dataSelecionada = document.getElementById('dataSelecionadaRecargas').value;
    const url = `/Classement_backend/recargas/exibir_dados_recargas.php?data=${dataSelecionada}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const tabelaRecargas = document.getElementById('tabelaRecargas').getElementsByTagName('tbody')[0];
            tabelaRecargas.innerHTML = ""; // Limpa o conteúdo atual da tabela
            let valorTotal = 0;
            let quantidadeTotal = 0;

            // Adiciona as novas linhas à tabela
            data.forEach((row, index) => {
                const newRow = tabelaRecargas.insertRow();
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
function dataSelecionadaAlteradaRecargas() {
    atualizarTabelaRecargas();
}

// Função para ser chamada quando a data é alterada
function dataSelecionadaAlteradaPesquisaAvancadaRecargas() {
    pesquisaAvancadaRecargas();
}

// Adiciona um ouvinte de evento para detectar a alteração no input
document.getElementById('dataSelecionadaRecargas').addEventListener('change', dataSelecionadaAlteradaRecargas);
document.getElementById('dataSelecionadaRecargas1').addEventListener('change', dataSelecionadaAlteradaPesquisaAvancadaRecargas);
document.getElementById('dataSelecionadaRecargas2').addEventListener('change', dataSelecionadaAlteradaPesquisaAvancadaRecargas);

function pesquisaAvancadaRecargas() {
    const dataSelecionada1 = document.getElementById('dataSelecionadaRecargas1').value;
    const dataSelecionada2 = document.getElementById('dataSelecionadaRecargas2').value;

    if (dataSelecionada2) {
        const url = `/Classement_backend/recargas/pesquisa_avancada_recargas.php?data_inicial=${dataSelecionada1}&data_final=${dataSelecionada2}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const tabelaRecargas = document.getElementById('tabelaRecargas').getElementsByTagName('tbody')[0];
                tabelaRecargas.innerHTML = "";
                let valorTotal = 0;
                let quantidadeTotal = 0;

                data.forEach((row, index) => {
                    const newRow = tabelaRecargas.insertRow();
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
        alert('Selecione ambas as datas para a pesquisa avançada.');
    }
}

function togglePesquisaFormRecargas() {
    const pesquisaSimplesRecargas = document.getElementById('pesquisaSimplesRecargas');
    const pesquisaAvancadaRecargas = document.getElementById('pesquisaAvancadaRecargas');
    const tipoPesquisa = document.querySelector('input[name="tipoPesquisaRecargas"]:checked').value;

    if (tipoPesquisa === 'simples') {
        pesquisaSimplesRecargas.style.display = 'block';
        pesquisaAvancadaRecargas.style.display = 'none';
        dataSelecionadaAlteradaRecargas();
    } else {
        pesquisaSimplesRecargas.style.display = 'none';
        pesquisaAvancadaRecargas.style.display = 'block';
        dataSelecionadaAlteradaPesquisaAvancadaRecargas();
    }
}


function atualizarTabelaNPS() {
    const dataSelecionada = document.getElementById('dataSelecionadaNPS').value;
    const url = `/Classement_backend/nps/exibir_dados_nps.php?data=${dataSelecionada}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const tabelaNPS = document.getElementById('tabelaNPS').getElementsByTagName('tbody')[0];
            tabelaNPS.innerHTML = ""; // Limpa o conteúdo atual da tabela
            let quantidadeTotalNPS = 0;

            // Adiciona as novas linhas à tabela
            data.forEach((row, index) => {
                const newRow = tabelaNPS.insertRow();
                newRow.insertCell(0).textContent = (index + 1).toString() + "º";
                newRow.insertCell(1).textContent = row.operador;
                newRow.insertCell(2).textContent = row.nome_operador;

                const quantidade = parseInt(row.quantidade, 10);
                newRow.insertCell(3).textContent = quantidade;

                // Atualiza os totais
                quantidadeTotalNPS += quantidade;
            });
            // Atualiza a quantidade total no tfoot
            document.getElementById('qntdTotalNPS').textContent = quantidadeTotalNPS;
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
}

// Função para ser chamada quando a data é alterada
function dataSelecionadaAlteradaNPS() {
    atualizarTabelaNPS();
}

// Função para ser chamada quando a data é alterada
function dataSelecionadaAlteradaPesquisaAvancadaNPS() {
    pesquisaAvancadaNPS();
}

// Adiciona um ouvinte de evento para detectar a alteração no input
document.getElementById('dataSelecionadaNPS').addEventListener('change', dataSelecionadaAlteradaNPS);
document.getElementById('dataSelecionadaNPS1').addEventListener('change', dataSelecionadaAlteradaPesquisaAvancadaNPS);
document.getElementById('dataSelecionadaNPS2').addEventListener('change', dataSelecionadaAlteradaPesquisaAvancadaNPS);

function pesquisaAvancadaNPS() {
    const dataSelecionada1 = document.getElementById('dataSelecionadaNPS1').value;
    const dataSelecionada2 = document.getElementById('dataSelecionadaNPS2').value;

    if (dataSelecionada2) {
        const url = `/Classement_backend/nps/pesquisa_avancada_nps.php?data_inicial=${dataSelecionada1}&data_final=${dataSelecionada2}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const tabelaNPS = document.getElementById('tabelaNPS').getElementsByTagName('tbody')[0];
                tabelaNPS.innerHTML = "";
                let quantidadeTotalNPS = 0;

                data.forEach((row, index) => {
                    const newRow = tabelaNPS.insertRow();
                    newRow.insertCell(0).textContent = (index + 1).toString() + "º";
                    newRow.insertCell(1).textContent = row.operador;
                    newRow.insertCell(2).textContent = row.nome_operador;

                    const quantidade = parseInt(row.quantidade, 10);
                    newRow.insertCell(3).textContent = quantidade;
    
                    // Atualiza os totais
                    quantidadeTotalNPS += quantidade;
                });
                // Atualiza a quantidade total no tfoot
                document.getElementById('qntdTotalNPS').textContent = quantidadeTotalNPS;
            })
            .catch(error => console.error('Erro ao buscar dados:', error));
    } else {
        alert('Selecione ambas as datas para a pesquisa avançada.');
    }
}

function togglePesquisaFormNPS() {
    const pesquisaSimplesNPS = document.getElementById('pesquisaSimplesNPS');
    const pesquisaAvancadaNPS = document.getElementById('pesquisaAvancadaNPS');
    const tipoPesquisa = document.querySelector('input[name="tipoPesquisaNPS"]:checked').value;

    if (tipoPesquisa === 'simples') {
        pesquisaSimplesNPS.style.display = 'block';
        pesquisaAvancadaNPS.style.display = 'none';
        dataSelecionadaAlteradaNPS();
    } else {
        pesquisaSimplesNPS.style.display = 'none';
        pesquisaAvancadaNPS.style.display = 'block';
        dataSelecionadaAlteradaPesquisaAvancadaNPS();
    }
}
