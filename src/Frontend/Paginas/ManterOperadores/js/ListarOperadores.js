document.addEventListener('DOMContentLoaded', function () {
    const listaOperadores = document.getElementById('lista-operadores');
    const loadingMessage = document.getElementById('loading-message');
    
    // Função para buscar e listar os Operadors
    function listarOperadores() {
        loadingMessage.textContent = 'Carregando Operadores...'; // Mensagem de carregamento
        
        fetch('/Classement_backend/ManterOperadores/listar_operadores.php')
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    const operadores = data.operadores;
                    listaOperadores.innerHTML = ''; // Limpa a lista existente
                    
                    // Adiciona os Operadors à lista como cards
                    operadores.forEach(operador => {
                        const card = document.createElement('div');
                        const matricula = document.createElement('p');
                        const nome = document.createElement('p');
                        card.classList.add('user-card');
                        matricula.textContent = operador.matricula;
                        nome.textContent = operador.nome;
                        const divBotoes = document.createElement('div');
                        const linkEditar = document.createElement('a');
                        const linkExcluir = document.createElement('a');
                        divBotoes.classList.add("divBotoes");
                        
                        linkExcluir.innerHTML = "Excluir Operador";
                        linkExcluir.href = `./Excluiroperadors/index.html?matricula=${operador.matricula}`;
                        linkExcluir.title = "Excluir Operador";

                        linkEditar.innerHTML = "Editar Operador";
                        linkEditar.href = `./Editaroperadors/index.html?matricula=${operador.matricula}`;
                        linkEditar.title = "Editar Operador";
                        divBotoes.appendChild(linkEditar);
                        divBotoes.appendChild(linkExcluir);

                        card.appendChild(matricula);
                        card.appendChild(nome);
                        card.appendChild(divBotoes);
                        listaOperadores.appendChild(card);
                    });

                    loadingMessage.style.display = 'none'; // Oculta a mensagem de carregamento
                } else {
                    loadingMessage.textContent = 'Erro ao buscar Operadors.';
                }
            })
            .catch(error => {
                console.error('Erro na requisição:', error);
                loadingMessage.textContent = 'Erro na requisição.';
            });
    }

    // Chama a função para listar os Operadors quando a página carregar
    listarOperadores();
    
});
