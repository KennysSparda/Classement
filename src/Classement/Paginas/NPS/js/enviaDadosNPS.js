document.getElementById("formPesquisaNPS").addEventListener("submit", function(e) {
  e.preventDefault();

  // Coleta os dados do segundo formulário
  var matricula = document.getElementById("input_matricula").value;
  var dataEscolhida = document.getElementById("dataEscolhida").value;
  var quantidadeNPS = document.getElementById("input_quantidade_NPS").value;

  // Constrói a string com os dados do segundo formulário
  var dataPesquisaNPS = "matricula=" + encodeURIComponent(matricula) +
                        "&dataEscolhida=" + encodeURIComponent(dataEscolhida) +
                        "&quantidadeNPS=" + encodeURIComponent(quantidadeNPS);

  var xhrPesquisaNPS = new XMLHttpRequest();
  xhrPesquisaNPS.open("POST", "/Classement_backend/nps/inserir_dados_nps.php", true);
  xhrPesquisaNPS.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhrPesquisaNPS.onreadystatechange = function() {
    if (xhrPesquisaNPS.readyState === 4) {
      if (xhrPesquisaNPS.status === 200) {
        var response = JSON.parse(xhrPesquisaNPS.responseText);

        if (response.status === 'success') {
          // Feedback de sucesso ou redirecionamento, se necessário
          alert("Dados da pesquisa NPS inseridos com sucesso!");
        } else {
          alert("Erro ao inserir dados da pesquisa NPS.");
        }
      } else {
        alert("Erro na requisição para inserir dados da pesquisa NPS. Código de status: " + xhrPesquisaNPS.status);
      }
    }
  };

  // Envia a string com os dados do segundo formulário
  xhrPesquisaNPS.send(dataPesquisaNPS);
});