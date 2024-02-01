document.getElementById("formPix").addEventListener("submit", function(e) {
    e.preventDefault(); // Evita a submissão normal do formulário

    // Use AJAX para enviar os dados do formulário para o backend
    var formData = new FormData(this);

    fetch(this.action, {
        method: this.method,
        body: formData
    })
    .then(function(response) {
        if (response.ok) {
            // Exiba uma mensagem usando um alert
            alert("A solicitação foi processada com sucesso!");
            // Limpe o formulário se necessário
            document.getElementById("formPix").reset();
        } else {
            // Exiba uma mensagem de erro usando um alert
            alert("Houve um problema ao processar a solicitação.");
        }
    })
    .catch(function(error) {
        // Exiba uma mensagem de erro em caso de falha na requisição
        alert("Houve um problema ao processar a solicitação.");
        console.log(error)
    });
});