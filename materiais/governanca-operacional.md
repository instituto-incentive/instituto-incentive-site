# Governança operacional digital

Atualizado em 15 de setembro de 2026.

Este documento registra os controles mínimos para os serviços que sustentam o portal institucional. Não contém senhas, tokens, chaves de API ou valores de variáveis de ambiente.

## Contas e responsáveis

| Serviço | Finalidade | Responsável principal | Administrador substituto | MFA | Recuperação |
| --- | --- | --- | --- | --- | --- |
| GitHub | Repositório, revisão e histórico | [A DEFINIR PELO INSTITUTO] | [A DEFINIR PELO INSTITUTO] | [A CONFIRMAR] | [A CONFIRMAR] |
| Vercel | Hospedagem e deployments | [A DEFINIR PELO INSTITUTO] | [A DEFINIR PELO INSTITUTO] | [A CONFIRMAR] | [A CONFIRMAR] |
| Cloudflare / DNS | Turnstile e DNS institucional | [A DEFINIR PELO INSTITUTO] | [A DEFINIR PELO INSTITUTO] | [A CONFIRMAR] | [A CONFIRMAR] |
| Resend | Envio do formulário de contato | [A DEFINIR PELO INSTITUTO] | [A DEFINIR PELO INSTITUTO] | [A CONFIRMAR] | [A CONFIRMAR] |
| Google | Busca, métricas e propriedade do domínio | [A DEFINIR PELO INSTITUTO] | [A DEFINIR PELO INSTITUTO] | [A CONFIRMAR] | [A CONFIRMAR] |

## Regras operacionais

1. Manter pelo menos duas pessoas autorizadas em cada serviço institucional.
2. Ativar MFA nas contas administrativas e guardar os códigos de recuperação em cofre institucional acessível apenas a responsáveis designados.
3. Usar contas institucionais, não contas pessoais, como proprietárias quando o serviço permitir.
4. Aplicar o princípio do menor privilégio e revisar acessos a cada seis meses ou quando houver mudança de equipe.
5. Registrar data, responsável e motivo sempre que uma chave de integração for criada, substituída ou revogada; nunca registrar seu valor.
6. Fazer alterações de produção por pull request, checks aprovados e acompanhamento do deployment.

## Controles específicos do formulário

- As variáveis do Turnstile e do Resend permanecem na Vercel, com escopo mínimo por ambiente.
- Chaves do Resend devem ser rotacionadas de forma controlada após a confirmação de funcionamento da substituta.
- O formulário deve ser validado manualmente após mudanças que afetem autenticação, variáveis ou envio de e-mail.
- Logs técnicos não devem registrar tokens do Turnstile, chaves, conteúdo de mensagens ou dados pessoais desnecessários.

## Próxima validação institucional

Preencher a tabela de responsáveis, confirmar MFA e registrar o local institucional de recuperação. A ausência desses dados impede considerar a Sprint 0B concluída.
