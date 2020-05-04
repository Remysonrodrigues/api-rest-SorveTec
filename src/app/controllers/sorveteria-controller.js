const Sorveteria = require('../models/Sorveteria');
const Cliente = require('../models/Cliente');
const Item = require('../models/Item');
const Venda = require('../models/Venda');

exports.Inicio = async (req, res) => {
    
    const { valorKilo } = req.body;
    try {
        const sorveteria = await Sorveteria.findOne({ adm: req.userId });
        if (!sorveteria) {
            sorveteria = await Sorveteria.create({ valorKilo, adm: req.userId });
            await sorveteria.save();
            return res.send({ sorveteria });
        }
        await Sorveteria.findByIdAndUpdate(sorveteria._id, { valorKilo }, { new: true });
        return res.send({ sorveteria });

    } catch (err) {
        
        return res.status(400).send({ error: 'Erro ao iniciar' });

    }

};

exports.CadastrarCliente = async (req, res) => {

    const { nome, email, telefone } = req.body;
    try {

        const sorveteria = await Sorveteria.findOne({ adm: req.userId});
        if (!sorveteria) {
            return res.status(404).send({ error: 'ADM não encontrado' });
        }
        const sorveteriaCliente = await Cliente.create({ nome, email, telefone });
        sorveteria.clientes.push(sorveteriaCliente);
        await sorveteria.save();
        return res.send({ sorveteria });
        
    } catch (err) {
        
        return res.status(400).send({ error: 'Erro ao cadastrar um novo cliente' });

    }

};

exports.BuscarCliente = async (req, res) => {

    try {
        
        const result = await Sorveteria.findById(req.params.id_sorveteria).populate(['sorveterias', 'clientes']);
        if (!result) {
            return res.status(404).send({ error: 'ADM não encontrado' });
        }
        await result.clientes.forEach( (cliente, indice) => {
            if (cliente.email === req.body.email) {
                return res.send(cliente);
            }
        });
        return res.status(400).send({ error: 'Email do cliente não cadastrado' });

    } catch (err) {
        
        return res.status(400).send({ error: 'Erro ao buscar um cliente' });

    }

};

exports.ListarClientes = async (req, res) => {

    try {
        
        const result = await Sorveteria.findById(req.params.id_sorveteria).populate(['sorveterias', 'clientes']);
        if (!result) {
            return res.status(404).send({ error: 'ADM não encontrado' });
        }
        const clientes = result.clientes;   
        return res.send({ clientes });

    } catch (err) {
        
        return res.status(400).send({ error: 'Erro ao listar clientes' });

    }

};

exports.AtualizarCliente = async (req, res) => {

    const { nome, email, telefone } = req.body;
    try {
        
        const cliente = await Cliente.findByIdAndUpdate(req.params.id_cliente, { nome, email, telefone }, { new: true });
        if (!cliente) {
            return res.status(400).send({ error: 'Id cliente inválido' });
        }
        return res.send(cliente);

    } catch (err) {
        
        return res.status(400).send({ error: 'Erro ao atualizar cliente' });

    }

};

exports.DeletarCliente = async (req, res) => {

    try {
        
        await Cliente.findByIdAndRemove(req.params.id_cliente);
        return res.status(200).send({ mensagem: 'Cliente deletado com sucesso' });

    } catch (err) {
        
        return res.status(400).send({ error: 'Erro ao deletar cliente' });

    }

};

exports.CadastrarItem = async (req, res) => {

    const { nome, quantidade, nomeFornecedor, valor } = req.body;
    try {
        
        const sorveteria = await Sorveteria.findOne({ adm: req.userId});
        if (!sorveteria) {
            return res.status(404).send({ error: 'ADM não encontrado' });
        }
        const item = await Item.create({ nome, quantidade, nomeFornecedor, valor });
        sorveteria.itens.push(item);
        await sorveteria.save();
        return res.send({ sorveteria });

    } catch (err) {
        
        return res.status(400).send({ error: 'Erro ao cadastrar um novo item' });

    }

};

exports.ListarItens = async (req, res) => {

    try {
        
        const result = await Sorveteria.findById(req.params.id_sorveteria).populate(['sorveterias', 'itens']);
        if (!result) {
            return res.status(404).send({ error: 'ADM não encontrado' });
        }
        const itens = result.itens;   
        return res.send({ itens });

    } catch (err) {
        
        return res.status(400).send({ error: 'Erro ao listar itens' });

    }

};

exports.AtualizarItem = async (req, res) => {

    const { nome, quantidade, nomeFornecedor, valor } = req.body;
    try {
        
        const item = await Item.findByIdAndUpdate(req.params.id_item, { nome, quantidade, nomeFornecedor, valor}, { new: true });
        if (!item) {
            return res.status(400).send({ error: 'Id item inválido' });
        }
        return res.send(item);

    } catch (err) {
        
        return res.status(400).send({ error: 'Erro ao atualizar item' });

    }

};

exports.DeletarItem = async (req, res) => {

    try {
        
        await Item.findByIdAndRemove(req.params.id_item);
        return res.status(200).send({ mensagem: 'Item deletado com sucesso' });

    } catch (err) {
        
        return res.status(400).send({ error: 'Erro ao deletar item' });

    }

};

exports.CalcularVenda = async (req, res) => {

    const { pesoSorvete, outrosItens} = req.body;
    let valorFinal = 0.0;
    try {
        
        const sorveteria = await Sorveteria.findOne({ adm: req.userId});
        if (!sorveteria) {
            return res.status(404).send({ error: 'ADM não encontrado' });
        }
        const valorKilo = sorveteria.valorKilo;
        valorFinal = (pesoSorvete * valorKilo) / 1000;
        valorFinal += outrosItens;
        const venda = await Venda.create({ pesoSorvete, outrosItens, valorFinal });
        sorveteria.vendas.push(venda);
        await sorveteria.save();
        return res.send({ valorFinal });

    } catch (err) {
        
        return res.status(400).send({ error: 'Erro ao calcular o valor da venda' });

    }

};

exports.BonificarCliente = async (req, res) => {

    const { email } = req.body;
    try {
        
        const result = await Sorveteria.findById(req.params.id_sorveteria).populate(['sorveterias', 'clientes']);
        if (!result) {
            return res.status(404).send({ error: 'ADM não encontrado' });
        }
        await result.clientes.forEach( (cliente, indice) => {
            if (cliente.email === email) {
                const bonificacoes = cliente.bonificacoes += 1;
                Cliente.findByIdAndUpdate(cliente._id, { bonificacoes }, { new: true });
                return res.send({ mensagem: 'Cliente bonificado com sucesso' });
            }
        });
        return res.status(400).send({ error: 'Email do cliente não cadastrado' });

    } catch (err) {
        
        return res.status(400).send({ error: 'Erro ao bonificar cliente' });

    }

};