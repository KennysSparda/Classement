// Verifique se o usuário está logado
const usuario = JSON.parse(localStorage.getItem('usuario'));

if (usuario && usuario.nivel_acesso !== null && usuario.nivel_acesso !== 0) {
  // O usuário está logado e tem um nível de acesso válido

} else {
  // O usuário não está logado ou tem um nível de acesso inválido
  // Redirecionar para uma página de erro ou página de login
  window.location.href = '/PainelCPD/src/Paginas/AcessoNegado/'; // ou página de login
}
