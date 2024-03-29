document.getElementById("formCriarOperador").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita recarregar a página no envio padrão do formulário

    // Coleta os dados do formulário
    var matricula = document.getElementById("input_matricula").value;
    var nome = document.getElementById("input_nome").value;
    

    // Realize as verificações
    if  (matricula != null && matricula.length == 4 && nome != null){
        sendFormData(matricula, nome);
    } else {
        displayErrorMessage("Verifique os dados inseridos: Matrícula deve ter 4 dígitos.");
    }
});

function sendFormData(matricula, nome) {
    var formData = new FormData();
    formData.append("matricula", matricula);
    formData.append("nome", nome);
    

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
}