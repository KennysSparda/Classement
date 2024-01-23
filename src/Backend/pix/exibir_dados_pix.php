<?php
include("../conexao.php");
// Lógica para obter dados filtrados pela data
if (isset($_GET['data'])) {
    $dataFiltrada = $_GET['data'];

    // Consulta SQL para obter os dados filtrados pela data
    $sql = "SELECT
            td.matricula_operador AS operador,
            op.nome AS nome_operador,
            td.valor_transacao AS valor,
            td.quantidade_pix AS transacoes
        FROM
            classement_transacoes_diarias td
        INNER JOIN
            classement_operadores op ON td.matricula_operador = op.matricula
        WHERE
            DATE(td.data) = '$dataFiltrada'
        ORDER BY
        td.quantidade_pix DESC";;

    $result = $conexao->query($sql);

    // Verifica se a consulta foi bem-sucedida
    if ($result) {
        $dadosFiltrados = array();

        // Transforma os resultados em um array associativo
        while ($row = $result->fetch_assoc()) {
            $dadosFiltrados[] = $row;
        }

        // Fecha a conexão
        $conexao->close();

        // Retorna os dados como JSON
        header('Content-Type: application/json');
        echo json_encode($dadosFiltrados);
        exit();
    } else {
        echo "Erro na consulta: " . $conexao->error;
    }
} else {
    echo "Data não especificada.";
}
?>