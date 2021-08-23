const yup = require('./configuracao');

const schemaCadastroUsuario = yup.object().shape({
  email: yup.string().required().email(),
  senha: yup.string().required().min(6)
});

module.exports = schemaCadastroUsuario;