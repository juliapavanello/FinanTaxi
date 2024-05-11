const sequelize = require("sequelize");
const banco2 = require("./banco")

var saldo = banco2.conexao.define(
    "saldo",
    {
        id:{
            type:sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement:true
        },
        ganho:{
            type:sequelize.DECIMAL.UNSIGNED,
            allowNull:false
        },
        gasto:{
            type:sequelize.DECIMAL.UNSIGNED,
            allowNull:false
        }
    },
    {
        timestamps: false // Esta opção impede que o Sequelize inclua automaticamente createdAt e updatedAt
    }
);

module.exports = { saldo };