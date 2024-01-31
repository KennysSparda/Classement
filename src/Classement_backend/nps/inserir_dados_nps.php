<?php
include("../conexao.php");

// Obter os dados da requisição POST
$dataEscolhida = $_POST['data_escolhida'];
$matricula = $_POST['matricula_operador'];
$quantidadePesquisas = $_POST['quantidadePesquisas'];

// Query para inserir dados na tabela
$sql = "INSERT INTO classement_pesquisas_diarias (matricula_operador, data, quantidade_pesquisas) 
        VALUES ($matricula, '$dataEscolhida', $quantidadePesquisas)";

if ($conexao->query($sql) === TRUE) {
    echo "Dados salvos com sucesso!";
} else {
    echo "Erro ao salvar dados: " . $conexao->error;
}

$conexao->close();
?>