document.getElementById("formCriarUsuario").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita recarregar a página no envio padrão do formulário

    // Coleta os dados do formulário
    var matricula = document.getElementById("input_matricula").value;
    var nome = document.getElementById("input_nome").value;
    var senha = document.getElementById("input_senha").value;

    // Realize as verificações
    if (isValidInput(matricula, nome, senha)) {
        sendFormData(matricula, nome, senha);
    } else {
        displayErrorMessage("Verifique os dados inseridos: Matrícula deve ter 4 dígitos e Senha com pelo menos 8 caracteres.");
    }
});

function sendFormData(matricula, nome, senha) {
    var formData = new FormData();
    formData.append("matricula", matricula);
    formData.append("nome", nome);
    formData.append("senha", senha);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/Classement_backend/ManterOperadores/criar_operador.php", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                handleResponse(JSON.parse(xhr.responseText));
                clearForm();
            } else {
                handleResponse({ status: 'error' });
            }
        }
    };
    xhr.send(formData);
}

function handleResponse(response) {
    if (response.status === 'success') {
        displayErrorMessage(""); // Limpe a mensagem de erro
        alert("Operador criado com sucesso!");
    } else {
        displayErrorMessage("Erro ao criar Operador.");
    }
}

function displayErrorMessage(message) {
    var errorDiv = document.getElementById("error-message");
    errorDiv.textContent = message;
}

function clearForm() {
    // Limpa os dados do formulário
    document.getElementById("input_matricula").value = "";
    document.getElementById("input_nome").value = "";
    document.getElementById("input_senha").value = "";
}