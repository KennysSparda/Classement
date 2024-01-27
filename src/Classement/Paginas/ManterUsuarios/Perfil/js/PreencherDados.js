function preencherFormulario() {
    // Coleta os dados do formulário
    let usuario_classement = JSON.parse(localStorage.getItem('usuario_classement'))
    var matricula = usuario_classement.matricula

    var formData = new FormData();
    formData.append("matricula", matricula);
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/Classement_backend/ManterUsuarios/buscar_usuario.php", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var userData = JSON.parse(xhr.responseText);

                if (userData.status === 'success') {
                    // Preencha os campos de edição com os dados do usuário encontrado
                    document.getElementById("input_matricula").value = userData.usuario.matricula;
                    document.getElementById("input_nome").value = userData.usuario.nome;
                    const selectElement = document.getElementById("input_setor");
                    for (let i = 0; i < selectElement.options.length; i++) {
                        if (selectElement.options[i].value == userData.usuario.id_setor) {
                            selectElement.options[i].selected = true;
                            break;
                        }
                    }
                } else {
                    alert("Usuário não encontrado.");
                }
            } else {
                alert("Erro ao buscar usuário.");
            }
        }
    };
    xhr.send(formData);
};

// Chama a função para carregar o usuario ao carregar a página
document.addEventListener("DOMContentLoaded", async function() {
    preencherFormulario();
});