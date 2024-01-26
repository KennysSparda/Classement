<?php
// Função para inserir dados no banco de dados
function inserirDadosNoBanco($dados, $dataEscolhida) {
    include("../conexao.php");

    // Inserção na tabela classement_transacoes_diarias
    foreach ($dados as $matricula => $info) {
        $quantidaderecargas = $info['csv_quantidade'];
        $valorTransacao = str_replace(',', '.', str_replace('.', '', $info['csv_valor'])); // Remover vírgulas para o formato decimal


        $sql = "INSERT INTO classement_recargas_diarias (matricula_operador, data, quantidade_recargas, valor_recargas) VALUES ('$matricula', '$dataEscolhida', '$quantidaderecargas', '$valorTransacao')";
        if ($conexao->query($sql) !== TRUE) {
            echo "Erro na inserção da classement_transacoes_diarias: " . $conexao->error;
        }
    }

    // Fecha a conexão
    $conexao->close();
}
?>
