const btnAbaLogin = document.getElementById('btn-aba-login');
const btnAbaSignup = document.getElementById('btn-aba-signup');
const btnSubmit = document.getElementById('btn-submit');
const tituloCard = document.getElementById('titulo-card');
const form = document.getElementById('login-form');
const grupoConfirmarSenha = document.getElementById('grupo-confirmar-senha');
const inputConfirmarSenha = document.getElementById('confirm-password');

// Novo elemento para exibir os alertas na tela
const msgAlerta = document.getElementById('mensagem-alerta');

let modoAtual = 'login';

// Função utilitária para mostrar mensagens na tela
function mostrarMensagem(texto, tipo) {
    msgAlerta.textContent = texto;
    msgAlerta.className = `alerta alert-${tipo}`; // Remove a classe oculto e aplica o estilo
}

// Função para limpar mensagens anteriores
function limparMensagem() {
    msgAlerta.textContent = '';
    msgAlerta.className = 'alerta-oculto';
}

btnAbaLogin.addEventListener('click', (e) => {
    e.preventDefault();
    modoAtual = 'login';
    limparMensagem(); // Limpa alertas antigos ao mudar de aba
    btnAbaLogin.classList.add('active');
    btnAbaSignup.classList.remove('active');
    tituloCard.textContent = 'Welcome Back!';
    btnSubmit.textContent = 'Login';
    grupoConfirmarSenha.style.display = 'none';
    inputConfirmarSenha.removeAttribute('required');
});

btnAbaSignup.addEventListener('click', (e) => {
    e.preventDefault();
    modoAtual = 'cadastro';
    limparMensagem(); // Limpa alertas antigos ao mudar de aba
    btnAbaSignup.classList.add('active');
    btnAbaLogin.classList.remove('active');
    tituloCard.textContent = 'Create Account';
    btnSubmit.textContent = 'Sign Up';
    grupoConfirmarSenha.style.display = 'flex';
    inputConfirmarSenha.setAttribute('required', 'true');
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    limparMensagem(); // Limpa alertas de tentativas anteriores

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = inputConfirmarSenha.value;
    const usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (modoAtual === 'cadastro') {
        if (password !== confirmPassword) {
            mostrarMensagem('Erro: As senhas não coincidem!', 'erro');
            return;
        }

        const usuarioExiste = usuariosCadastrados.find(user => user.email === email);
        if (usuarioExiste) {
            mostrarMensagem('Erro: Este e-mail já está cadastrado!', 'erro');
        } else {
            usuariosCadastrados.push({ email: email, password: password });
            localStorage.setItem('usuarios', JSON.stringify(usuariosCadastrados));
            mostrarMensagem('Conta criada com sucesso! Mude para "Login" para acessar.', 'sucesso');
            form.reset();
        }
    } else {
        const usuarioValido = usuariosCadastrados.find(user => user.email === email && user.password === password);
        if (usuarioValido) {
            mostrarMensagem(`Login realizado com sucesso! Bem-vindo ${email}.`, 'sucesso');
        } else {
            mostrarMensagem('Erro: E-mail ou senha incorretos.', 'erro');
        }
    }
});
