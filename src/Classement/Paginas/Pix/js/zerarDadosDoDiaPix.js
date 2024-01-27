function excluirDadosDoDia() {
    
    // Obtenha o valor da data selecionada
    var dataEscolhida = document.getElementById("dataEscolhida").value;
    
    option = confirm(`Confirma exclusão da planílha PIX atual referente a data ${dataEscolhida}?`)

    if(option) {

        // Crie um novo FormData para enviar a data
        var formData = new FormData();
        formData.append("dataEscolhida", dataEscolhida);

        // Crie uma requisição para excluir os dados do dia
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/Classement_backend/pix/zerar_dados_do_dia_pix.php", true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        // Tente fazer o parse da resposta como JSON
                        var respostaJSON = JSON.parse(xhr.responseText);
                    } catch (e) {
                        // Se houver um erro no parse, exiba a resposta como texto simples
                        // console.log(xhr.responseText);
                    }
                } else {
                    alert({ status: 'error', message: 'Erro ao excluir dados.' });
                }
            }
        };
        xhr.send(formData);
    }
}
