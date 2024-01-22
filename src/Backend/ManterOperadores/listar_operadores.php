<?php
// Inclua o arquivo de conexão com o banco de dados
require_once('../conexao.php');

// Consulta SQL para buscar todos os usuários
$sql = "SELECT matricula, nome FROM classement_operadores";
$resultado = mysqli_query($conexao, $sql);

$operadores = array();

if ($resultado) {
    while ($row = mysqli_fetch_assoc($resultado)) {
        $operadores[] = $row;
    }
    mysqli_free_result($resultado);
    mysqli_close($conexao);

    $response = array('status' => 'success', 'operadores' => $operadores);
    echo json_encode($response);
} else {
    $response = array('status' => 'error', 'message' => 'Erro ao buscar operadores');
    echo json_encode($response);
}
?>
