const express = require('express');
const router = express.Router();

const Adm = require('../controllers/adm-controller');

router.post('/login', Adm.Login);
router.post('/cadastro', Adm.Cadastro);

module.exports = router;