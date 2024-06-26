const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carrega as variáveis de ambiente do .env

if (!process.env.DATABASE_URL) {
    throw new Error("A variável de ambiente DATABASE_URL não está definida.");
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

const conexao = sequelize;

module.exports = { conexao };
