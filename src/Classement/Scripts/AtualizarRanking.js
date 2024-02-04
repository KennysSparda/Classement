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
            document.getElementById('valorTotalPix').textContent = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            // Atualiza a quantidade total no tfoot
            document.getElementById('qntdTotalPix').textContent = quantidadeTotal;
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
}

// Função para ser chamada quando a data é alterada
function dataSelecionadaAlteradaPix() {
    atualizarTabelaPix()
    atualizarMetasDiarias()
    atualizarRestantePix()
}

// Função para ser chamada quando a data é alterada
function dataSelecionadaAlteradaPesquisaAvancadaPix() {
    pesquisaAvancadaPix()
    atualizarMetasMensal()
    atualizarRestantePix()
}

// Adiciona um ouvinte de evento para detectar a alteração no input
document.getElementById('dataSelecionadaPix').addEventListener('change', dataSelecionadaAlteradaPix);
document.getElementById('dataSelecionadaPix1').addEventListener('change', dataSelecionadaAlteradaPesquisaAvancadaPix);
document.getElementById('dataSelecionadaPix2').addEventListener('change', dataSelecionadaAlteradaPesquisaAvancadaPix);

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
                document.getElementById('valorTotalPix').textContent = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                // Atualiza a quantidade total no tfoot
                document.getElementById('qntdTotalPix').textContent = quantidadeTotal;
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
            document.getElementById('valorTotalRecargas').textContent = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            // Atualiza a quantidade total no tfoot
            document.getElementById('qntdTotalRecargas').textContent = quantidadeTotal;
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
}

// Função para ser chamada quando a data é alterada
function dataSelecionadaAlteradaRecargas() {
    atualizarTabelaRecargas();
    atualizarMetasDiarias();
    atualizarRestanteRecargas()
}

// Função para ser chamada quando a data é alterada
function dataSelecionadaAlteradaPesquisaAvancadaRecargas() {
    pesquisaAvancadaRecargas();
    atualizarMetasMensal()
    atualizarRestanteRecargas();
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
                document.getElementById('valorTotalRecargas').textContent = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                // Atualiza a quantidade total no tfoot
                document.getElementById('qntdTotalRecargas').textContent = quantidadeTotal;
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
    atualizarMetasDiarias();
    atualizarRestanteNPS();
}

// Função para ser chamada quando a data é alterada
function dataSelecionadaAlteradaPesquisaAvancadaNPS() {
    pesquisaAvancadaNPS();
    atualizarMetasMensal()
    atualizarRestanteNPS();
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

function atualizarMetasMensal() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Converte a resposta JSON em um objeto JavaScript
            var data = JSON.parse(this.responseText);

            // Preenche os campos da tabela com os dados obtidos
            document.getElementById("valorMetaPix").innerHTML = Number(data.valor_transacao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || 0;
            document.getElementById("QuantidadeMetaPix").innerHTML = data.quantidade_pix || 0;
            document.getElementById("ValorMetaRecargas").innerHTML = Number(data.valor_recargas).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || 0;
            document.getElementById("QuantidadeMetaRecargas").innerHTML = data.quantidade_recargas || 0;
            document.getElementById("QuantidadeMetaNPS").innerHTML = data.quantidade_pesquisas || 0;
        }
    };

    // Substitua "seu_arquivo_php.php" pelo caminho do seu script PHP
    xhttp.open("GET", "/Classement_backend/metas/exibir_meta_atual.php", true);
    xhttp.send();
}

function atualizarMetasDiarias() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Converte a resposta JSON em um objeto JavaScript
            var data = JSON.parse(this.responseText);

            // Preenche os campos da tabela com os dados obtidos
            document.getElementById("valorMetaPix").innerHTML = Number(Math.ceil(data.valor_transacao/30)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || 0;
            document.getElementById("QuantidadeMetaPix").innerHTML = Math.ceil(data.quantidade_pix/30) || 0;
            document.getElementById("ValorMetaRecargas").innerHTML = Number(Math.ceil(data.valor_recargas/30)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || 0;
            document.getElementById("QuantidadeMetaRecargas").innerHTML = Math.ceil(data.quantidade_recargas/30) || 0;
            document.getElementById("QuantidadeMetaNPS").innerHTML = Math.ceil(data.quantidade_pesquisas/30) || 0;
        }
    };

    // Substitua "seu_arquivo_php.php" pelo caminho do seu script PHP
    xhttp.open("GET", "/Classement_backend/metas/exibir_meta_atual.php", true);
    xhttp.send();
}

