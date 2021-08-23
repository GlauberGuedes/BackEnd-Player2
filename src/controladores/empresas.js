const knex = require("../conexao");
const axios = require("axios");
const validarCadastro = require("../validacoes/schemaCadastroEmpresa");
const validarAtualizacao = require("../validacoes/schemaAtualizarEmpresa");

async function listarEmpresas(req, res) {
  try {
    const empresas = await knex("empresas");

    for (const empresa of empresas) {
      const cnaes = await knex("cnaes_secundarias").where({
        empresa_id: empresa.id,
      });

      empresa.cnaes_secundarias = cnaes;

      const qsa = await knex("qsa").where({ empresa_id: empresa.id });

      empresa.qsa = qsa;
    }

    return res.json(empresas);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function obterEmpresa(req, res) {
  const { id } = req.params;
  try {
    const empresa = await knex("empresas").where({ id }).first();

    if(!empresa) {
      return res.status(404).json("Empresa não encontrada.");
    }

    const cnaes = await knex("cnaes_secundarias").where({
      empresa_id: empresa.id,
    });

    empresa.cnaes_secundarias = cnaes;

    const qsa = await knex("qsa").where({ empresa_id: empresa.id });

    empresa.qsa = qsa;

    return res.json(empresa);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function cadastrarEmpresa(req, res) {
  const { cnpj } = req.body;
  const { usuario } =req;

  try {
    await validarCadastro.validate(req.body);

    const empresaCadastrada = await knex("empresas").where({ cnpj }).first();

    if (empresaCadastrada) {
      return res
        .status(400)
        .json("Já possui uma empresa cadastrada com este cnpj.");
    }

    const { data } = await axios.get(
      `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`
    );

    const { cnaes_secundarias, qsa, ...dadosEmpresa } = data;

    const empresa = await knex("empresas")
      .insert({ ...dadosEmpresa, usuario_id: usuario.id })
      .returning("*");

    if (empresa.length === 0) {
      return res.status(400).json("Erro ao cadastrar empresa.");
    }

    for (const cnaes of cnaes_secundarias) {
      const cnaesSecundarios = await knex("cnaes_secundarias")
        .insert({ ...cnaes, empresa_id: empresa[0].id })
        .returning("*");

      if (cnaesSecundarios.length === 0) {
        await knex("empresas").del().where({ id: empresa[0].id });
        await knex("cnaes_secundarias")
          .del()
          .where({ empresa_id: empresa[0].id });
        return res.status(400).json("Erro ao cadastrar cnaes_secundarios.");
      }
    }

    for (const item of qsa) {
      const { cnpj, ...dadosQSA } = item;
      const qsaEmpresa = await knex("qsa")
        .insert({ ...dadosQSA, empresa_id: empresa[0].id })
        .returning("*");

      if (qsaEmpresa.length === 0) {
        await knex("empresas").del().where({ id: empresa[0].id });
        await knex("cnaes_secundarias")
          .del()
          .where({ empresa_id: empresa[0].id });
        await knex("qsa").del().where({ empresa_id: empresa[0].id });
        return res.status(400).json("Erro ao cadastrar qsa.");
      }
    }

    return res.json("cadastro realizado com Sucesso.");
  } catch (error) {
    if (error.message === "Request failed with status code 404") {
      return res.status(404).json("CNPJ não encontrado.");
    }
    if (error.message === "Request failed with status code 400") {
      return res.status(404).json("CNPJ inválido.");
    }
    return res.status(400).json(error.message);
  }
}

async function atualizarEmpresa(req, res) {
  const {
    cnpj,
    identificador_matriz_filial,
    descricao_matriz_filial,
    razao_social,
    nome_fantasia,
    situacao_cadastral,
    descricao_situacao_cadastral,
    data_situacao_cadastral,
    motivo_situacao_cadastral,
    nome_cidade_exterior,
    codigo_natureza_juridica,
    data_inicio_atividade,
    cnae_fiscal,
    cnae_fiscal_descricao,
    descricao_tipo_logradouro,
    logradouro,
    numero,
    complemento,
    bairro,
    cep,
    uf,
    codigo_municipio,
    municipio,
    ddd_telefone_1,
    ddd_telefone_2,
    ddd_fax,
    qualificacao_do_responsavel,
    capital_social,
    porte,
    descricao_porte,
    opcao_pelo_simples,
    data_opcao_pelo_simples,
    data_exclusao_do_simples,
    opcao_pelo_mei,
    situacao_especial,
    data_situacao_especial,
  } = req.body;

  const { id } = req.params;

  try {
    await validarAtualizacao.validate(req.body);

    const empresa = await knex("empresas").where({ id }).first();

    if (!empresa) {
      return res.status(404).json("Empresa não encontrada.");
    }

    if (cnpj) {
      if (cnpj !== empresa.cnpj) {
        const empresaCnpj = await knex("empresas").where({ cnpj }).first();

        if (empresaCnpj) {
          return res.status(400).json("Já possui uma empresa com esse cnpj.");
        }
      }
    }

    const empresaAtualizada = await knex("empresas").update({
      cnpj,
      identificador_matriz_filial,
      descricao_matriz_filial,
      razao_social,
      nome_fantasia,
      situacao_cadastral,
      descricao_situacao_cadastral,
      data_situacao_cadastral,
      motivo_situacao_cadastral,
      nome_cidade_exterior,
      codigo_natureza_juridica,
      data_inicio_atividade,
      cnae_fiscal,
      cnae_fiscal_descricao,
      descricao_tipo_logradouro,
      logradouro,
      numero,
      complemento,
      bairro,
      cep,
      uf,
      codigo_municipio,
      municipio,
      ddd_telefone_1,
      ddd_telefone_2,
      ddd_fax,
      qualificacao_do_responsavel,
      capital_social,
      porte,
      descricao_porte,
      opcao_pelo_simples,
      data_opcao_pelo_simples,
      data_exclusao_do_simples,
      opcao_pelo_mei,
      situacao_especial,
      data_situacao_especial,
    }).where({ id });

    if(!empresaAtualizada) {
      return res.status(400).json("Erro ao atualizar empresa.");
    }

    return res.json("Empresa atualizada com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function excluirEmpresa(req,res) {
  const { id } = req.params;

  try{

    const empresa = await knex("empresas").where({ id }).first();

    if(!empresa) {
      return res.status(404).json("Empresa não encontrada.");
    }

    const qsaDeletado = await knex("qsa").del().where({empresa_id: id});

    if(!qsaDeletado) {
      return res.status(400).json("Erro ao excluir qsa.");
    }

    const cnaesDeletado = await knex("cnaes_secundarias").del().where({empresa_id: id});

    if(!cnaesDeletado) {
      return res.status(400).json("Erro ao excluir cnaes secundarias.");
    }

    const empresaDeletada = await knex("empresas").del().where({ id });

    if(!empresaDeletada) {
      return res.status(400).json("Erro ao excluir empresa.");
    }

    return res.json("Empresa excluída com sucesso.");
  }catch(error) {
    return res.status(400).json(error.message);
  }
}

module.exports = { listarEmpresas, obterEmpresa, cadastrarEmpresa, atualizarEmpresa, excluirEmpresa };
