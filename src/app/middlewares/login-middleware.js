const jwt = require('jsonwebtoken');
const tokenKeyConfig = require('../../config/tokenKey.json');

module.exports = (req, res, next) => {

    const autentificacaoHeader = req.headers.authorization;

    if (!autentificacaoHeader) {
        return res.status(400).send({ error: 'Nenhum token foi fornecido' });
    }

    const parts = autentificacaoHeader.split(' ');

    if (!parts.length === 2) {
        return res.status(401).send({ error: 'Token erro' });
    }

    const [ schema, token ] = parts;
    
    if (!/^Bearer$/i.test(schema)) {
        return res.status(401).send({ error: 'Token malformatado' });
    }

    jwt.verify(token, tokenKeyConfig.secrete, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: 'Token inválido' });
        }
        req.userId = decoded.id;
        return next();
    });
};