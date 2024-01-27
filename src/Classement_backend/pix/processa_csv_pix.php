<?php
// Adicione isso ao início do arquivo
error_reporting(E_ALL);
ini_set('display_errors', 1);
include("./inserir_dados_pix.php");

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
            $operador = $linha[0];
            $valor = $linha[1];
            // Armazena os dados no array usando a matrícula como chave
            $dados[$operador][$nomeCampo] = $valor;
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

    // Processa os arquivos CSV
    $csvQuantidadeProcessado = processarCSV('csv_quantidade', $dados);
    $csvValorProcessado = processarCSV('csv_valor', $dados);

    // Verifica se ambos os arquivos foram processados com sucesso
    if ($csvQuantidadeProcessado && $csvValorProcessado) {
        // Exibe os dados processados
        inserirDadosNoBanco($dados, $dataEscolhida);
        // Agora você pode manipular os dados conforme necessário
    } else {
        echo "Erro ao processar os arquivos CSV.";
    }
} else {
    // Se o formulário não foi enviado, redirecione para a página inicial ou exiba uma mensagem de erro
    header('Location: index.html');
    exit();
}
?>
