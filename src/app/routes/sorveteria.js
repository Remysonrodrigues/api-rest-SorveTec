const express = require('express');
const router = express.Router();

const loginMiddleware = require('../middlewares/login-middleware');
const Sorveteria = require('../controllers/sorveteria-controller');

router.post('/cliente', loginMiddleware, Sorveteria.CadastrarCliente);
router.get('/cliente/:id_cliente', loginMiddleware, Sorveteria.BuscarCliente);
router.get('/cliente', loginMiddleware, Sorveteria.ListarClientes);
router.put('/cliente/:id_cliente', loginMiddleware, Sorveteria.AtualizarCliente);
router.delete('/cliente/:id_cliente', loginMiddleware, Sorveteria.DeletarCliente);

module.exports = router;