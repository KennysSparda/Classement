<?php
include("../conexao.php");

// Verifica se o formulário foi submetido
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verifica se as variáveis 'dataEscolhida' e 'matricula' estão presentes no array $_POST
    if (isset($_POST['dataEscolhida']) && isset($_POST['matricula'])) {
        // Obtém os dados do formulário
        $dataEscolhida = $_POST['dataEscolhida'];
        $matricula = $_POST['matricula'];

        // Utiliza prepared statement com placeholder e bind value
        $sql = $conexao->prepare("DELETE FROM classement_pesquisas_diarias WHERE data = ? AND matricula_operador = ?");
        $sql->bind_param("si", $dataEscolhida, $matricula);
        $sql->execute();

        if ($sql->error) {
            http_response_code(500); // Define o código de resposta HTTP para 500 (Erro interno do servidor)
            echo "Erro na exclusão da classement_pesquisas_diarias: " . $sql->error;
        } else {
            echo "Exclusão realizada com sucesso.";
        }

        // Fecha a conexão
        $conexao->close();
    } else {
        http_response_code(400); // Define o código de resposta HTTP para 400 (Solicitação inválida)
        echo "Erro: As variáveis 'dataEscolhida' e 'matricula' não estão presentes no formulário.";
    }
} else {
    http_response_code(405); // Define o código de resposta HTTP para 405 (Método não permitido)
    echo "Erro: Método não permitido. Utilize o método POST.";
}
?>
