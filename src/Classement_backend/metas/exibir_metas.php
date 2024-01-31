<?php
include('../conexao.php');
// Consulta SQL para obter todas as metas
$sql = "SELECT data, quantidade_pix, valor_transacao, quantidade_recargas, valor_recargas, quantidade_pesquisas FROM classement_metas";

// Prepara a consulta
$stmt = $conexao->prepare($sql);

// Executa a consulta
$stmt->execute();

// Obtém os resultados
$result = $stmt->get_result();

// Converte os resultados em um array associativo
$metas = $result->fetch_all(MYSQLI_ASSOC);

// Libera os recursos
$stmt->close();
$conexao->close();

// Retorna os resultados como JSON para o JavaScript
echo json_encode($metas);
?>
