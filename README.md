# Classement - Sistema de Ranking de Operadores e Acompanhamento de Metas

Bem-vindo ao Classement, um sistema especializado em ranking de operadores e monitoramento de metas, rastreando e exibindo estatísticas diárias relacionadas a transações, recargas, pesquisas, e outros dados relevantes.

## Visão Geral do Projeto

O Classement é um sistema de classificação que enfoca o desempenho diário de operadores, oferecendo insights valiosos por meio de rankings e acompanhamento de metas. O projeto inclui um frontend desenvolvido em HTML, CSS e JS, interagindo com um backend em PHP. O banco de dados armazena informações cruciais sobre transações diárias, recargas diárias, pesquisas diárias, operadores, usuários administradores e metas.

## Estrutura do Projeto

### **Classement_frontend:**

Contém o frontend do projeto.

#### Páginas

1. **Página de Login Administrador:**
   - Responsável pelo acesso de administradores ao sistema.

2. **Página Inicial:**
   - Apresenta uma visão geral das estatísticas e funcionalidades principais.

3. **Página Inicial Administrador:**
   - Apresenta as operações de gerenciamento do portal para os usuários administradores.

4. **Ranking Pix:**
   - Exibe um ranking com base em estatísticas relacionadas a transações Pix.

5. **Manter Dados Pix:**
   - Permite a administração e inserção de dados relacionados a transações Pix.

6. **Ranking Recargas:**
   - Apresenta um ranking relacionado a recargas realizadas.

7. **Manter Dados Recargas:**
   - Permite a administração e inserção de dados relacionados a recargas.

8. **Manter Dados NPS:**
   - Oferece funcionalidades para administração e inserção de dados relacionados ao Net Promoter Score (NPS).

9. **Manter Metas:**
   - Permite a visualização das metas anteriores e inserção das novas metas estabelecidas.

### **Classement_backend:**

Contém o backend do projeto.

#### Módulos

1. **Módulo da Página de Login Administrador:**
   - Gerencia o processo de autenticação para administradores.

2. **Módulo de Dados Pix:**
   - Manipula dados relacionados a transações Pix.

3. **Módulo de Dados Recargas:**
   - Lida com dados relativos a recargas.

4. **Módulo de Dados NPS:**
   - Gerencia dados das pesquisas NPS.

5. **Módulo de Metas:**
   - Responsável por funcionalidades relacionadas ao acompanhamento de metas.

#### Funcionalidades Comuns

- **Verificação de Login:**
  - Garante a autenticidade e segurança do login no sistema.

- **Processamento de CSV e Inserção no Banco de Dados:**
  - Recebe e processa arquivos CSV, inserindo os dados relevantes no banco de dados.

- **Recebimento de Ranking Pix com Coluna Quantidade em Ordem Decrescente Ranking Recargas em ordem Crescente:**
  - Envia rankings ordenados por quantidade para exibição no frontend.

Para mais detalhes técnicos, consulte a [Documentação Completa](/docs/Documentação_Classement.docx).

## Configuração do Ambiente

1. Clone o repositório.
2. Solicite para a equipe de Suporte Linux a configuração do servidor SAVE para processar PHP e o módulo do PHP para interagir com MySql (Normalmente já configurado pela equipe Suporte Linux).
3. Acesse o banco MySql da sua filial.
4. Copie todo o conteúdo do arquivo [script_instalacao.sql](/docs/database/script_instalacao.sql) e cole na linha de comando do MySql para a criação das tabelas e do usuário admin. OBS: Usuario Admin: 1234, Senha Admin: 12341234
5. Copie as duas pastas de dentro de [src]: [Classement] e [Classement_backend] para a pasta [portal](srvsaveFFF/portal/)
6. Altere o arquivo [conexao.php](srvsaveFFF/portal/Classement_backend/conexao.php) para os dados de sua Filial.

## Instruções de Uso

1. Abra o link "/srvsaveFFF/Classement/" em um navegador. Onde "FFF" será o número da sua filial.
2. Crie todos os operadores de caixa ativos no ultimo mês.
3. Alimente as planilhas com os CSV's gerados a partir do Sitef. (Confira o [manual_do_usuario](/docs/Manual_v1.0.1.pdf) para mais detalhes)
4. Utilize as páginas para visualizar estatísticas e administrar operadores, usuários administradores e metas.

## Instruções de Atualização

1. Clone o repositório.
2. Copie para área de trabalho o arquivo [conexao.php](/Classement_backend/conexao.php).
3. Copie as duas pastas de dentro de [src]: [Classement] e [Classement_backend] para a pasta [portal](srvsaveFFF/portal/) Vai perguntar se deseja Substituir então confirme.
4. Copie o arquivo [conexao.php] da área de trabalho para dentro de (/Classement_backend/conexao.php).
