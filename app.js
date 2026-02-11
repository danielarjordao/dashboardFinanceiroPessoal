// Imports
import { validarFormulario } from './modules/validation.js';
import {
    initValidacoes,
    initCategorias,
    capturarDadosFormulario,
    limparFormulario,
    getBotao,
    renderizarTransacoes,
} from './modules/userIterface.js';
import { init, adicionarTransacao, getTransacoes } from './modules/state.js';

// Inicialização
init(); // Carregar transações do localStorage
initCategorias();
initValidacoes();

// EVENTO DO BOTÃO
const botao = getBotao();
botao.addEventListener('click', (e) => {
    e.preventDefault();

	// 1) Capturar inputs do formulário.
	// 2) Escutar clique do botão.
    const dados = capturarDadosFormulario();

	// 3) Validar dados.
	// 4) Criar objeto transação.
    const resultado = validarFormulario(dados);
    if (!resultado.valido) {
        console.error('Formulário inválido:', resultado.erros);
        return;
    }
    console.log('Transação válida:', dados);

    // 5) Atualizar estado.
    adicionarTransacao(dados);

    // 6) Re-renderizar UI.
    const transacoes = getTransacoes();
    renderizarTransacoes(transacoes);

    // 7) Limpar formulário.
    limparFormulario();
});
