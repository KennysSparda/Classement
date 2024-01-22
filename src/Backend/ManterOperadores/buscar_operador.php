<?php
// Inclua o arquivo de conexão com o banco de dados
require_once('../conexao.php');

// Verifique se a solicitação é POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Receba a matrícula do usuário a ser buscado
    $matricula = $_POST['matricula'];

    // Valide os dados, você deve adicionar mais validações conforme necessário

    // Consulta SQL para buscar o usuário com a matrícula especificada
    $sql = "SELECT matricula, nome FROM classement_operadores WHERE matricula = ?";
    $stmt = mysqli_prepare($conexao, $sql);

    if ($stmt) {
        mysqli_stmt_bind_param($stmt, 'i', $matricula);
        if (mysqli_stmt_execute($stmt)) {
            // Obtém os resultados da consulta
            mysqli_stmt_bind_result($stmt, $matricula, $nome);

            if (mysqli_stmt_fetch($stmt)) {
                $response = array('status' => 'success', 'usuario' => ['matricula' => $matricula, 'nome' => $nome]);
                echo json_encode($response);
            } else {
                $response = array('status' => 'error', 'message' => 'Usuário não encontrado');
                echo json_encode($response);
            }
        } else {
            $response = array('status' => 'error', 'message' => 'Erro ao buscar usuário');
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
