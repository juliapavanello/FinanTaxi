const express = require('express')
const banco2 = require("./banco")
const saldo = require("./saldo")

const app = express()
app.use(express.json())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
  });

banco2.conexao.sync( function(){
    console.log("Banco de dados conectado.");
})

const PORTA = 3001
app.listen( PORTA, function(){
    console.log("Servidor iniciados na porta "+PORTA);
})

app.get("/saldos/",async function(req, res) {
    const resultado = await saldo.saldo.findAll()
    res.json(resultado);
})

app.get("/saldos/:id",async function(req, res) {
    const resultado = await saldo.saldo.findByPk(req.params.id)
    if( resultado == null ){
        res.status(404).send({})
    }
    res.json(resultado);
})

app.get("/saldos/ganho/:ganho",async function(req, res) {
    const resultado = await saldo.saldo.findAll({
        where:{ ganho:req.params.ganho }
    })
    if( resultado == null ){
        res.status(404).send({})
    }
    res.json(resultado);
})

app.post("/saldos/",async function(req,res){
    const resultado = await saldo.saldo.create({
        ganho:req.body.ganho,
        gasto:req.body.gasto
    })
    res.json(resultado)
})

app.put("/saldos/:id",async function(req,res){
    const resultado = await saldo.saldo.update({
        ganho:req.body.ganho,
        gasto:req.body.gasto
    },{
        where:{id: req.params.id}
    })
    if( resultado == 0){
        res.status(404).send({})
    }else{
        res.json( await saldo.saldo.findByPk(req.params.id))
    }
})

app.delete("/saldos/:id",async function(req,res){
    const resultado = await saldo.saldo.destroy({
        where:{
            id:req.params.id
        }
    })
    if( resultado == 0 ){
        res.status(404).send({})
    }else{
        res.status(204).send({})
    }
})