<?php
// Inclua o arquivo de conexão com o banco de dados
require_once('../conexao.php');

// Consulta SQL para buscar todos os usuários
$sql = "SELECT matricula, nome FROM classement_usuarios_admin";
$resultado = mysqli_query($conexao, $sql);

$usuarios = array();

if ($resultado) {
    while ($row = mysqli_fetch_assoc($resultado)) {
        $usuarios[] = $row;
    }
    mysqli_free_result($resultado);
    mysqli_close($conexao);

    $response = array('status' => 'success', 'usuarios' => $usuarios);
    echo json_encode($response);
} else {
    $response = array('status' => 'error', 'message' => 'Erro ao buscar usuários');
    echo json_encode($response);
}
?>
