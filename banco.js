const { Sequelize } = require('sequelize');

// Configure com as credenciais fornecidas
const conexao = new Sequelize('FinanTaxi', 'JuliaEAna', 'Abcd&123', {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log,
});

module.exports = { conexao };
