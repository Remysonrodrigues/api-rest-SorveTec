const mongoose = require('../../database/mongoDb');
const bcrypt = require('bcrypt');

const AdmSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    senha: {
        type: String,
        required: true,
        select: false
    },
    senhaRedefinirToken: {
        type: String,
        select: false
    },
    senhaRedefinirExpira: {
        type: Date,
        select: false
    },
    criadoEm: {
        type: Date,
        default: Date.now
    }
});

AdmSchema.pre('save', async (next) => {
    await bcrypt.hash(this.senha, 10, (err, hash) => {
        if (err) return;
        this.senha = hash;
    });
    next();
});

const Adm = mongoose.model('Adm', AdmSchema);

module.exports = Adm;