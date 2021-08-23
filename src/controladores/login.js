const knex = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function login(req, res) {
  const { email, senha } = req.body;

  if(!email || !senha) {
    return res.status(400).json("email e senha são obrigatórios.");
  }

  try {
    const usuario = await knex('usuario')
      .where({ email })
      .first();

    if (!usuario) {
      return res.status(404).json('Usuário não encontrado.');
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(400).json('email ou senha incorretos.');
    }

    const token = jwt.sign({ id: usuario.id }, process.env.SENHA_HASH);

    const { senha: _, ...dadosUsuario } = usuario;

    return res.status(200).json({ usuario: dadosUsuario, token });
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = { login };