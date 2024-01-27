<?php
include("../conexao.php");

// Verifica se o formulário foi submetido
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verifica se a variável 'dataEscolhida' está presente no array $_POST
    if (isset($_POST['dataEscolhida'])) {
        // Obtém a data do formulário
        $dataEscolhida = $_POST['dataEscolhida'];

        // Utiliza prepared statement com placeholder e bind value
        $sql = $conexao->prepare("DELETE FROM classement_recargas_diarias WHERE data = ?");
        $sql->bind_param("s", $dataEscolhida);
        $sql->execute();

        if ($sql->error) {
            echo "Erro na exclusão da classement_recargas_diarias: " . $sql->error;
        } else {
            echo "Exclusão realizada com sucesso.";
        }

        // Fecha a conexão
        $conexao->close();
    } else {
        echo "Erro: A variável 'dataEscolhida' não está presente no formulário.";
    }
}
?>
