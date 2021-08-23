CREATE DATABASE desafio_player2;

DROP TABLE IF exists qsa;
DROP TABLE IF exists cnaes_secundarias;
DROP TABLE IF exists empresas;
DROP TABLE IF exists usuario;

CREATE TABLE usuario(
  id SERIAL NOT NULL primary key,
  email TEXT NOT NULL,
  senha TEXT NOT NULL
  );

CREATE TABLE empresas(
  id SERIAL NOT NULL primary key,
  usuario_id INT NOT NULL REFERENCES usuario(id),
  cnpj VARCHAR(14) NOT NULL,
  identificador_matriz_filial INT NOT NULL,
  descricao_matriz_filial TEXT NOT NULL,
  razao_social VARCHAR(100) NOT NULL,
  nome_fantasia VARCHAR(100) NOT NULL,
  situacao_cadastral INT NOT NULL,
  descricao_situacao_cadastral VARCHAR(150) NOT NULL,
  data_situacao_cadastral DATE NOT NULL,
  motivo_situacao_cadastral INT NOT NULL,
  nome_cidade_exterior VARCHAR(80),
  codigo_natureza_juridica INT NOT NULL,
  data_inicio_atividade DATE NOT NULL,
  cnae_fiscal INT NOT NULL,
  cnae_fiscal_descricao TEXT NOT NULL,
  descricao_tipo_logradouro VARCHAR(40) NOT NULL,
  logradouro VARCHAR(100) NOT NULL,
  numero VARCHAR(10) NOT NULL,
  complemento VARCHAR(100) NOT NULL,
  bairro VARCHAR(50) NOT NULL,
  cep INT NOT NULL,
  uf VARCHAR(2) NOT NULL,
  codigo_municipio INT NOT NULL,
  municipio VARCHAR(50) NOT NULL,
  ddd_telefone_1 VARCHAR(15) NOT NULL,
  ddd_telefone_2 VARCHAR(15),
  ddd_fax VARCHAR(15),
  qualificacao_do_responsavel INT NOT NULL,
  capital_social INT NOT NULL,
  porte INT NOT NULL,
  descricao_porte VARCHAR(25) NOT NULL,
  opcao_pelo_simples BOOLEAN NOT NULL,
  data_opcao_pelo_simples DATE,
  data_exclusao_do_simples DATE,
  opcao_pelo_mei BOOLEAN NOT NULL,
  situacao_especial TEXT,
  data_situacao_especial DATE
);

CREATE TABLE cnaes_secundarias(
  id SERIAL PRIMARY KEY,
  empresa_id INT NOT NULL REFERENCES empresas(id),
  codigo BIGINT NOT NULL,
  descricao TEXT NOT NULL
);

CREATE TABLE qsa(
  id SERIAL PRIMARY KEY,
  empresa_id INT NOT NULL REFERENCES empresas(id),
  identificador_de_socio INT NOT NULL,
  nome_socio VARCHAR(100) NOT NULL,
  cnpj_cpf_do_socio VARCHAR(14),
  codigo_qualificacao_socio INT NOT NULL,
  percentual_capital_social INT NOT NULL,
  data_entrada_sociedade DATE NOT NULL,
  cpf_representante_legal VARCHAR(14),
  nome_representante_legal VARCHAR(100),
  codigo_qualificacao_representante_legal TEXT
);

