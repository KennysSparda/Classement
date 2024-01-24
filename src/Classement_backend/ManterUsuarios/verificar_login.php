<?php
// Inclua o arquivo de conexão ao banco de dados
require_once('../conexao.php');

// Simule a autenticação (substitua com sua lógica de autenticação real)
$matricula = $_POST['matricula'];
$senha = $_POST['senha'];
$senha_hash = md5($senha);

// Execute a consulta SQL para obter os dados do usuário
$query = "SELECT matricula, nome FROM classement_usuarios_admin WHERE matricula = ? AND senha = ?";
$stmt = $conexao->prepare($query);
$stmt->bind_param("ss", $matricula, $senha_hash);
$stmt->execute();
$stmt->bind_result($matricula, $nome);

// Verifique se o usuário existe
if ($stmt->fetch()) {
    // Dados do usuário
    $usuario = array(
        'matricula' => $matricula,
        'nome' => $nome
    );

    // Crie um array de resposta
    $response = array(
        'usuario' => $usuario,
    );

    // Envie a resposta como JSON
    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    // Usuário não encontrado
    header('HTTP/1.1 401 Unauthorized');
    echo 'Usuário não autorizado';
}
?>
