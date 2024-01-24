CREATE TABLE classement_operadores (
    matricula INT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE classement_usuarios_admin (
    matricula INT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE classement_transacoes_diarias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    matricula_operador INT,
    data DATE,
    quantidade_pix INT,
    valor_transacao DECIMAL(10,2),
    FOREIGN KEY (matricula_operador) REFERENCES classement_operadores(matricula)
);