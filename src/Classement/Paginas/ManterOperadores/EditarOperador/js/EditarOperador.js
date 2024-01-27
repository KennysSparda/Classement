function getDocumentIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('matricula');
}

function preencherFormulario() {
    // Coleta os dados do formulário
    var matricula = getDocumentIdFromURL();
    
    var formData = new FormData();
    formData.append("matricula", matricula);
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/Classement_backend/ManterOperadores/buscar_operador.php", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var userData = JSON.parse(xhr.responseText);

                if (userData.status === 'success') {
                    // Preencha os campos de edição com os dados do usuário encontrado
                    document.getElementById("input_matricula").value = userData.usuario.matricula;
                    document.getElementById("input_nome").value = userData.usuario.nome;
                } else {
                    displayErrorMessage("Operador não encontrado.");
                }
            } else {
                displayErrorMessage("Erro ao buscar operador.");
            }
        }
    };
    xhr.send(formData);
};

document.getElementById("formEditarOperador").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita recarregar a página no envio padrão do formulário

    // Coleta os dados do formulário
    var matricula = document.getElementById("input_matricula").value;
    var nome = document.getElementById("input_nome").value;

    sendFormData(matricula,  nome);
});

function sendFormData(matricula, nome) {
    var formData = new FormData();
    formData.append("matricula", matricula);
    formData.append("nome", nome);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/Classement_backend/ManterOperadores/editar_operador.php", true);
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
        alert("Operador editado com sucesso!");
    } else {
        displayErrorMessage("Erro ao editar operador.");
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

// Chama a função para carregar o usuario ao carregar a página
document.addEventListener("DOMContentLoaded", async function() {
    preencherFormulario();
});