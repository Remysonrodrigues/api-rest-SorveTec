const express = require('express');
const router = express.Router();

const Adm = require('../controllers/adm-controller');

router.post('/login', Adm.Login);
router.post('/cadastro', Adm.Cadastro);
router.post('/esqueceu_senha', Adm.EsqueceuSenha);
router.post('/redefinir_senha', Adm.RedefinirSenha);

module.exports = router;