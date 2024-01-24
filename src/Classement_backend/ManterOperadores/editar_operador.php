<?php
// Arquivo de conexão com o banco de dados
require_once('../conexao.php');

// Verifique se a solicitação é POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Receba os dados do front-end
    $matricula = $_POST['matricula'];
    $nome = $_POST['nome'];

    if (strlen($matricula) === 4) {
        $sql = "UPDATE classement_operadores SET nome = ? WHERE matricula = ?";
        $stmt = mysqli_prepare($conexao, $sql);

        if ($stmt) {
            mysqli_stmt_bind_param($stmt, 'si', $nome, $matricula);
            if (mysqli_stmt_execute($stmt)) {
                $response = array('status' => 'success', 'message' => 'Operador atualizado com sucesso');
            } else {
                $response = array('status' => 'error', 'message' => 'Erro ao atualizar Operador');
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

mysqli_close($conexao);

// Converta a resposta em JSON e envia de volta para o front
header('Content-Type: application/json');
echo json_encode($response);
?>
