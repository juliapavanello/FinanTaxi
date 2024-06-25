const express = require('express');
const path = require('path');
const banco2 = require("./banco");
const { Saldo } = require("./saldo");
const authRouter = require('./auth'); // aqui ele importa o roteador de autenticação do login

const app = express();
const PORTA = 3001; // localhost:3001

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

banco2.conexao.sync().then(() => {
    console.log("Banco de dados conectado.");
});

app.use('/auth', authRouter); // usando o roteador de autenticação para rotas de autenticação

//metodo para ler saldos
app.get("/saldos/", async function(req, res) {
    const resultado = await Saldo.findAll();
    res.json(resultado);
});

//metodo para adicionar o saldo
app.post("/saldos/", async function(req, res) {
    const { inicio, fim, horasTrabalhadas, ganho, gasto, kmInicial, kmFinal } = req.body;
    const saldo = parseFloat(ganho) - parseFloat(gasto);
    const kmRodados = kmFinal - kmInicial;
    const saldoPorKmRodado = saldo / kmRodados;
    const saldoPorHoraTrabalhada = saldo / horasTrabalhadas;
    try {
        const novoSaldo = await Saldo.create({
            inicio,
            fim,
            horasTrabalhadas,
            ganho,
            gasto,
            saldo,
            kmInicial,
            kmFinal,
            kmRodados,
            saldoPorKmRodado,
            saldoPorHoraTrabalhada
        });
        res.status(201).json(novoSaldo);
    } catch (error) {
        console.error("Erro ao criar saldo:", error);
        res.status(500).json({ error: 'Erro ao criar saldo' });
    }
});

//metodo para alterar
app.put("/saldos/:id", async function(req, res) {
    const saldoId = req.params.id;
    const { inicio, fim, horasTrabalhadas, ganho, gasto, kmInicial, kmFinal } = req.body;
    const saldo = parseFloat(ganho) - parseFloat(gasto);
    const kmRodados = kmFinal - kmInicial;
    const saldoPorKmRodado = saldo / kmRodados;
    const saldoPorHoraTrabalhada = saldo / horasTrabalhadas;
    try {
        const [numRows, updatedSaldo] = await Saldo.update({
            inicio,
            fim,
            horasTrabalhadas,
            ganho,
            gasto,
            saldo,
            kmInicial,
            kmFinal,
            kmRodados,
            saldoPorKmRodado,
            saldoPorHoraTrabalhada
        }, {
            where: { id: saldoId },
            returning: true
        });
        if (numRows === 0) {
            res.status(404).json({ error: 'Saldo não encontrado' });
        } else {
            res.json(updatedSaldo[0]);
        }
    } catch (error) {
        console.error("Erro ao atualizar saldo:", error);
        res.status(500).json({ error: 'Erro ao atualizar saldo' });
    }
});

//metodo de deletar saldo
app.delete("/saldos/:id", async function(req, res) {
    const saldoId = req.params.id;
    try {
        const numRows = await Saldo.destroy({ where: { id: saldoId } });
        if (numRows === 0) {
            res.status(404).json({ error: 'Saldo não encontrado' });
        } else {
            res.status(204).end();
        }
    } catch (error) {
        console.error("Erro ao excluir saldo:", error);
        res.status(500).json({ error: 'Erro ao excluir saldo' });
    }
});

app.listen(PORTA, function() {
    console.log("Servidor iniciado na porta " + PORTA);
});


