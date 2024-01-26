<?php
// Adicione isso ao início do arquivo
error_reporting(E_ALL);
ini_set('display_errors', 1);
include("./inserir_dados_recargas.php");

// Verifica se a variável 'dataEscolhida' está presente no array $_POST
if (isset($_POST['dataEscolhida'])) {
    // Obtém a data do formulário
    $dataEscolhida = $_POST['dataEscolhida'];
} else {
    echo "Erro: A variável 'dataEscolhida' não está presente no formulário.";
}

// Função para processar um arquivo CSV e armazenar os dados no array
function processarCSV($nomeCampo, &$dados) {
    if ($_FILES[$nomeCampo]['error'] == UPLOAD_ERR_OK && is_uploaded_file($_FILES[$nomeCampo]['tmp_name'])) {
        $caminho = $_FILES[$nomeCampo]['tmp_name'];
        $handle = fopen($caminho, 'r');

        // Pula a primeira linha (cabeçalho)
        $cabecalho = fgetcsv($handle, 1000, ';');

        // Processa as linhas do CSV
        while (($linha = fgetcsv($handle, 1000, ';')) !== false) {
            $operador = $linha[15]; // Considerando que o número do operador está na coluna 15
            $valor = str_replace(',', '.', str_replace(' ', '', $linha[12])); // Remove espaços e substitui vírgulas por pontos

            // Armazena os dados no array usando o número do operador como chave
            if (!isset($dados[$operador])) {
                $dados[$operador] = array('csv_quantidade' => 0, 'csv_valor' => 0);
            }

            $dados[$operador]['csv_quantidade']++;
            $dados[$operador]['csv_valor'] += floatval($valor);
        }

        fclose($handle);
        return true;
    } else {
        return false;
    }
}

// Verifique se o formulário foi enviado
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Array para armazenar os dados processados
    $dados = array();

    // Processa o arquivo CSV
    $csvProcessado = processarCSV('csv_recargas', $dados);

    // Verifica se o arquivo foi processado com sucesso
    if ($csvProcessado) {
        // Exibe os dados processados
        echo "<pre>";
        print_r($dados);
        echo "</pre>";
        inserirDadosNoBanco($dados, $dataEscolhida);
    } else {
        echo "Erro ao processar o arquivo CSV.";
    }
} else {
    // Se o formulário não foi enviado, redirecione para a página inicial ou exiba uma mensagem de erro
    header('Location: index.html');
    exit();
}
?>
