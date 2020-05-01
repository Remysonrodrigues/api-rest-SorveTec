const express = require('express');
const router = express.Router();

const loginMiddleware = require('../middlewares/login-middleware');
const Sorveteria = require('../controllers/sorveteria-controller');

router.post('/', loginMiddleware, Sorveteria.Inicio);

router.post('/cliente', loginMiddleware, Sorveteria.CadastrarCliente);
router.get('/cliente/:id_sorveteria', loginMiddleware, Sorveteria.BuscarCliente);
router.get('/clientes', loginMiddleware, Sorveteria.ListarClientes);
router.put('/cliente', loginMiddleware, Sorveteria.AtualizarCliente);
router.delete('/cliente', loginMiddleware, Sorveteria.DeletarCliente);

module.exports = router;