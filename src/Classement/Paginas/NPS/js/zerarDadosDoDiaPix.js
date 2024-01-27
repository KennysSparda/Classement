function excluirDadosDoDia() {
    // Coleta os dados do formulário
    var matricula = document.getElementById("input_matricula").value;
    var dataEscolhida = document.getElementById("dataEscolhida").value;

    // Verifica se a matrícula e a data foram preenchidas
    if (matricula.trim() === "" || dataEscolhida.trim() === "") {
        alert("Preencha todos os campos.");
        return;
    }

    // Confirmação do usuário antes de excluir os dados
    var confirmacao = confirm("Tem certeza que deseja excluir os dados deste operador nesta data?");
    if (!confirmacao) {
        return;
    }

    // Cria um objeto FormData para enviar os dados
    var formData = new FormData();
    formData.append("matricula", matricula);
    formData.append("dataEscolhida", dataEscolhida);

    // Realiza a solicitação Ajax para o arquivo PHP
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/Classement_backend/nps/zerar_dados_do_dia_nps.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Exibe a resposta do servidor
                alert(xhr.responseText);
            } else {
                // Exibe mensagem de erro em caso de falha na requisição
                alert("Erro ao excluir dados do dia. Verifique o console para mais informações.");
                console.error(xhr.statusText);
            }
        }
    };
    xhr.send(formData);
}
