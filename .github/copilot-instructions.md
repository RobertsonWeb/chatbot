## Instruções rápidas para agentes de código (Copilot)

Objetivo: tornar o agente produtivo rapidamente neste projeto "Chatbot" (Flask + transformers).

- **Arquitetura (big picture):** o app é um servidor Flask mínimo em `app.py` que serve a página em `templates/index.html` e expõe a rota `/chatbot` que recebe `pergunta` por query string e retorna JSON. A lógica de IA está em `lib/chatbot.py` e as configurações do modelo em `lib/configuracoes.py`.

- **Fluxo de dados chave:**
  - Frontend (`static/js/chatbot.js`) envia GET para `/chatbot?pergunta=...`.
  - `app.py` chama `lib.chatbot.perguntar(pergunta)` e faz `jsonify(resposta=...)`.
  - `lib.chatbot.perguntar` instancia uma pipeline Hugging Face `question-answering` com `MODEL` de `lib/configuracoes.py` e retorna `resposta['answer']`.

- **Padrões e decisões descobertas:**
  - O pipeline HF é criado *dentro* da função `perguntar` (carregamento por requisição) — isso é caro e impacta latência/memória.
  - Texto de contexto para perguntas está embutido em `lib/configuracoes.py` como `FINE_TUNNING`.
  - Rota `/chatbot` usa método GET e usa `request.args.get('pergunta')` (não JSON POST).

- **Dependências e execução:**
  - Dependências listadas em `requirements.txt` (inclui `tensorflow` e `transformers`).
  - Execução recomendada (ver `readme.md`): criar venv, `pip install -r requirements.txt`, exportar `FLASK_APP=app.py` e `flask run --host=0.0.0.0 --debugger`.

- **O que modificar com cuidado:**
  - Alterações em `lib/configuracoes.py` (MODEL / FINE_TUNNING) mudam comportamento do modelo — testar localmente com perguntas simples.
  - Se alterar a rota `/chatbot` ou o formato de resposta, atualize `static/js/chatbot.js` (o front espera `{ resposta: string }`).

- **Exemplos úteis (baseados no código):**
  - Curl de teste: `curl 'http://localhost:5000/chatbot?pergunta=Quem+foi+Carl+Sagan'` => resposta JSON `{ "resposta": "..." }`.
  - Ponto de extensão: mover `pipeline(...)` para o nível do módulo em `lib/chatbot.py` para evitar recarregar o modelo a cada requisição.

- **Verificações rápidas antes de abrir PR:**
  - Confirme que `FLASK_APP` aponta para `app.py` e que `requirements.txt` está atualizado.
  - Teste manual: abrir `http://localhost:5000` e enviar perguntas pela UI.
  - Ao alterar o modelo, valide que o nome do modelo em `lib/configuracoes.py` é compatível com `transformers`.

- **Não faça (observações práticas):**
  - Não altere o método de requisição para POST sem atualizar o frontend.
  - Não remova o contexto `FINE_TUNNING` sem fornecer substituto, pois o modelo QA espera um contexto para responder.

- **Arquivos-chave para referência rápida:**
  - `app.py` — rota e integração Flask.
  - `lib/chatbot.py` — chamada à pipeline HF (`question-answering`).
  - `lib/configuracoes.py` — `MODEL` e `FINE_TUNNING`.
  - `static/js/chatbot.js` — integração AJAX e renderização no frontend.
  - `templates/index.html` — layout simples e inclusão de `chatbot.js`.

Se algo estiver faltando ou confuso, diga onde quer mais detalhe (execução, mudança de modelo, otimização de performance, ou exemplo de PR).
