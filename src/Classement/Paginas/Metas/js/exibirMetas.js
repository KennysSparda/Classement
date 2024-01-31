function exibirMetas(metas) {
  const container = document.createElement('div');
  container.classList.add('container');
  container.style.alignItems = 'start';

  metas.forEach(meta => {
      const box = document.createElement('div');
      box.style.display = 'grid';

      const titulo = document.createElement('h2');
      titulo.textContent = `${meta.data}`;
 
      const paragrafoQuantidadePix = document.createElement('p');
      paragrafoQuantidadePix.textContent = `Quantidade Pix: ${meta.quantidade_pix}`;

      const paragrafoValorTransacao = document.createElement('p');
      paragrafoValorTransacao.textContent = `Valor Transação: ${meta.valor_transacao}`;

      const paragrafoQuantidadeRecargas = document.createElement('p');
      paragrafoQuantidadeRecargas.textContent = `Quantidade Recargas: ${meta.quantidade_recargas}`;

      const paragrafoValorRecargas = document.createElement('p');
      paragrafoValorRecargas.textContent = `Valor Recargas: ${meta.valor_recargas}`;

      const paragrafoQuantidadePesquisas = document.createElement('p');
      paragrafoQuantidadePesquisas.textContent = `Quantidade Pesquisas: ${meta.quantidade_pesquisas}`;

      box.appendChild(titulo);
      box.appendChild(paragrafoQuantidadePix);
      box.appendChild(paragrafoValorTransacao);
      box.appendChild(paragrafoQuantidadeRecargas);
      box.appendChild(paragrafoValorRecargas);
      box.appendChild(paragrafoQuantidadePesquisas);

      container.appendChild(box);
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
