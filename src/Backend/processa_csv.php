<?php
// Inclua o arquivo de configuração com as credenciais
include 'conexao.php';

// Processa o arquivo CSV
if ($_FILES["csv_file"]["error"] == 0) {
    $file = $_FILES["csv_file"]["tmp_name"];

    // Lê o arquivo CSV
    $csvData = array_map('str_getcsv', file($file));

    // Prepara a consulta de inserção
    $insertQuery = "INSERT INTO classement_transacoes_diarias (matricula_operador, data, quantidade_pix) VALUES ";

    // Itera sobre os dados e constrói a consulta de inserção
    foreach ($csvData as $row) {
        $matricula = $conexao->real_escape_string($row[0]); // Assumindo que a matrícula está na primeira coluna
        $quantidadePix = $conexao->real_escape_string($row[1]); // Assumindo que a quantidade de pix está na segunda coluna

        // Busca o nome do operador na tabela 'classement_operadores'
        $nomeQuery = "SELECT nome FROM classement_operadores WHERE matricula = ?";
        $stmt = $conexao->prepare($nomeQuery);
        $stmt->bind_param('i', $matricula);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $nome = $conexao->real_escape_string($row['nome']);

            // Adiciona os valores à consulta de inserção
            $insertQuery .= "('$matricula', CURDATE(), $quantidadePix), ";
        } else {
            echo "Matrícula $matricula não encontrada na tabela 'classement_operadores'.";
        }
    }

    // Remove a vírgula extra no final da consulta
    $insertQuery = rtrim($insertQuery, ", ");

    // Executa a consulta
    if ($conexao->query($insertQuery) === TRUE) {
        echo "Dados inseridos com sucesso.";
    } else {
        echo "Erro ao inserir dados: " . $conexao->error;
    }
} else {
    echo "Erro ao fazer upload do arquivo.";
}

// Fecha a conexão
$conexao->close();
?>