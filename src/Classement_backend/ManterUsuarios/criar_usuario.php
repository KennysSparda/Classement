<?php
// Inclua o arquivo de conexão com o banco de dados
include('../conexao.php');

// Verifique se a requisição é do tipo POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Receba os dados do formulário
    $matricula = $_POST['matricula'];
    $nome = $_POST['nome'];
    $senha = $_POST['senha'];
    $senha_hash = md5($senha);

    // Execute a consulta SQL para inserir os dados na tabela de usuários
    $sql = "INSERT INTO classement_usuarios_admin (matricula, nome, senha) VALUES (?, ?, ?)";
    $stmt = $conexao->prepare($sql);
    $stmt->bind_param("iss", $matricula, $nome, $senha_hash);

    if ($stmt->execute()) {
        // Inserção bem-sucedida
        $response = ['status' => 'success'];
    } else {
        // Erro na inserção
        $response = ['status' => 'error', 'message' => $conexao->error];
    }

    $stmt->close();
} else {
    // Requisição não é do tipo POST
    $response = ['status' => 'error', 'message' => 'Requisição inválida.'];
}

// Converta a resposta em JSON e envie de volta para o JavaScript
header('Content-Type: application/json');
echo json_encode($response);
?>