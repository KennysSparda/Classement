<?php
// Arquivo de conexão com o banco de dados
require_once('../conexao.php');

// Verifique se a solicitação é POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Receba os dados do front-end
    $matricula = $_POST['matricula'];
    $senha = $_POST['senha'];
    $senha_hash = md5($senha);

    if (strlen($senha) >= 8) {
        $sql = "UPDATE classement_usuarios_admin SET senha = ? WHERE matricula = ?";
        $stmt = mysqli_prepare($conexao, $sql);

        if ($stmt) {
            mysqli_stmt_bind_param($stmt, 'si', $senha_hash, $matricula);
            if (mysqli_stmt_execute($stmt)) {
                $response = array('status' => 'success', 'message' => 'Senha atualizada com sucesso');
            } else {
                $response = array('status' => 'error', 'message' => 'Erro ao atualizar senha');
            }
            mysqli_stmt_close($stmt);
        } else {
            $response = array('status' => 'error', 'message' => 'Erro na preparação da declaração SQL');
        }
    } else {
        $response = array('status' => 'error', 'message' => 'Dados inválidos');
    }
} else {
    $response = array('status' => 'error', 'message' => 'Método não permitido');
}

// Feche a conexão com o banco de dados
mysqli_close($conexao);

// Converta a resposta em JSON e envie de volta para o JavaScript
header('Content-Type: application/json');
echo json_encode($response);
?>
