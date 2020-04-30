const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sorvetec',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('Banco de dados executando...')
);
mongoose.Promise = global.Promise;

module.exports = mongoose;