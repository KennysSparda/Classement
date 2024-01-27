// Variáveis globais
let inatividadeTimeout; // Identificador do temporizador
const TEMPO_INATIVIDADE = 10 * 60 * 1000; // 15 minutos em milissegundos
// const TEMPO_INATIVIDADE = 5 * 1000; // 2 segundos em milissegundos (TESTES)

document.addEventListener('DOMContentLoaded', function () {
  // Verifique se o usuário está logado
  const usuario_classement = JSON.parse(localStorage.getItem('usuario_classement'));
  const navbar_wellcome = document.getElementById("navbar_wellcome");

  if (usuario_classement || window.location.href != '/Classement' || window.location.href != '/Classement/Paginas/HomepageADM/login.html') {
    if (window.location.href != 'https://srvsave837/Classement/') {
      navbar_wellcome.innerHTML = `Olá ${usuario_classement.nome}`
    }
    // O usuário está logado e tem um nível de acesso válido
  } else {
    // O usuário não está logado
    // Redirecionar para uma página de acesso negado
    window.location.href = '/Classement/Paginas/AcessoNegado/';
  }

  // Inicializa o temporizador quando a página é carregada
  reiniciarTemporizador();

  // Função chamada quando o usuário realiza alguma ação (por exemplo, clicar em um botão)
  function acaoDoUsuario() {
    // ... (seu código para lidar com ação do usuário)
    reiniciarTemporizador();
  }

  // Função para reiniciar o temporizador
  function reiniciarTemporizador() {
    // Limpa o temporizador anterior, se houver
    clearTimeout(inatividadeTimeout);

    // Define um novo temporizador para o tempo de inatividade
    inatividadeTimeout = setTimeout(function () {
        // Executa a função de logoff automático
        logoffAutomatico();
    }, TEMPO_INATIVIDADE);
  }

  // Função para logoff automático
  function logoffAutomatico() {
    // Limpe os dados do localStorage
    localStorage.removeItem('usuario_classement');

    // Redirecione para a página inicial
    window.location.href = '/Classement';
  }
});

function logoff() {
  localStorage.removeItem('usuario_classement');
}