document.addEventListener('DOMContentLoaded', async function () {
    const saldoForm = document.getElementById('saldo-form');
    const saldosList = document.getElementById('saldos-list');

    // Função para carregar os saldos
    async function loadSaldos() {
        const response = await fetch('http://localhost:3001/saldos');
        const saldos = await response.json();
        saldosList.innerHTML = '';
        saldos.forEach(saldo => {
            const saldoItem = document.createElement('tr');
            saldoItem.innerHTML = `
                <td>${saldo.inicio}</td>
                <td>${saldo.fim}</td>
                <td>${saldo.horasTrabalhadas}</td>
                <td>${saldo.ganho}</td>
                <td>${saldo.gasto}</td>
                <td>${saldo.saldo}</td>
                <td><button onclick="deleteSaldo(${saldo.id})">Deletar</button></td>
            `;
            saldosList.appendChild(saldoItem);
        });
    }

    // Função para adicionar um saldo
    saldoForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const inicio = document.getElementById('inicio').value;
        const fim = document.getElementById('fim').value;
        const horasTrabalhadas = document.getElementById('horasTrabalhadas').value;
        const ganho = document.getElementById('ganho').value;
        const gasto = document.getElementById('gasto').value;

        const response = await fetch('http://localhost:3001/saldos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inicio,
                fim,
                horasTrabalhadas,
                ganho,
                gasto
            })
        });

        if (response.ok) {
            loadSaldos();
            saldoForm.reset();
        }
    });

    // Função para deletar um saldo
    window.deleteSaldo = async function (id) {
        const response = await fetch(`http://localhost:3001/saldos/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            loadSaldos();
        }
    };

    // Carregar os saldos ao iniciar a aplicação
    loadSaldos();
});
