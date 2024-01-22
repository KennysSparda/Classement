// // Verifique se o usuário está logado
// const usuario = JSON.parse(localStorage.getItem('usuario'));
// if (usuario && usuario.nivel_acesso !== null && usuario.nivel_acesso !== 0) {
//   // O usuário está logado e tem um nível de acesso válido
//   if (usuario.nivel_acesso === 1) {
//     // Redirecionar para a página comum (nível de acesso 1)
//     window.location.href = '/PainelCPD/src/Paginas/Homepage/';
//   } else if (usuario.nivel_acesso === 2) {
//     // Redirecionar para a página ADM (nível de acesso 2)
//     window.location.href = '/PainelCPD/src/Paginas/HomepageADM/';
//   }
// } else {
//   // O usuário não está logado ou tem um nível de acesso inválido
//   // Redirecionar para uma página de erro ou página de login
//   window.location.href = '/PainelCPD/src/Paginas/AcessoNegado/';
// }
