// Busca um usuário por id numa API e devolve { id, nome, email }.
// A função recebe um `fetchFn` pra facilitar teste (injeção de dependência).

export async function fetchUsuario(id, fetchFn = fetch) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new RangeError(`O parâmetro id deve ser um inteiro positivo (recebido: ${String(id)})`);
  }

  const resposta = await fetchFn(`https://api.exemplo.com/usuarios/${id}`);
  if (!resposta || !resposta.ok) {
    const status = resposta?.status ?? 'desconhecido';
    throw new Error(`Falha ao buscar usuário ${id}: status HTTP ${status}`);
  }

  const dados = await resposta.json();

  return {
    id: dados.id,
    nome: typeof dados.nome === 'string' ? dados.nome.trim() : '',
    email: typeof dados.email === 'string' ? dados.email.trim().toLowerCase() : '',
  };
}
