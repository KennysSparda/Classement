<?php
include("../conexao.php");

// Obter os dados da requisição POST
$dataEscolhida = $_POST['dataEscolhida'];

// Query para inserir dados na tabela
$sql = "DELETE FROM classement_metas WHERE data = '$dataEscolhida'";

if ($conexao->query($sql) === TRUE) {
    echo "Meta zerada no dia " + $dataEscolhida + " com sucesso!";
} else {
    echo "Erro ao inserir meta: " . $conexao->error;
}

$conexao->close();
?>
