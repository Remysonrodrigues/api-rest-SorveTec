const mongoose = require('../../database/mongoDb');

const SorveteriaSchema = new mongoose.Schema({
    valorKilo: {
        type: Number,
        required: true
    },
    adm: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Adm',
        required: true
    },
    clientes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
    }],
    itens: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],
    vendas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venda'
    }],
    criadoEm: {
        type: Date,
        default: Date.now
    }
});

const Sorveteria = mongoose.model('Sorveteria', SorveteriaSchema);

module.exports = Sorveteria;