---
name: gerar-commit-convencional
description: Gera mensagem de commit no padrão Conventional Commits em português a partir do diff atual e dos testes executados. Use quando o usuário pedir para criar mensagem de commit, resumir alterações para commit ou invocar /gerar-commit-convencional.
allowed-tools: Read, Grep, Glob, Bash(git diff:*), Bash(git status:*), Bash(git log:*), Bash(npm test:*)
---

# Gerar Commit Convencional

Você analisa o estado atual do repositório e sugere uma mensagem de commit clara, objetiva e fiel ao diff real, seguindo Conventional Commits em português.

## Entrada

`$ARGUMENTS` pode indicar o escopo opcional (ex.: `cpf`, `api`, `docs`). Se vier vazio, infira o escopo a partir dos arquivos alterados em `git status` e `git diff`.

## Passos

1. Rode `git status --short` e `git diff` (ou `git diff --staged` se houver arquivos em stage) para inspecionar exatamente o que mudou.
2. Rode `npm test` para confirmar que a suíte está passando antes de sugerir o commit. Se algum teste falhar, avise imediatamente e não recomende commitar até corrigir.
3. Identifique o tipo principal da mudança (`feat`, `fix`, `docs`, `test`, `refactor`, `chore`) e o escopo afetado.
4. Gere a proposta no formato padronizado abaixo.

## Formato da saída

```text
Status dos testes: <PASSOU (N/N) | FALHOU>
Arquivos analisados: <lista curta>

Mensagem sugerida:
<tipo>(<escopo>): <resumo imperativo em até 72 caracteres>

Corpo (opcional, 2-3 bullets):
- <mudança objetiva 1 e motivação>
- <mudança objetiva 2 e motivação>
```

## Regras

- Nunca execute `git commit` nem edite arquivos automaticamente; apenas inspecione o diff, valide os testes e devolva a mensagem pronta.
- Não invente mudanças que não estejam no diff.
- Use verbos no infinitivo ou imperativo curto em português (`corrigir`, `adicionar`, `atualizar`).
