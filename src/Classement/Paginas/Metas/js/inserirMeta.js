function inserirMeta() {
    event.preventDefault(); // Impede o envio do formulário padrão

    // Coleta os dados do formulário
    const dataEscolhida = document.getElementById('dataEscolhida').value;
    const quantidadePix = document.getElementById('quantidade_pix').value;
    const valorPix = document.getElementById('valor_pix').value;
    const quantidadeRecargas = document.getElementById('quantidade_recargas').value;
    const valorRecargas = document.getElementById('valor_recargas').value;
    const quantidadeNPS = document.getElementById('quantidade_nps').value;

    // Cria um objeto FormData e adiciona os dados
    const formData = new FormData();
    formData.append('dataEscolhida', dataEscolhida);
    formData.append('quantidadePix', quantidadePix);
    formData.append('valorPix', valorPix);
    formData.append('quantidadeRecargas', quantidadeRecargas);
    formData.append('valorRecargas', valorRecargas);
    formData.append('quantidadeNPS', quantidadeNPS);

    // Realiza a requisição AJAX para enviar os dados para o servidor PHP
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/Classement_backend/metas/inserir_meta.php', true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Tratamento da resposta, se necessário
            alert(xhr.responseText);
        }
    };

    // Envio dos dados para o servidor PHP
    xhr.send(formData);
    obterMetasDoPHP()
}