function formatarFloat(valor) {
    return parseFloat(valor.replace(/[^\d,.-]/g, '').replace('.', '').replace(',', '.'))
}

function aguardaratualizarMetasMensal() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 500);
    });
}

async function atualizarRestantePix() {
    const valorTotalPix = document.getElementById('valorTotalPix')
    const quantidadeTotalPix = document.getElementById('qntdTotalPix')
    const valorMetaPix = document.getElementById('valorMetaPix')
    const quantidadeMetaPix = document.getElementById('QuantidadeMetaPix')
    const restanteValorPix = document.getElementById('restanteValorPix')
    const restanteQuantidadePix = document.getElementById('restanteQuantidadePix')
    
    await aguardaratualizarMetasMensal();

    let valorPixNumber = formatarFloat(valorTotalPix.innerHTML);
    let quantidadePixNumber = parseInt(quantidadeTotalPix.innerHTML.trim());
    let valorMetaPixNumber = formatarFloat(valorMetaPix.innerHTML);
    let quantidadeMetaPixNumber = parseInt(quantidadeMetaPix.innerHTML.trim());
    
    const resultadoSubtracao = valorMetaPixNumber - valorPixNumber;
    restanteValorPix.innerHTML = isNaN(resultadoSubtracao) ? 'R$ 0,00' : Number(resultadoSubtracao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
    restanteQuantidadePix.innerHTML = quantidadeMetaPixNumber - quantidadePixNumber || 0;
}

async function atualizarRestanteRecargas() {
    const valorTotalRecargas = document.getElementById('valorTotalRecargas')
    const quantidadeTotalRecargas = document.getElementById('qntdTotalRecargas')
    const valorMetaRecargas = document.getElementById('ValorMetaRecargas')
    const quantidadeMetaRecargas = document.getElementById('QuantidadeMetaRecargas')
    const restanteValorRecargas = document.getElementById('restanteValorRecargas')
    const restanteQuantidadeRecargas = document.getElementById('restanteQuantidadeRecargas')
    
    await aguardaratualizarMetasMensal();

    let valorRecargasNumber = formatarFloat(valorTotalRecargas.innerHTML);
    let quantidadeRecargasNumber = parseInt(quantidadeTotalRecargas.innerHTML.trim());
    let valorMetaRecargasNumber = formatarFloat(valorMetaRecargas.innerHTML);
    let quantidadeMetaRecargasNumber = parseInt(quantidadeMetaRecargas.innerHTML.trim());

    const resultadoSubtracao = valorMetaRecargasNumber - valorRecargasNumber;
    restanteValorRecargas.innerHTML = isNaN(resultadoSubtracao) ? 'R$ 0,00' : Number(resultadoSubtracao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
    restanteQuantidadeRecargas.innerHTML = quantidadeMetaRecargasNumber - quantidadeRecargasNumber || 0;
}

async function atualizarRestanteNPS() {
    const quantidadeTotalNPS = document.getElementById('qntdTotalNPS')
    const quantidadeMetaNPS = document.getElementById('QuantidadeMetaNPS')
    const restanteQuantidadeNPS = document.getElementById('restanteQuantidadeNPS')

    await aguardaratualizarMetasMensal();

    let quantidadeNPSNumber =  parseInt(quantidadeTotalNPS.innerHTML.trim());
    let quantidadeMetaNPSNumber = parseInt(quantidadeMetaNPS.innerHTML.trim());
    restanteQuantidadeNPS.innerHTML = quantidadeMetaNPSNumber - quantidadeNPSNumber || 0;
}

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
    atualizarTabelaRecargas();
    atualizarTabelaNPS();
});

// Chama a função ao carregar a página
window.onload = function() {
    atualizarMetasDiarias();
    atualizarRestantePix();
    atualizarRestanteRecargas();
    atualizarRestanteNPS();
};