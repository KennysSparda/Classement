// JavaScript para zerarDadosDoDiaNPS()
function zerarDadosDoDiaNPS() {
    var dataEscolhida = document.getElementById('data_escolhida').value;


    option = confirm(`Confirma exclusão da pesquisa NPS do colaborador atual referente a data ${dataEscolhida}?`)

    if(option) {
        var matriculaOperador = document.getElementById("input_matricula").value;

        // Fazer uma requisição AJAX para o servidor PHP
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/Classement_backend/nps/zerar_dados_do_dia_nps.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Manipular a resposta do servidor (se necessário)
                console.log(xhr.responseText);
            }
        };

        // Enviar os dados para o servidor (corrigido para concatenar os dados em uma única string)
        xhr.send("matricula_operador=" + matriculaOperador + "&data_escolhida=" + dataEscolhida);
    }
}
