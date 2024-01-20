<?php

// Inclua o arquivo de configuração com as credenciais
include 'conexao.php';

$matricula; // Substitua com a matrícula desejada
$nome; // Substitua com o nome desejado

$sql = "INSERT INTO classement_operadores (matricula, nome) VALUES ($matricula, '$nome')";

if ($conexao->query($sql) === TRUE) {
    echo "Novo operador inserido com sucesso.";
} else {
    echo "Erro ao inserir operador: " . $conexao->error;
}

$conexao->close();
?>
