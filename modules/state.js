import { salvar, carregar } from './storage.js';

// Array em memória (estado da aplicação)
let transacoes = [];

// 1) Carregar as transações salvas quando o sistema iniciar.
export function init() {
    transacoes = carregar();
    console.log('Estado inicializado:', transacoes);
}

/*
2) Criar função para:
- Retornar lista atual.
- Adicionar nova transação.

3) Sempre que alterar o estado:
   - Atualizar o localStorage.
*/

// Retornar a lista atual de transações
export function getTransacoes() {
    return transacoes;
}

// Adicionar nova transação
export function adicionarTransacao(novaTransacao) {
    // Adicionar ID único baseado em timestamp
    const transacaoComId = {
        id: Date.now(),
        ...novaTransacao
    };

    // Adicionar ao array em memória
    transacoes.push(transacaoComId);

    // Sincronizar com localStorage
    salvar(transacoes);

    // Exibir no console
    console.log('Transação adicionada:', transacaoComId);
}

// Limpar todas as transações (para teste)
export function limparTodas() {
    transacoes = [];
    salvar(transacoes);
    console.log('Todas as transações foram removidas');
}

