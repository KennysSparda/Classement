// Verifique se o usuário está logado
const usuario = JSON.parse(localStorage.getItem('usuario'));

if (usuario) {
  window.location.href = "/Classement/Paginas/HomepageADM";
}

function Acessar() {
    // Obtém os valores dos campos Matricula e Senha
    const matricula = document.getElementById('matricula_input').value;
    const senha = document.getElementById('senha_input').value;
  
    // Crie um objeto FormData para enviar os dados
    const formData = new FormData();
    formData.append('matricula', matricula);
    formData.append('senha', senha);
  
    // Crie uma instância do objeto XMLHttpRequest
    const xhr = new XMLHttpRequest();
  
    // Configure a solicitação POST para o arquivo PHP
    xhr.open('POST', '/Classement_backend/ManterUsuarios/verificar_login.php', true);
  
    // Defina uma função de retorno de chamada para lidar com a resposta do servidor
    xhr.onload = function () {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
  
        // Verifique o nível de acesso na resposta do servidor
        if (response.usuario) {
          // Armazene os dados do usuário no localStorage
          localStorage.setItem('usuario', JSON.stringify(response.usuario));
          console.log(response.usuario)
          // Redirecione com base na resposta encaminhar_para
          window.location.href = "/Classement/Paginas/HomepageADM";

        } else {
          alert('Usuário não autorizado');
        }
      } else {
        alert('Erro ao acessar o servidor');
      }
    };
  
    // Envie a solicitação com os dados do formulário
    xhr.send(formData);
}
  

