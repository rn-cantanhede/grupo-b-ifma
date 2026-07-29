# Contributing

Obrigado por considerar contribuir com este projeto! Toda contribuição é bem-vinda, seja correção de bugs, novas funcionalidades, melhorias de documentação ou otimizações de desempenho.

## Antes de começar

Antes de abrir uma Issue ou Pull Request:

* Leia o README.
* Verifique se já existe uma Issue relacionada.
* Certifique-se de que sua alteração não duplica um trabalho existente.

## Como contribuir

1. Faça um Fork do projeto (caso não tenha acesso de escrita).
2. Crie uma nova branch a partir da `main`.

```bash
git checkout -b feature/minha-feature
```

3. Faça suas alterações.
4. Execute os testes.
5. Faça o commit utilizando Conventional Commits.
6. Envie sua branch.

```bash
git push origin feature/minha-feature
```

7. Abra um Pull Request.

## Padrão de commits

Este projeto utiliza **Conventional Commits**.

Exemplos:

```text
feat: adiciona autenticação JWT
fix: corrige validação de login
docs: atualiza README
test: adiciona testes do middleware
refactor: simplifica serviço de usuários
perf: melhora consulta ao banco
ci: adiciona workflow de testes
chore: atualiza dependências
```

## Pull Requests

Ao abrir um Pull Request:

* descreva claramente as alterações realizadas;
* referencie a Issue relacionada quando existir;
* mantenha o PR pequeno e focado em um único objetivo;
* garanta que todos os testes estejam passando;
* atualize a documentação quando necessário.

## Código

Procure manter o código consistente com o restante do projeto.

Boas práticas:

* nomes claros para variáveis e funções;
* funções pequenas e com responsabilidade única;
* tratamento adequado de erros;
* evitar duplicação de código;
* manter a organização da arquitetura do projeto.

## Testes

Antes de enviar um Pull Request:

* execute todos os testes;
* corrija eventuais falhas;
* adicione testes para novas funcionalidades sempre que possível.

## Reportando Bugs

Ao abrir uma Issue de bug, informe:

* descrição do problema;
* passos para reproduzir;
* comportamento esperado;
* comportamento obtido;
* ambiente (SO, Node.js, banco de dados, navegador, etc.);
* logs, prints ou mensagens de erro, quando possível.

## Sugerindo Funcionalidades

Ao sugerir uma nova funcionalidade, descreva:

* qual problema ela resolve;
* como ela deve funcionar;
* possíveis impactos;
* exemplos de uso.

## Segurança

Não divulgue vulnerabilidades publicamente.

Caso encontre uma falha de segurança, siga as instruções descritas em `SECURITY.md`.

## Código de Conduta

Ao contribuir com este projeto, você concorda em seguir as regras estabelecidas em `CODE_OF_CONDUCT.md`.

## Licença

Ao enviar contribuições para este projeto, você concorda que elas serão licenciadas sob a mesma licença utilizada pelo projeto.
