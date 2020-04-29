const mongoose = require('../../database/mongoDb');

const ItemSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    quantidade: {
        type: Number,
        required: true
    },
    nomeFornecedor: {
        type: String,
        required: true
    },
    descricao: {
        type: String
    },
    data: {
        type: Date,
        default: Date.now
    },
    valor: {
        type: Number,
        default: 0.0
    }
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;