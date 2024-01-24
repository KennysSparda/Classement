
function isValidInput(matricula, nome, senha) {
    return matricula.length === 4 &&  nome !== null && senha.length >= 8;
}