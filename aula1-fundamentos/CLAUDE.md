# aula1-fundamentos

## O que é este projeto

Campo de treino da Aula 1 (Fundamentos) da Especialização em IA da PDA.
Projeto Node pequeno com funções utilitárias em `src/` (`validaCpf`, `formataPreco`, `fetchUsuario`) e especificação em `tests/`.

## Stack

- Node.js 20+ (JavaScript moderno)
- Módulos ES Modules (`"type": "module"` no `package.json`)
- Runner de testes nativo do Node (`node --test` com `node:assert/strict`)

## Comandos

- Rodar todos os testes: `npm test` (executa `node --test`)
- Rodar os testes em modo watch: `npm run test:watch` (executa `node --test --watch`)

## Regras

- Os arquivos em `tests/` são a especificação. **Nunca edite arquivos em `tests/`** para fazê-los passar.
- Sempre execute `npm test` antes de declarar uma tarefa como concluída e só finalize com 100% dos testes verdes.
- Use `const` por padrão (evite `let` quando desnecessário), comparação estrita (`===` / `!==`), `parseInt(valor, 10)` sempre com radix explícito e mensagens de erro descritivas em português.
- Valide entradas (tipo, formato e limites) no início da função antes de executar efeitos colaterais ou chamadas de rede.

## Como eu quero trabalhar com você

- Antes de editar qualquer arquivo, explique em 1–2 frases o que vai mudar e por quê.
- Faça mudanças pequenas e focadas, resolvendo uma tarefa por vez.
- Se não tiver certeza sobre uma API ou biblioteca, consulte a documentação via MCP (`context7`) em vez de adivinhar.
- Ao corrigir bugs apontados por testes, verifique também casos de borda similares no mesmo arquivo sem alterar a assinatura pública esperada.
