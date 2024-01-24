function preencherFormulario() {
    // Coleta os dados do formulário
    let usuario = JSON.parse(localStorage.getItem('usuario'))
    var matricula = usuario.matricula

    var formData = new FormData();
    formData.append("matricula", matricula);
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/PainelCPD/src/Backend/ManterUsuarios/buscar_usuario.php", true);
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
                    document.getElementById("input_acesso").value = userData.usuario.nivel_acesso;
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

// Função para buscar os setores do servidor PHP
function carregarSetores() {
    fetch('/PainelCPD/src/Backend/ManterSetores/obter_setores.php')
    .then(response => response.json())
    .then(data => {
        const selectElement = document.getElementById("input_setor");
        data.forEach(setor => {
            const option = document.createElement("option");
            option.text = setor.nome;
            option.value = setor.id_setor;
            selectElement.appendChild(option);
        });
    })
    .catch(error => console.error('Erro ao buscar setores:', error));
}

// Chama a função para carregar o usuario ao carregar a página
document.addEventListener("DOMContentLoaded", async function() {
    await carregarSetores();
    preencherFormulario();
});