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

CREATE TABLE classement_recargas_diarias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    matricula_operador INT,
    data DATE,
    quantidade_recargas INT,
    valor_recargas DECIMAL(10,2),
    FOREIGN KEY (matricula_operador) REFERENCES classement_operadores(matricula)
);

CREATE TABLE classement_pesquisas_diarias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    matricula_operador INT,
    data DATE,
    quantidade_pesquisas INT,
    FOREIGN KEY (matricula_operador) REFERENCES classement_operadores(matricula)
);

CREATE TABLE classement_metas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    data DATE,
    quantidade_pix INT,
    valor_transacao DECIMAL(10,2),
    quantidade_recargas INT,
    valor_recargas DECIMAL(10,2),
    quantidade_pesquisas INT,
);

