const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sorvetec',
    {
        useMongoClient: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('Banco de dados executando...')
);
mongoose.Promise = global.Promise;

module.exports = mongoose;