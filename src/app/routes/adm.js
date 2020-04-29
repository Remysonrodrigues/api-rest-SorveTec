const express = require('express');
const router = express.Router();

const Autenticacao = require('../controllers/adm-controller');

router.post('/login', Autenticacao.Login);
router.post('/cadastro', Autenticacao.Cadastro);

module.exports = router;