require('dotenv').config();  // Carregar variáveis de ambiente do arquivo .env

const express = require('express');
const path = require('path');
const banco2 = require("./banco");
const { Saldo } = require("./saldo");
const authRouter = require('./auth'); // Importando o roteador de autenticação
const passport = require('./middleware'); // Importando o middleware de autenticação

const app = express();

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

app.use('/auth', authRouter); // Usando o roteador de autenticação para rotas de autenticação

app.get("/saldos/", passport.authenticate('jwt', { session: false }), async function(req, res) {
    const resultado = await Saldo.findAll();
    res.json(resultado);
});

app.get("/saldos/:id", passport.authenticate('jwt', { session: false }), async function(req, res) {
    const resultado = await Saldo.findByPk(req.params.id);
    if (resultado == null) {
        res.status(404).send({});
    } else {
        res.json(resultado);
    }
});

app.get("/saldos/ganho/:ganho", passport.authenticate('jwt', { session: false }), async function(req, res) {
    const resultado = await Saldo.findAll({
        where: { ganho: req.params.ganho }
    });
    if (resultado.length === 0) {
        res.status(404).send({});
    } else {
        res.json(resultado);
    }
});

app.post("/saldos/", passport.authenticate('jwt', { session: false }), async function(req, res) {
    try {
        const { inicio, fim, horasTrabalhadas, ganho, gasto, kmInicial, kmFinal } = req.body;

        // Calculando saldo
        const saldo = parseFloat(ganho) - parseFloat(gasto);

        // Calculando kmRodados
        const kmRodados = parseFloat(kmFinal) - parseFloat(kmInicial);

        // calculo por km rodado
        const saldoPorKmRodado = saldo / kmRodados;

        // cálculo para saldoPorHoraTrabalhada 
        const saldoPorHoraTrabalhada = saldo / parseFloat(horasTrabalhadas);

        // criando novo saldo com os valores calculados acima
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

        res.status(201).json(novoSaldo); // 201 
        alert("Adicionado")
    } catch (error) {
        console.error('Erro ao adicionar saldo:', error);
        res.status(500).json({ error: 'Erro ao adicionar saldo' });
    }
});



app.put("/saldos/:id", passport.authenticate('jwt', { session: false }), async function(req, res) {
    const { inicio, fim, horasTrabalhadas, ganho, gasto, kmInicial, kmFinal, kmRodados, saldoPorKmRodado, saldoPorHoraTrabalhada } = req.body;
    const saldo = parseFloat(ganho) - parseFloat(gasto); // Calculando o saldo
    const resultado = await Saldo.update({
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
        where: { id: req.params.id }
    });
    if (resultado[0] === 0) {
        res.status(404).send({});
    } else {
        res.json(await Saldo.findByPk(req.params.id));
    }
});

app.delete("/saldos/:id", passport.authenticate('jwt', { session: false }), async function(req, res) {
    const resultado = await Saldo.destroy({
        where: {
            id: req.params.id
        }
    });
    if (resultado === 0) {
        res.status(404).send({});
    } else {
        res.status(204).send({});
    }
});

const PORTA = process.env.PORT || 3001; // Escolhe a porta do ambiente ou 3001 se não houver ambiente
app.listen(PORTA, function() {
    console.log("Servidor iniciado na porta " + PORTA);
});
