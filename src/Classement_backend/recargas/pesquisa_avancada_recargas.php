<?php
include("../conexao.php");

// Lógica para obter dados filtrados por intervalo de datas
if (isset($_GET['data_inicial']) && isset($_GET['data_final'])) {
    $dataInicial = $_GET['data_inicial'];
    $dataFinal = $_GET['data_final'];

    // Consulta SQL para obter os dados filtrados por intervalo de datas
    $sql = "SELECT
                op.nome AS nome_operador,
                td.matricula_operador AS operador,
                SUM(td.valor_recargas) AS valor,
                SUM(td.quantidade_recargas) AS transacoes
            FROM
                classement_recargas_diarias td
            INNER JOIN
                classement_operadores op ON td.matricula_operador = op.matricula
            WHERE
                DATE(td.data) BETWEEN '$dataInicial' AND '$dataFinal'
            GROUP BY
                nome_operador
            ORDER BY
                transacoes DESC";

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
    echo "Datas não especificadas.";
}
?>
