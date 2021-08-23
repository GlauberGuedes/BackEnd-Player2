# BackEnd-Player2

API para o desafio de Back-end da Player2.

- Todos os objetos enviados pelo body da requisição deverá ser um JSON.

## Como iniciar o projeto:

- Clonar o repositório
- "npm i" para instalar as dependências
- criar um banco de dados com as informações do arquivo database.sql (dentro da pasta src)
- colocar as informações do banco de dados em um arquivo .env (senguindo o exemplo do arquivo .env.exemplo
- "npm run dev" para rodar o projeto

## Endpoints:

### `POST` `/usuario`

Recebe todas as informações de cadastro do usuário, verifica se já existe um cadastro com esse email e se os campos enviados estão corretos, caso esteja tudo correto, irá criptografar a senha enviada e salvar o usuário e restaurante no banco de dados.

Exemplo de como enviar os dados para o cadastro:

```{
  "email": "usuario@player2.com",
  "senha": "abc123"
}
```

### `POST` `/login`

Recebe as informações de login (email e senha), verificará se o email existe na tabela de usuários do banco de dados e se a senha confere com a senha cadastrada, caso esteja tudo correto, irá criar um token e enviar ele na resposta.

Exemplo de como enviar os dados para o login:

```{
  "email": "usuario@player2.com",
  "senha": "abc123"
}
```

### Todos os Endpoints abaixo precisam de autenticação, é necessário enviar um token pelo header no formato de Bearer token.

### `GET` `/empresas`

Lista todas as empresas cadastradas.

### `GET` `/empresas/:id`

Retorna a empresa com o id informado.

### `POST` `/empresas`

Endpoint para cadastrar uma nova empresa. Recebe o cnpj, valida se está correto, pega todas as informações da empresa através da BrasilAPI e salva no banco de dados todos os dados da empresa com base no cnpj.

Exemplo de como enviar os dados para o cadastro da empresa:

```{
  "cnpj": "19131243000197"
}
```

### `PUT` `/empresas/:id`

Endpoint para atualizar uma empresa. Busca a empresa que deseja atualizar pelo id informado no params e atualiza os dados enviados.

Exemplo de como enviar os dados para a atualização da empresa:

```{
"cnpj": "19131243000197",
"identificador_matriz_filial": 1,
"descricao_matriz_filial": "Matriz",
"razao_social": "OPEN KNOWLEDGE BRASIL",
"nome_fantasia": "REDE PELO CONHECIMENTO LIVRE",
"situacao_cadastral": 2,
"descricao_situacao_cadastral": "Ativa",
"data_situacao_cadastral": "2013-10-03",
"motivo_situacao_cadastral": 0,
"nome_cidade_exterior": null,
"codigo_natureza_juridica": 3999,
"data_inicio_atividade": "2013-10-03",
"cnae_fiscal": 9430800,
"cnae_fiscal_descricao": "Atividades de associações de defesa de direitos sociais",
"descricao_tipo_logradouro": "ALAMEDA",
"logradouro": "FRANCA",
"numero": "144",
"complemento": "APT   34",
"bairro": "JARDIM PAULISTA",
"cep": 1422000,
"uf": "SP",
"codigo_municipio": 7107,
"municipio": "SAO PAULO",
"ddd_telefone_1": "11  23851939",
"ddd_telefone_2": null,
"ddd_fax": null,
"qualificacao_do_responsavel": 10,
"capital_social": 0,
"porte": 5,
"descricao_porte": "Demais",
"opcao_pelo_simples": false,
"data_opcao_pelo_simples": null,
"data_exclusao_do_simples": null,
"opcao_pelo_mei": false,
"situacao_especial": null,
"data_situacao_especial": null
}
```
 - Também pode ser enviado somente um dos dados pra atualizar.
 
 ### `DELETE` `/empresas/:id`
 
 Endepoint para deletar uma empresa com base no id informado no params, será verificado se existe uma empresa com este id e caso exista a empresa será excluída do banco de dados.
