function limparConteudo() {
  const container = document.querySelector('#exibirMetas');
  container.innerHTML = ''; // Isso remove todo o conteúdo dentro da div
}

function exibirMetas(metas) {
  limparConteudo();
  const container = document.createElement('div');
  container.classList.add('container');
  container.style.display = 'flex';
  container.style.flexWrap = 'wrap';

  metas.forEach((meta, index) => {
    const box = document.createElement('div');
    box.style.display = 'grid';
    box.style.marginRight = '20px'; // Espaçamento entre as colunas
    box.style.marginBottom = '20px'; // Espaçamento entre as linhas

    const titulo = document.createElement('h2');
    titulo.textContent = `${meta.data}`;

    const paragrafoQuantidadePix = document.createElement('p');
    paragrafoQuantidadePix.textContent = `Quantidade Pix: ${meta.quantidade_pix}`;

    const paragrafoValorTransacao = document.createElement('p');
    paragrafoValorTransacao.textContent = `Valor Pix: ${Number(meta.valor_transacao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;

    const paragrafoQuantidadeRecargas = document.createElement('p');
    paragrafoQuantidadeRecargas.textContent = `Quantidade Recargas: ${meta.quantidade_recargas}`;

    const paragrafoValorRecargas = document.createElement('p');
    paragrafoValorRecargas.textContent = `Valor Recargas: ${Number(meta.valor_recargas).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;

    const paragrafoQuantidadePesquisas = document.createElement('p');
    paragrafoQuantidadePesquisas.textContent = `Quantidade Pesquisas: ${meta.quantidade_pesquisas}`;

    const botaoExcluir = document.createElement('button');
    botaoExcluir.textContent = `Excluir`;
    botaoExcluir.style.backgroundColor = 'var(--botao-excluir)';
    botaoExcluir.onclick = () => excluirMeta(meta.data);

    box.appendChild(titulo);
    box.appendChild(paragrafoQuantidadePix);
    box.appendChild(paragrafoValorTransacao);
    box.appendChild(paragrafoQuantidadeRecargas);
    box.appendChild(paragrafoValorRecargas);
    box.appendChild(paragrafoQuantidadePesquisas);
    box.appendChild(botaoExcluir);

    container.appendChild(box);

    // Adicione uma nova linha após cada 5 colunas
    if ((index + 1) % 5 === 0) {
      container.appendChild(document.createElement('br'));
    }
  });

  // Adicione o container à sua seção HTML
  const section = document.querySelector('#exibirMetas'); // Substitua com o seletor correto
  section.appendChild(container);
}


function obterMetasDoPHP() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var metas = JSON.parse(this.responseText);

          // Chama a função para exibir metas na página
          exibirMetas(metas);
      }
  };

  // Substitua "seu_arquivo_php.php" pelo caminho do seu script PHP
  xhttp.open("GET", "/Classement_backend/metas/exibir_metas.php", true);
  xhttp.send();
}

// Chama a função para obter metas ao carregar a página
window.onload = function() {
  obterMetasDoPHP();
};
