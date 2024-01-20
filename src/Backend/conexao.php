<?php
	$usuario = "filial837";
	$senha = "senhafilial";
	$dbname = "atacadao";
	
	//Criar a conexao
	$conexao = mysqli_connect("localhost", $usuario, $senha, $dbname);
	
	
	if(!$conexao){
		die("Falha na conexao: " . mysqli_connect_error());
	}else{
		//echo "Conexao realizada com sucesso";
	}	
	
?>