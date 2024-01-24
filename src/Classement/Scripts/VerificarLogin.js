// Variáveis globais
let inatividadeTimeout; // Identificador do temporizador
const TEMPO_INATIVIDADE = 15 * 60 * 1000; // 15 minutos em milissegundos

document.addEventListener('DOMContentLoaded', function () {
  // Verifique se o usuário está logado
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const navbar_wellcome = document.getElementById("navbar_wellcome");

  if (usuario) {
    navbar_wellcome.innerHTML = `Olá ${usuario.nome}`
    // O usuário está logado e tem um nível de acesso válido
  } else {
    // O usuário não está logado ou tem um nível de acesso inválido
    // Redirecionar para uma página de erro ou página de login
    window.location.href = '/Classement/Paginas/AcessoNegado/';
  }

  // Inicializa o temporizador quando a página é carregada
  reiniciarTemporizador();

  // Adiciona eventos aos elementos relevantes nas páginas que exigem acesso elevado
  // ...

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
    localStorage.removeItem('usuario');

    // Redirecione para a página de login
    window.location.href = '/Classement/Paginas/HomepageADM/login.html';
  }
});
