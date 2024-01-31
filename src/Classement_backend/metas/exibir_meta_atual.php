<?php
include('../conexao.php');
// Conecte ao seu banco de dados aqui

// Execute a query SQL
$sql = "SELECT quantidade_pix as quantidade_pix, 
               valor_transacao as valor_transacao,
               quantidade_recargas as quantidade_recargas, 
               valor_recargas as valor_recargas,
               quantidade_pesquisas as quantidade_pesquisas
        FROM classement_metas
        ORDER BY data DESC
        LIMIT 1";

$result = mysqli_query($conexao, $sql);

// Verifique se a consulta foi bem-sucedida
if ($result) {
    // Converta os resultados em um array associativo
    $data = mysqli_fetch_assoc($result);

    // Libere os recursos do resultado
    mysqli_free_result($result);

    // Retorne os resultados em formato JSON
    echo json_encode($data);
} else {
    // Se a consulta falhar, retorne um JSON com erro
    echo json_encode(array('error' => 'Erro na consulta SQL.'));
}

// Feche a conexão com o banco de dados aqui

?>
