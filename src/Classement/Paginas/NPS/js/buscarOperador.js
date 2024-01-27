const btnBuscar = document.getElementById('btn-buscar-operador');
const btnSalvar = document.getElementById('btn-salvar');

document.getElementById("formBuscarUsuario").addEventListener("submit", function(e) {
  e.preventDefault();

  // Coleta os dados do formulário
  var matricula = document.getElementById("input_matricula").value;
  
  // Constrói a string com os dados do formulário
  var data = "matricula=" + encodeURIComponent(matricula);
  
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/Classement_backend/ManterOperadores/buscar_operador.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var userData = JSON.parse(xhr.responseText);

        if (userData.status === 'success') {
          // Preencha os campos de edição com os dados do usuário encontrado
          document.getElementById("input_matricula").value = userData.usuario.matricula;
          document.getElementById("input_nome").value = userData.usuario.nome;
          btnBuscar.style.display = 'none'
          btnSalvar.style.display = 'block'
        } else {
            console.log("Operador não encontrado.");
        }
      } else {
          console.log("Erro ao buscar operador. Código de status: " + xhr.status);
      }
    }
  };

  // Envia a string com os dados do formulário
  xhr.send(data);
});