<?php
include("../conexao.php");
// Coletar dados do formulário
$dataEscolhida = $_POST['dataEscolhida'];
$quantidadePix = $_POST['quantidadePix'];
$valorPix = $_POST['valorPix'];
$quantidadeRecargas = $_POST['quantidadeRecargas'];
$valorRecargas = $_POST['valorRecargas'];
$quantidadeNPS = $_POST['quantidadeNPS'];

// Preparar a instrução SQL com placeholders
$sql = "INSERT INTO classement_metas (data, quantidade_pix, valor_transacao, quantidade_recargas, valor_recargas, quantidade_pesquisas) VALUES (?, ?, ?, ?, ?, ?)";

// Preparar a declaração
$stmt = $conexao->prepare($sql);

// Bind dos parâmetros
$stmt->bind_param("ssssss", $dataEscolhida, $quantidadePix, $valorPix, $quantidadeRecargas, $valorRecargas, $quantidadeNPS);

// Executar a declaração
if ($stmt->execute()) {
    echo "Dados inseridos com sucesso!";
} else {
    echo "Erro na inserção de dados: " . $stmt->error;
}

// Fechar a declaração e a conexão
$stmt->close();
$conexao->close();
