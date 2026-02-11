/*
OBJETIVO:
Atualizar a interface sempre que o estado mudar.

PENSAMENTO:

1) Selecionar o container da lista.
2) Limpar o conteúdo antes de renderizar novamente.
3) Para cada transação:
   - Criar elemento HTML dinamicamente.
   - Inserir no DOM.
4) Atualizar os cards com os valores calculados.

REFLEXÃO:
- Por que limpar antes de renderizar?
- O que acontece se não limpar?

DESAFIO:
Como aplicar classes diferentes para receita e despesa?
*/

import {
    validarDescricao,
    validarValor,
    validarTipo,
    validarCategoria,
    validarData,
    attachValidation,
    verificarFormularioCompleto
} from './validation.js';

// Elementos do formulário
const form = document.querySelector('.nova-transacao');
const inputData = document.getElementById('data');
const inputDescricao = document.getElementById('descricao');
const inputValor = document.getElementById('quantidade');
const inputTipo = document.getElementById('tipo-transacao');
const inputCategoria = document.getElementById('categoria');
const botao = document.querySelector('.adiciona-historia');

// Elementos para exibir erros de validação no formulário
const errorData = form.querySelector('.data-form .error');
const errorDescricao = form.querySelector('.description-form .error');
const errorValor = form.querySelector('.qtd-container .error');
const errorTipo = form.querySelector('.tipo-transacao-container .error');
const errorCategoria = form.querySelector('.categoria-container .error');

const allInputs = [inputData, inputDescricao, inputValor, inputTipo, inputCategoria];
const allErrors = [errorData, errorDescricao, errorValor, errorTipo, errorCategoria];

// Lista de visualização das transações
const listaTransacoes = document.querySelector('.lista-transacoes');

// GERENCIAMENTO DO FORMULÁRIO

// Limpa o formulário e reseta estados de erro
export function limparFormulario() {
    inputData.value = '';
    inputDescricao.value = '';
    inputValor.value = '';
    inputTipo.value = '';
    inputCategoria.value = '';

    allErrors.forEach(error => error.textContent = '');
    allInputs.forEach(input => input.classList.remove('input-error'));

    botao.disabled = true;
}

// Preenche o select de categorias com opções definidas
export function initCategorias() {
    const categorias = [
        { valor: 'salario', texto: 'Salário' },
        { valor: 'investimentos', texto: 'Investimentos' },
        { valor: 'freelance', texto: 'Freelance' },
        { valor: 'lazer', texto: 'Lazer' },
        { valor: 'alimentacao', texto: 'Alimentação' },
        { valor: 'moradia', texto: 'Moradia' },
        { valor: 'transporte', texto: 'Transporte' },
        { valor: 'saude', texto: 'Saúde' },
        { valor: 'educacao', texto: 'Educação' },
        { valor: 'outros', texto: 'Outros' }
    ];

    // Limpar opções existentes
    inputCategoria.innerHTML = '';

    // Adicionar opção padrão desabilitada
    const optionDefault = document.createElement('option');
    optionDefault.value = '';
    optionDefault.textContent = 'Selecione uma categoria';
    optionDefault.disabled = true;
    optionDefault.selected = true;
    inputCategoria.appendChild(optionDefault);

    // Adicionar cada categoria
    categorias.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.valor;
        option.textContent = cat.texto;
        inputCategoria.appendChild(option);
    });
}


// Inicializa validações em tempo real e controle do botão
export function initValidacoes() {
    attachValidation(inputData, validarData, errorData);
    attachValidation(inputDescricao, validarDescricao, errorDescricao);
    attachValidation(inputValor, validarValor, errorValor);
    attachValidation(inputTipo, validarTipo, errorTipo);
    attachValidation(inputCategoria, validarCategoria, errorCategoria);

    allInputs.forEach(input => {
        input.addEventListener('input', atualizarEstadoBotao);
        input.addEventListener('blur', atualizarEstadoBotao);
    });

    botao.disabled = true;
}

// Atualiza estado do botão com base na validação do formulário
// Habilita o botão apenas se o formulário estiver completo e sem erros
function atualizarEstadoBotao() {
    const formularioValido = verificarFormularioCompleto(allInputs, allErrors);
    botao.disabled = !formularioValido;
}

// Captura dados do formulário e retorna como objeto para o app.js ter acesso
export function capturarDadosFormulario() {
    return {
        data: inputData.value,
        descricao: inputDescricao.value,
        valor: parseFloat(inputValor.value),
        tipo: inputTipo.value,
        categoria: inputCategoria.value
    };
}

// Retornar referência do botão para o app.js para evitar duplicação de seletores
export function getBotao() {
    return botao;
}

// TODO: Renderizar lista de transações
export function renderizarTransacoes(transacoes) {
}

// TODO: 4) Atualizar os cards com os valores calculados.
export function atualizarCards(balanco, receitas, despesas) {
    // implementar
}
