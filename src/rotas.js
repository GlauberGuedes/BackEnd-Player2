const express = require('express');
const rotas = express();
const empresa = require('./controladores/empresas');
const login = require('./controladores/login');
const usuario = require('./controladores/usuario');
const verificarToken = require('./filtros/verificarToken');

rotas.post('/usuario', usuario.cadastrarUsuario);
rotas.post('/login', login.login);

rotas.use(verificarToken);

rotas.get('/empresas', empresa.listarEmpresas);
rotas.get('/empresas/:id', empresa.obterEmpresa);
rotas.post('/empresas', empresa.cadastrarEmpresa);
rotas.put('/empresas/:id', empresa.atualizarEmpresa);
rotas.delete('/empresas/:id', empresa.excluirEmpresa);


module.exports = rotas;