const mongoose = require('../../database/mongoDb');

const VendaSchema = new mongoose.Schema({
    pesoSorvete: {
        type: Number,
        default: 0.0
    },
    outrosItens: {
        type: Number,
        default: 0.0
    },
    data: {
        type: Date,
        default: Date.now
    },
    valorFinal: {
        type: Number,
        default: 0.0,
        required: true
    }
});

const Venda = mongoose.model('Venda', VendaSchema);

module.exports = Venda;