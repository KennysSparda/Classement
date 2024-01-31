"---[ O comando abaixo insere o usuario admin para primeiro acesso com senha 12341234, lembre-se de excluí-lo porteriormente! ]---"

INSERT INTO classement_usuarios_admin (matricula, nome, senha) VALUES (1234, 'admin', 'ed2b1f468c5f915f3f1cf75d7068baae');

"---[ O comando abaixo é um exemplo de como resetar a senha de um usuario para 12341234 ]---"

UPDATE classement_usuarios_admin SET senha = 'ed2b1f468c5f915f3f1cf75d7068baae' WHERE (matricula) = 1234;