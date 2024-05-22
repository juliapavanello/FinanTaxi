app.post("/saldos/", async function(req, res) {
    const { inicio, fim, horasTrabalhadas, ganho, gasto } = req.body;
    const saldo = parseFloat(ganho) - parseFloat(gasto); // Calculando o saldo
    const resultado = await Saldo.create({
        inicio,
        fim,
        horasTrabalhadas,
        ganho,
        gasto,
        saldo // Incluindo o saldo no objeto a ser criado
    });
    res.json(resultado);
});

app.put("/saldos/:id", async function(req, res) {
    const { inicio, fim, horasTrabalhadas, ganho, gasto } = req.body;
    const saldo = parseFloat(ganho) - parseFloat(gasto); // Calculando o saldo
    const resultado = await Saldo.update({
        inicio,
        fim,
        horasTrabalhadas,
        ganho,
        gasto,
        saldo // Atualizando o saldo
    }, {
        where: { id: req.params.id }
    });
    if (resultado[0] === 0) {
        res.status(404).send({});
    } else {
        res.json(await Saldo.findByPk(req.params.id));
    }
});
