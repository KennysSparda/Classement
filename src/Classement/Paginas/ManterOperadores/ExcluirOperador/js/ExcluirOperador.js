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
                    displayErrorMessage("Usuário não encontrado.");
                }
            } else {
                displayErrorMessage("Erro ao buscar usuário.");
            }
        }
    };
    xhr.send(formData);
};

function handleResponse(response) {
    if (response.status === 'success') {
        // Exclusão bem-sucedida
        alert("Usuário excluído com sucesso!");
        // Limpe os campos
        document.getElementById("input_matricula").value = "";
        document.getElementById("input_nome").value = "";
        displayErrorMessage(""); // Limpe a mensagem de erro
    } else {
        // Exibindo uma mensagem de erro
        displayErrorMessage("Erro ao excluir usuário.");
    }
}

function displayErrorMessage(message) {
    var errorDiv = document.getElementById("error-message");
    errorDiv.textContent = message;
}

function excluirUsuario() {
    // Coleta a matrícula do usuário a ser excluído
    var matricula = document.getElementById("input_matricula").value

    // Crie um novo FormData para enviar a matrícula
    var formData = new FormData();
    formData.append("matricula", matricula);

    // Crie uma requisição para excluir o usuário
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/Classement_backend/ManterOperadores/excluir_operador.php", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                handleResponse(JSON.parse(xhr.responseText));
            } else {
                handleResponse({ status: 'error', message: 'Erro ao excluir usuário.' });
            }
        }
    };
    xhr.send(formData);
}

// Chama a função para carregar o usuario ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    preencherFormulario();
});
