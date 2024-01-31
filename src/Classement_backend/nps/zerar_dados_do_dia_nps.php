<?php
include("../conexao.php");

// Obter a matrícula do operador da requisição POST
$matriculaOperador = $_POST['matricula_operador'];
$dataEscolhida = $_POST['data_escolhida'];

// Query para excluir dados do dia usando prepared statement
$sql = "DELETE FROM classement_pesquisas_diarias WHERE matricula_operador = ? AND data = ?";

$stmt = $conexao->prepare($sql);
$stmt->bind_param("is", $matriculaOperador, $dataEscolhida);

if ($stmt->execute()) {
    echo "Dados excluídos com sucesso!";
} else {
    echo "Erro ao excluir dados: " . $conexao->error;
}

$stmt->close();
$conexao->close();
?>
