<?php
	$usuario = "nome_usuario_filial";
	$senha = "senha_do_usuario_filial";
	$dbname = "nome_do_banco_filial";
	
	//Criar a conexao
	$conexao = mysqli_connect("localhost", $usuario, $senha, $dbname);
	
	
	if(!$conexao){
		die("Falha na conexao: " . mysqli_connect_error());
	}else{
		//echo "Conexao realizada com sucesso";
	}	
	
?>