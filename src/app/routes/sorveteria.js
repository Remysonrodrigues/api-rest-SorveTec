const express = require('express');
const router = express.Router();

const loginMiddleware = require('../middlewares/login-middleware');
const Sorveteria = require('../controllers/sorveteria-controller');

router.post('/', loginMiddleware, Sorveteria.Inicio);

router.post('/cliente', loginMiddleware, Sorveteria.CadastrarCliente);
router.get('/cliente/:id_sorveteria', loginMiddleware, Sorveteria.BuscarCliente);
router.get('/clientes/:id_sorveteria', loginMiddleware, Sorveteria.ListarClientes);
router.put('/cliente/:id_cliente', loginMiddleware, Sorveteria.AtualizarCliente); 
router.delete('/cliente/:id_cliente', loginMiddleware, Sorveteria.DeletarCliente);

router.post('/item', loginMiddleware, Sorveteria.CadastrarItem);
router.get('/itens/:id_sorveteria', loginMiddleware, Sorveteria.ListarItens);
router.put('/item/:id_item', loginMiddleware, Sorveteria.AtualizarItem); 
router.delete('/item/:id_item', loginMiddleware, Sorveteria.DeletarItem);

router.post('/venda', loginMiddleware, Sorveteria.CalcularVenda);

module.exports = router;