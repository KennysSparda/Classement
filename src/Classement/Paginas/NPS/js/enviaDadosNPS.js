// JavaScript para FormEnviarPesquisaNPS
document.getElementById("FormEnviarPesquisaNPS").addEventListener("submit", function (event) {
  event.preventDefault(); // Evitar o comportamento padrão do formulário
  var dataEscolhida = document.getElementById("data_escolhida").value;
  var matriculaOperador = document.getElementById("input_matricula").value;
  var quantidadePesquisas = document.getElementById("input_quantidade_NPS").value;

  // Fazer uma requisição AJAX para o servidor PHP
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/Classement_backend/nps/inserir_dados_nps.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
          // Manipular a resposta do servidor (se necessário)
          console.log(xhr.responseText);
      }
  };

  // Enviar os dados para o servidor
  xhr.send("data_escolhida=" + dataEscolhida + "&matricula_operador=" + matriculaOperador + "&quantidadePesquisas=" + quantidadePesquisas);
});
