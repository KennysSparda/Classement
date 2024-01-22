document.addEventListener('DOMContentLoaded', function () {
    const listaUsuarios = document.getElementById('lista-usuarios');
    const loadingMessage = document.getElementById('loading-message');
    
    // Função para buscar e listar os usuários
    function listarUsuarios() {
        loadingMessage.textContent = 'Carregando usuários...'; // Mensagem de carregamento
        
        fetch('/Classement_backend/ManterUsuarios/listar_usuarios.php')
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    const usuarios = data.usuarios;
                    listaUsuarios.innerHTML = ''; // Limpa a lista existente
                    
                    // Adiciona os usuários à lista como cards
                    usuarios.forEach(usuario => {
                        const card = document.createElement('div');
                        const matricula = document.createElement('p');
                        const nome = document.createElement('p');
                        card.classList.add('user-card');
                        matricula.textContent = usuario.matricula;
                        nome.textContent = usuario.nome;
                        const divBotoes = document.createElement('div');
                        const linkEditar = document.createElement('a');
                        const linkExcluir = document.createElement('a');
                        divBotoes.classList.add("divBotoes");
                        
                        linkExcluir.innerHTML = "Excluir usuário";
                        linkExcluir.href = `./ExcluirUsuarios/index.html?matricula=${usuario.matricula}`;
                        linkExcluir.title = "Excluir Usuário";

                        linkEditar.innerHTML = "Editar usuário";
                        linkEditar.href = `./EditarUsuarios/index.html?matricula=${usuario.matricula}`;
                        linkEditar.title = "Editar Usuário";
                        divBotoes.appendChild(linkEditar);
                        divBotoes.appendChild(linkExcluir);

                        card.appendChild(matricula);
                        card.appendChild(nome);
                        card.appendChild(divBotoes);
                        listaUsuarios.appendChild(card);
                    });

                    loadingMessage.style.display = 'none'; // Oculta a mensagem de carregamento
                } else {
                    loadingMessage.textContent = 'Erro ao buscar usuários.';
                }
            })
            .catch(error => {
                console.error('Erro na requisição:', error);
                loadingMessage.textContent = 'Erro na requisição.';
            });
    }

    // Chama a função para listar os usuários quando a página carregar
    listarUsuarios();
    
});
