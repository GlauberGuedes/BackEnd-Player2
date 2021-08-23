const bcrypt = require("bcrypt");
const knex = require("../conexao");
const validarCadastro = require("../validacoes/schemaCadastroUsuario");

async function cadastrarUsuario (req,res) {
  const { email, senha } = req.body;
  
  try{
    await validarCadastro.validate(req.body);

    const usuarioCadastrado = await knex("usuario").where({email}).first();

    if(usuarioCadastrado) {
      return res.status(400).json("Este email já foi cadastrado.");
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = await knex("usuario").insert({email, senha: senhaCriptografada}).returning("*");

    if(usuario.length === 0) {
      return res.status(400).json("Erro ao cadastrar usuário.");
    }

    return res.json("Usuário cadastrado com sucesso.")
  }catch(error) {
    return res.status(400).json(error.message)
  }
}

module.exports = { cadastrarUsuario }