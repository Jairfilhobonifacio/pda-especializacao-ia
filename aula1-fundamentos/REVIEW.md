# REVIEW — Aula 1

## O que eu pedi

**Tarefa 1 (`src/validaCpf.js`):**
```text
Revise src/validaCpf.js usando a skill /revisar-codigo e depois corrija apenas src/validaCpf.js para que todos os testes em tests/validaCpf.test.js passem. Restrições: não altere tests/, use comparação estrita (===), parseInt com radix 10, rejeite CPFs com caracteres alfabéticos misturados e sequências de 11 dígitos repetidos. Rode npm test ao final.
```

**Tarefa 2 — Desafio 3 (`src/fetchUsuario.js`):**
```text
Corrija src/fetchUsuario.js para fazer todos os testes de tests/fetchUsuario.test.js passarem sem editar nada na pasta tests/.
Requisitos baseados na especificação dos testes:
1. Validar o parâmetro id antes de chamar fetchFn: se não for inteiro positivo, lançar erro mencionando "id" sem invocar fetchFn.
2. Verificar resposta.ok: quando a API responder com status de erro (como 404), lançar Error descritivo contendo o código HTTP (resposta.status).
3. Se nome ou email vierem ausentes no payload JSON de sucesso, devolver string vazia "" em vez de quebrar ao chamar .trim() ou .toLowerCase().
Explique em 2 frases antes de editar e rode npm test para comprovar.
```

## O que o agente fez

- **Resumo do diff:**
  - Em `src/validaCpf.js`: adicionou validação de formato `/^[\d.-]+$/` antes da limpeza de máscara (impedindo que `'529a982b247c25'` passe), adicionou verificação `/^(\d)\1{10}$/` para rejeitar sequências como `111.111.111-11` e `000.000.000-00`, passou radix `10` para `parseInt(d, 10)` e trocou `==` por `===`.
  - Em `src/fetchUsuario.js`: adicionou guarda inicial `if (!Number.isInteger(id) || id <= 0)` lançando `RangeError` com menção explícita a `id` antes de chamar `fetchFn`; adicionou checagem `if (!resposta || !resposta.ok)` lançando `Error` com `resposta.status`; e protegeu `dados.nome` e `dados.email` com verificação `typeof === 'string'`.
- **Número de voltas do loop:** 2 voltas na sessão completa (1ª volta: diagnóstico com `/revisar-codigo` e correção de `validaCpf.js`; 2ª volta: intervenção para ajustar a validação prévia do `id` e tratamento de campos ausentes em `fetchUsuario.js`, seguida de `npm test` com 13/13 testes verdes).
- **Tools usadas:** `Read`, `Bash(npm test)`, `Edit`, `Bash(git diff)`, `Bash(git status)`.

## O que eu aceitei e por quê

- Aceitei a validação `/^[\d.-]+$/` antes do `.replace(/\D/g, '')` em `validaCpf.js`, porque o bug original acontecia justamente por remover letras silenciosamente e validar apenas os 11 dígitos restantes.
- Aceitei a guarda `!Number.isInteger(id) || id <= 0` no topo de `fetchUsuario.js` antes do `await fetchFn(...)`, pois garante falha rápida sem disparo de requisição desnecessária.
- Aceitei o fallback seguro `typeof dados.nome === 'string' ? dados.nome.trim() : ''`, que evita `TypeError: Cannot read properties of undefined` sem mascarar outros tipos inesperados.

## O que eu rejeitei ou mudei e por quê

- Na primeira sugestão para `validaCpf.js`, o rascunho aceitava qualquer caractere não-alfabético antes de limpar a máscara. Pedi para restringir estritamente a dígitos, pontos e hífen (`/^[\d.-]+$/`), evitando que entradas malformadas com símbolos arbitrários fossem aceitas como máscara válida.
- Em `fetchUsuario.js`, orientei que a mensagem de erro para `id` inválido usasse `RangeError` mencionando explicitamente a palavra `id` para casar de forma determinística com a asserção `/id/i` do teste.

## Onde apareceu contexto, não-determinismo ou alucinação

Durante a sessão, ficou evidente o papel do **contexto** e da **alucinação por omissão de especificação**: o código original de `validaCpf.js` e `fetchUsuario.js` (gerado por IA sem contexto de testes) apresentava o bug clássico de implementação estatisticamente comum — calculava o módulo 11 do CPF, mas esquecia que números como `111.111.111-11` passam matematicamente na fórmula, e assumia o "caminho feliz" em `fetchUsuario.js` (supondo que `fetch` rejeita automaticamente em HTTP 404, quando na verdade `fetch` só rejeita em falha de rede e exige checar `resposta.ok`). Quando o `CLAUDE.md` passou a exigir a leitura prévia de `tests/` e a execução obrigatória de `npm test`, o agente deixou de adivinhar contratos e passou a ancorar cada condição nas asserções reais.

## O que eu colocaria no CLAUDE.md pra isso não acontecer de novo

Adicionei no `CLAUDE.md`:
- *"Valide entradas (tipo, formato e limites) no início da função antes de executar efeitos colaterais ou chamadas de rede."*
- *"Sempre execute `npm test` antes de declarar uma tarefa como concluída e só finalize com 100% dos testes verdes."*

## Exemplo de invocação da Skill (`gerar-commit-convencional`)

**Comando invocado:**
```text
/gerar-commit-convencional
```

**Resultado produzido pela skill:**
```text
Status dos testes: PASSOU (13/13)
Arquivos analisados: CLAUDE.md, src/validaCpf.js, src/fetchUsuario.js, .claude/skills/gerar-commit-convencional/SKILL.md

Mensagem sugerida:
fix(validacao): corrigir validação de CPF e tratamento de erros em fetchUsuario

Corpo (opcional, 2-3 bullets):
- rejeitar CPFs com dígitos repetidos ou letras misturadas na máscara em validaCpf
- validar id positivo antes do fetch, checar resposta.ok e tratar campos ausentes em fetchUsuario
- completar CLAUDE.md e adicionar skill gerar-commit-convencional
```
