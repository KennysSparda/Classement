<?php
// Inclua o arquivo de conexão com o banco de dados
require_once('../conexao.php');

// Verifique se a solicitação é POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Receba o ID do usuário a ser excluído
    $matricula = $_POST['matricula'];

    // Valide os dados, você deve adicionar mais validações conforme necessário

    // Consulta SQL para excluir o usuário com o ID especificado
    $sql = "DELETE FROM classement_usuarios_admin WHERE matricula = ?";
    $stmt = mysqli_prepare($conexao, $sql);

    if ($stmt) {
        mysqli_stmt_bind_param($stmt, 'i', $matricula);
        if (mysqli_stmt_execute($stmt)) {
            $response = array('status' => 'success', 'message' => 'Usuário excluído com sucesso');
            echo json_encode($response);
        } else {
            $response = array('status' => 'error', 'message' => 'Erro ao excluir usuário');
            echo json_encode($response);
        }
        mysqli_stmt_close($stmt);
    } else {
        $response = array('status' => 'error', 'message' => 'Erro na preparação da declaração SQL');
        echo json_encode($response);
    }
} else {
    $response = array('status' => 'error', 'message' => 'Método não permitido');
    echo json_encode($response);
}

// Feche a conexão com o banco de dados
mysqli_close($conexao);
?>