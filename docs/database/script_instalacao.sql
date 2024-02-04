-- Esse Script deve ser colado na linha de comando do MySql
CREATE TABLE IF NOT EXISTS classement_operadores IF NOT EXISTS (
    matricula INT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS classement_usuarios_admin (
    matricula INT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS classement_transacoes_diarias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    matricula_operador INT,
    data DATE,
    quantidade_pix INT,
    valor_transacao DECIMAL(10,2),
    FOREIGN KEY (matricula_operador) REFERENCES classement_operadores(matricula)
);

CREATE TABLE IF NOT EXISTS  classement_recargas_diarias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    matricula_operador INT,
    data DATE,
    quantidade_recargas INT,
    valor_recargas DECIMAL(10,2),
    FOREIGN KEY (matricula_operador) REFERENCES classement_operadores(matricula)
);

CREATE TABLE IF NOT EXISTS classement_pesquisas_diarias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    matricula_operador INT,
    data DATE,
    quantidade_pesquisas INT,
    FOREIGN KEY (matricula_operador) REFERENCES classement_operadores(matricula)
);

CREATE TABLE IF NOT EXISTS classement_metas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    data DATE,
    quantidade_pix INT,
    valor_transacao DECIMAL(10,2),
    quantidade_recargas INT,
    valor_recargas DECIMAL(10,2),
    quantidade_pesquisas INT
);

INSERT INTO classement_usuarios_admin (matricula, nome, senha) VALUES (1234, 'admin', 'ed2b1f468c5f915f3f1cf75d7068baae');