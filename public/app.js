
const API_BASE_URL ='https://finantaxi-backend.onrender.com'  // url do sistema

const loginForm = document.getElementById('login-form');
const saldoContainer = document.getElementById('saldo-container');
const saldoForm = document.getElementById('saldo-form');
let authToken = null;

// função de login
async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    if (result.token) {
        authToken = result.token;
        loginForm.style.display = 'none';
        saldoContainer.style.display = 'block';
        loadSaldos();
    } else {
        alert('Informações inválidas');
    }
}

// Função para carregar saldos
async function loadSaldos() {
    const response = await fetch(`${API_BASE_URL}/saldos/`, {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    });
    if (response.ok) {
        const saldos = await response.json();
        const saldosList = document.getElementById('saldos-list');
        saldosList.innerHTML = '';
        saldos.forEach(saldo => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${saldo.inicio}</td>
                <td>${saldo.fim}</td>
                <td>${saldo.horasTrabalhadas}</td>
                <td>${saldo.ganho}</td>
                <td>${saldo.gasto}</td>
                <td>${saldo.saldo}</td>
                <td>${saldo.kmInicial}</td>
                <td>${saldo.kmFinal}</td>
                <td>${saldo.kmRodados}</td>
                <td>${saldo.saldoPorKmRodado}</td>
                <td>${saldo.saldoPorHoraTrabalhada}</td>
                <td><button onclick="deleteSaldo(${saldo.id})">Deletar</button></td>
            `;
            saldosList.appendChild(row);
        });
    } else {
        const errorMessage = await response.text();
        console.error('Erro ao carregar saldos:', errorMessage);
    }
}

// função para adicionar saldo
saldoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inicio = document.getElementById('inicio').value;
    const fim = document.getElementById('fim').value;
    const horasTrabalhadas = document.getElementById('horasTrabalhadas').value;
    const ganho = document.getElementById('ganho').value;
    const gasto = document.getElementById('gasto').value;
    const kmInicial = document.getElementById('kmInicial').value;
    const kmFinal = document.getElementById('kmFinal').value;

    const response = await fetch(`${API_BASE_URL}/saldos/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ inicio, fim, horasTrabalhadas, ganho, gasto, kmInicial, kmFinal })
    });

    if (response.ok) {
        const newSaldo = await response.json();
        loadSaldos();
    } else {
        const errorMessage = await response.text();
        console.error('Erro ao adicionar saldo:', errorMessage);
        alert('Erro ao adicionar saldo: ' + errorMessage);
    }

    document.getElementById("inicio").value="";
    document.getElementById("fim").value="";
    document.getElementById("horasTrabalhadas").value="";
    document.getElementById("ganho").value="";
    document.getElementById("gasto").value="";
    document.getElementById("kmInicial").value="";
    document.getElementById("kmFinal").value="";
});

// função para deletar saldo
async function deleteSaldo(id) {
    const response = await fetch(`${API_BASE_URL}/saldos/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    });

    if (response.ok) {
        loadSaldos();
    } else {
        const errorMessage = await response.text();
        console.error('Erro ao deletar saldo:', errorMessage);
        alert('Erro ao deletar saldo: ' + errorMessage);
    }
}

// Listener para login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await login();
});


