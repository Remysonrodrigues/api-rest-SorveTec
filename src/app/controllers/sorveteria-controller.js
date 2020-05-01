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

    try {

        const { nome, email, telefone } = req.body;
        const sorveteria = await Sorveteria.findOne({ adm: req.userId});
        if (!sorveteria) {
            return res.status(404).send({ error: 'ADM não encontrado' });
        }
        const sorveteriaClientes = await Cliente.create({ nome, email, telefone });
        sorveteria.clientes.push(sorveteriaClientes);
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