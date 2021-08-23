const yup = require('./configuracao');

const schemaCadastroEmpresa = yup.object().shape({
  cnpj: yup.string().required().max(14)
});

module.exports = schemaCadastroEmpresa;