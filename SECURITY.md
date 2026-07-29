# Security Policy

## Supported Versions

Atualmente, apenas a versão mais recente do projeto recebe atualizações de segurança.

| Version        | Supported |
| -------------- | --------- |
| Latest         | ✅         |
| Older versions | ❌         |

---

# Reporting a Vulnerability

A segurança do **Agro Família Pesca** é uma prioridade.

Se você identificar uma vulnerabilidade de segurança, **não abra uma Issue pública**.

Em vez disso, entre em contato com o mantenedor utilizando o método de contato informado no repositório (perfil do GitHub ou outro canal oficial).

Ao reportar uma vulnerabilidade, inclua, sempre que possível:

* descrição detalhada da vulnerabilidade;
* impacto esperado;
* passos para reproduzir;
* ambiente utilizado;
* versão afetada;
* evidências (logs, prints ou vídeos, quando aplicável);
* sugestão de correção (opcional).

---

# Response Process

Após o recebimento do relatório:

1. O recebimento será confirmado assim que possível.
2. A vulnerabilidade será analisada.
3. Caso confirmada, uma correção será desenvolvida.
4. Após a correção, será publicada uma nova versão do projeto.

---

# Disclosure Policy

Solicitamos que vulnerabilidades não sejam divulgadas publicamente antes da disponibilização de uma correção.

A divulgação responsável ajuda a proteger os usuários do projeto.

---

# Security Best Practices

Este projeto busca seguir boas práticas de segurança, incluindo:

* autenticação baseada em JWT;
* controle de acesso por níveis de permissão;
* validação de entradas;
* consultas parametrizadas com Knex;
* proteção contra SQL Injection;
* sanitização de dados;
* proteção contra XSS quando aplicável;
* utilização de Helmet;
* Rate Limiting para endpoints sensíveis;
* gerenciamento seguro de variáveis de ambiente.

---

# Scope

Esta política se aplica ao código-fonte oficial do projeto e aos componentes mantidos neste repositório.

Não cobre sistemas modificados por terceiros.

---

# Acknowledgements

Contribuições responsáveis para melhoria da segurança são muito bem-vindas e ajudam a tornar o projeto mais seguro para toda a comunidade.
