const mongoose = require('../../database/mongoDb');

const ClienteSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    telefone: {
        type: String,
        required: true
    },
    nascimento: {
        type: Date
    },
    bonificacoes: {
        type: Number,
        default: 0
    },
    criadoEm: {
        type: Date,
        default: Date.now
    }
});

const Cliente = mongoose.model('Cliente', ClienteSchema);

module.exports = Cliente;