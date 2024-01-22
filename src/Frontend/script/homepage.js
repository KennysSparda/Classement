// Função para fazer a requisição AJAX e atualizar a tabela
function atualizarTabelaPix() {
  fetch('/Classement_backend/pix/obterTabelaTransacoesPix.php')
      .then(response => response.json())
      .then(data => {
          const tabelaPix = document.getElementById('tabelaPix').getElementsByTagName('tbody')[0];
          tabelaPix.innerHTML = ""; // Limpa o conteúdo atual da tabela

          // Adiciona as novas linhas à tabela
          data.forEach(row => {
              const newRow = tabelaPix.insertRow();
              newRow.insertCell(0).textContent = row.operador;
              newRow.insertCell(1).textContent = row.valor;
              newRow.insertCell(2).textContent = row.transacoes;
          });
      })
      .catch(error => console.error('Erro ao buscar dados:', error));
}

// Chamada da função após o carregamento da página
document.addEventListener('DOMContentLoaded', () => {
    atualizarTabelaPix();
});

// Funções dos botões

function toggleMenu() {
    alert('Menu clicado');
}