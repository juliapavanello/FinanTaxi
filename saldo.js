const { Sequelize, DataTypes } = require('sequelize');
const banco2 = require('./banco');

const Saldo = banco2.conexao.define('Saldo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    inicio: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    fim: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    horasTrabalhadas: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    ganho: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    gasto: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    saldo: {
        type: DataTypes.DECIMAL, // Definindo como DECIMAL
        allowNull: false,
    }
}, {
    tableName: 'saldos',
    timestamps: false,
});

module.exports = { Saldo };
