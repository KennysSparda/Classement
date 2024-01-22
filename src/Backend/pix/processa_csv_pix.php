<?php
// Inclua o arquivo de configuração com as credenciais
include '../conexao.php';

// Função para ler um arquivo CSV e retornar um array associativo
function lerCSV($file) {
    $csvData = array_map('str_getcsv', file($file));
    $header = array_shift($csvData); // Remove a primeira linha (cabeçalho)
    $result = array();

    foreach ($csvData as $row) {
        $result[] = array_combine($header, $row);
    }

    return $result;
}

// Função para inserir dados no banco de dados
function inserirDadosNoBanco($conexao, $dados) {
    if (empty($dados)) {
        echo "Nenhum dado para inserir.";
        return;
    }

    // Prepara a consulta de inserção
    $insertQuery = "INSERT INTO classement_transacoes_diarias (matricula_operador, data, quantidade_pix, valor_transacao) VALUES ";

    // Utiliza uma instrução preparada para a inserção
    $insertQuery .= "(?, CURDATE(), ?, ?), ";
    $stmt = $conexao->prepare(rtrim($insertQuery, ', '));

    // Verifica se a preparação da instrução foi bem-sucedida
    if ($stmt === false) {
        echo "Erro na preparação da instrução: " . $conexao->error;
        return;
    }

    // Liga os parâmetros
    $stmt->bind_param('sid', $matricula, $quantidadePix, $valorTransacao);

    foreach ($dados as $matricula => $info) {
        $quantidadePix = $info['quantidade_pix'] ?? 0; // Se não houver quantidade, assume 0
        $valorTransacao = $info['valor_transacao'] ?? 0; // Se não houver valor, assume 0

        // Atribui os valores e executa a instrução
        $matricula = $conexao->real_escape_string($matricula);
        $stmt->execute();

        // Verifica se a execução foi bem-sucedida
        if ($stmt->affected_rows === -1) {
            echo "Erro ao inserir dados: " . $stmt->error;
        }
    }

    // Fecha a instrução preparada
    $stmt->close();
    echo "Dados inseridos com sucesso.";
}

// Processa os arquivos CSV de quantidade e valor
$fileQuantidade = $_FILES["csv_quantidade"]["tmp_name"];
$fileValor = $_FILES["csv_valor"]["tmp_name"];

$dadosQuantidade = lerCSV($fileQuantidade);
$dadosValor = lerCSV($fileValor);

// Agrupa os dados por matrícula
$dadosAgrupados = array();

foreach ($dadosQuantidade as $row) {
    $matricula = $conexao->real_escape_string($row['Operador']);
    $dadosAgrupados[$matricula]['quantidade_pix'] = $conexao->real_escape_string($row['Quantidade']);
}

foreach ($dadosValor as $row) {
    $matricula = $conexao->real_escape_string($row['Operador']);
    $dadosAgrupados[$matricula]['valor_transacao'] = $conexao->real_escape_string($row['Total']);
}

// Chama a função para inserir os dados no banco
inserirDadosNoBanco($conexao, $dadosAgrupados);

// Fecha a conexão
$conexao->close();
?>