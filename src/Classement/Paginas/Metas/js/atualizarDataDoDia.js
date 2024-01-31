document.addEventListener('DOMContentLoaded', () => {
    // Obtemos o elemento de input 'dataSelecionada'
    const data_escolhida = document.getElementById('dataEscolhida');

    // Criamos uma nova data representando a data atual
    const dataAtual = new Date();

    // Formatamos a data no formato YYYY-MM-DD
    const dataFormatada = `${dataAtual.getFullYear()}-${(dataAtual.getMonth() + 1).toString().padStart(2, '0')}-${dataAtual.getDate().toString().padStart(2, '0')}`;

    // Definimos o valor do input como a data formatada
    data_escolhida.value = dataFormatada;
});