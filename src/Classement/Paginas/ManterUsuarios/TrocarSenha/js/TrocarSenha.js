document.getElementById("formTrocarSenha").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita recarregar a página no envio padrão do formulário

    let usuario_classement = JSON.parse(localStorage.getItem('usuario_classement'))
    // Coleta os dados do formulário
    var matricula = usuario_classement.matricula
    var senha = document.getElementById("input_senha").value;
    var confirmacao_senha = document.getElementById("input_confirmacao_senha").value;
    // Realize as verificações
    if (senha.length >= 8 && senha === confirmacao_senha) {
        sendFormData(matricula, senha);
    } else {
        displayErrorMessage("Verifique os dados inseridos: Senha menor que 8 caracteres ou confirmação de senha não confere");
    }
});

function sendFormData(matricula, senha) {
    var formData = new FormData();
    formData.append("matricula", matricula);
    formData.append("senha", senha);

    var xhr = new XMLHttpRequest();
    console.log(formData);
    xhr.open("POST", "/Classement_backend/ManterUsuarios/trocar_senha.php", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                handleResponse(JSON.parse(xhr.responseText));
            } else {
                handleResponse({ status: 'error' });
            }
        }
    };
    xhr.send(formData);
}

function handleResponse(response) {
    if (response.status === 'success') {
        // Limpa a mensagem de erro
        displayErrorMessage(""); 
        clearForm();
        // Informa que o usuário foi editado com sucesso
        alert("Senha alterada!");
    } else {
        displayErrorMessage("Erro ao alterar senha.");
    }
}

function displayErrorMessage(message) {
    var errorDiv = document.getElementById("error-message");
    errorDiv.textContent = message;
}

function clearForm() {
    // Limpa os dados do formulário
    document.getElementById("input_senha").value = "";
}
