# Matriz de rotas e redirecionamentos

## Regra de preservação

Rotas públicas e documentos existentes não devem ser removidos sem inventário, justificativa, redirecionamento testado e validação institucional quando houver impacto de comunicação ou transparência.

## Rotas públicas atuais inventariadas

| Rota | Finalidade | Situação no redesenho |
| --- | --- | --- |
| `/` | Página inicial | Preservar; redesenhar na Sprint 1. |
| `/quem-somos` | Institucional | Preservar; evoluir para `O Instituto` sem quebrar a rota existente. |
| `/areas-de-atuacao` | Eixos de atuação | Preservar; revisar taxonomia na Sprint 2. |
| `/projetos` | Portfólio de projetos | Preservar; evoluir para catálogo na Sprint 3. |
| `/certificacoes-reconhecimentos` | Certificações e reconhecimentos | Preservar, com fontes e datas verificadas. |
| `/transparencia` | Portal de transparência | Preservar; evoluir na Sprint 4. |
| `/transparencia/emendas-parlamentares` | Transparência de emendas | Preservar e manter documentos associados. |
| `/apoie` | Apoio, parceria e voluntariado | Preservar; revisar conversão institucional na Sprint 5. |
| `/contato` | Canais de contato | Preservar; formulário validado na Sprint 0A. |
| `/privacidade` | Privacidade | Preservar; revisar sempre que houver mudança de tratamento de dados. |
| `/acessibilidade` | Acessibilidade | Preservar; atualizar conforme Sprint 6. |
| `/robots.txt` | Diretrizes para robôs | Preservar e conferir após rotas novas. |
| `/sitemap.xml` | Mapa para mecanismos de busca | Preservar e conferir após rotas novas. |

## Regra para novas rotas

Antes de criar uma nova página pública, registrar:

- propósito e público prioritário;
- responsável editorial;
- fonte do conteúdo;
- metadados de SEO e acessibilidade;
- relação com rotas existentes;
- necessidade de redirecionamento ou canonical;
- critério de aceite para desktop, celular e teclado.

## Redirecionamentos futuros previstos

| Situação | Ação recomendada | Condição |
| --- | --- | --- |
| Página `O Instituto` usar nova URL | Manter `/quem-somos` e criar redirecionamento permanente somente após testes. | Aprovação da arquitetura e cópia final. |
| Projetos individuais receberem URLs próprias | Criar rotas estáveis por identificador; preservar links de catálogo. | Modelo editorial e fonte de cada projeto validados. |
| Notícias forem introduzidas | Criar padrão estável de URL e sitemap. | Política editorial e responsáveis definidos. |
| Documento público mudar de endereço | Redirecionar o arquivo antigo quando tecnicamente possível ou manter cópia histórica identificada. | Revisão de validade e privacidade concluída. |

## Teste obrigatório de cada redirecionamento

1. A rota antiga responde sem erro.
2. O destino é o conteúdo equivalente, não apenas a página inicial.
3. Não há cadeia ou loop de redirecionamentos.
4. O destino possui título, canonical e navegação coerentes.
5. O link é validado em desktop e celular antes da publicação.
