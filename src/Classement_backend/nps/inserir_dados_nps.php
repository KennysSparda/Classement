<?php
include("../conexao.php");

// Função para inserir dados na tabela classement_pesquisas_diarias
function inserirPesquisaNPS($matricula, $dataEscolhida, $quantidadeNPS) {
    global $conexao;

    $sql = "INSERT INTO classement_pesquisas_diarias (matricula_operador, data, quantidade_pesquisas) VALUES ('$matricula', '$dataEscolhida', '$quantidadeNPS')";
    
    if ($conexao->query($sql) === TRUE) {
        echo json_encode(array("status" => "success"));
    } else {
        echo json_encode(array("status" => "error", "message" => "Erro na inserção da pesquisa NPS: " . $conexao->error));
    }
}

// Obtém os dados do formulário
$matricula = $_POST['matricula'];
$dataEscolhida = $_POST['dataEscolhida'];
$quantidadeNPS = $_POST['quantidadeNPS'];

// Chama a função para inserir os dados na tabela
inserirPesquisaNPS($matricula, $dataEscolhida, $quantidadeNPS);

// Fecha a conexão
$conexao->close();
?>