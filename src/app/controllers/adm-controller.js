const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenKeyConfig = require('../../config/tokenKey.json');
const Adm = require('../models/Adm');
const mailer = require('../../modules/mailer');
const crypto = require('crypto');

function gerarToken(params = {}){
    return jwt.sign(params, tokenKeyConfig.secrete, {
        expiresIn: 172800
    });
}

exports.Login = async (req, res) => {
    
    const { email, senha } = req.body;
    if (!await Adm.findOne({ email })) {
        return res.status(400).send({ error: 'ADM não encontrado' });
    }
    const adm = await Adm.findOne({ email }).select('+senha');
    if (!await bcrypt.compare(senha, adm.senha)) {
        return res.status(400).send({ error: 'Senha inválida' });
    }                        
    adm.senha = undefined;
    return res.send({
        adm,
        token: gerarToken({ id: adm.id })
    });              

};

exports.Cadastro = async (req, res) => {
        
    const { email } = req.body;
    try {
        
        if(await Adm.findOne({ email })) {
            return res.status(400).send({
                error: 'ADM já existe'
            });
        }
        const adm = await Adm.create(req.body);
        adm.senha = undefined;
        res.send({
            adm,
            token: gerarToken({ id: adm.id })
        });

    } catch (err) {
    
        return res.status(400).send({ error: 'Registração falhou' });

    }
};

exports.EsqueceuSenha = async (req, res) => {

    const { email } = req.body;
    try {
        
        const adm = await Adm.findOne({ email });
        if (!adm) {
            return res.status(400).send({ error: 'Usuário não encontrado' });
        }
        const token = crypto.randomBytes(20).toString('hex');
        const now = new Date();
        now.setHours(now.getHours() + 1);
        await Adm.findByIdAndUpdate(user.id, {
            '$set': {
                senhaRedefinirToken: token,
                senhaRedefinirExpira: now
            }
        });
        mailer.sendMail({
            to: email,
            from: 'remysonrodrigues@gmail.com',
            template: 'esqueceu_senha',
            context: { token }
        }, (err) => {
            if (err) {
                return res.status(400).send({ error: 'Não é possivel enviar o email com a senha esquecida' });
            }
            return res.send();
        });


    } catch (err) {
        
        return res.status(400).send({ error: 'Erro ao esquecer a senha, tente novamente' });

    }

};

exports.RedefinirSenha = async (req, res) => {};