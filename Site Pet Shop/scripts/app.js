// SELEÇÃO DOS ELEMENTOS
const btnAbaLogin = document.getElementById('btn-aba-login');
const btnAbaSignup = document.getElementById('btn-aba-signup');
const btnSubmit = document.getElementById('btn-submit');
const tituloCard = document.getElementById('titulo-card');
const form = document.getElementById('login-form');

// Elementos dinâmicos do cadastro
const grupoConfirmarSenha = document.getElementById('grupo-confirmar-senha');
const inputConfirmarSenha = document.getElementById('confirm-password');

let modoAtual = 'login'; 

// CLIQUE NA ABA LOGIN
btnAbaLogin.addEventListener('click', (e) => {
    e.preventDefault();
    modoAtual = 'login';
    
    // Atualiza abas
    btnAbaLogin.classList.add('active');
    btnAbaSignup.classList.remove('active');
    
    // Atualiza textos
    tituloCard.textContent = 'Welcome Back!';
    btnSubmit.textContent = 'Login';
    
    // Esconde o campo de confirmar senha e remove a obrigatoriedade
    grupoConfirmarSenha.style.display = 'none';
    inputConfirmarSenha.removeAttribute('required');
});

// CLIQUE NA ABA SIGN UP (CADASTRO)
btnAbaSignup.addEventListener('click', (e) => {
    e.preventDefault();
    modoAtual = 'cadastro';
    
    // Atualiza abas
    btnAbaSignup.classList.add('active');
    btnAbaLogin.classList.remove('active');
    
    // Atualiza textos
    tituloCard.textContent = 'Create Account';
    btnSubmit.textContent = 'Sign Up';
    
    // Mostra o campo de confirmar senha e torna obrigatório
    grupoConfirmarSenha.style.display = 'flex';
    inputConfirmarSenha.setAttribute('required', 'true');
});

// ENVIO DO FORMULÁRIO (LÓGICA LOCAL)
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = inputConfirmarSenha.value;

    const usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (modoAtual === 'cadastro') {
        // Valida se as senhas são iguais
        if (password !== confirmPassword) {
            alert('Erro: As senhas não coincidem!');
            return;
        }

        const usuarioExiste = usuariosCadastrados.find(user => user.email === email);

        if (usuarioExiste) {
            alert('Erro: Este e-mail já está cadastrado!');
        } else {
            usuariosCadastrados.push({ email: email, password: password });
            localStorage.setItem('usuarios', JSON.stringify(usuariosCadastrados));
            
            alert('Conta criada com sucesso! Mude para a aba "Login" para acessar.');
            form.reset();
        }
    } else {
        // LÓGICA DE LOGIN
        const usuarioValido = usuariosCadastrados.find(user => user.email === email && user.password === password);

        if (usuarioValido) {
            alert(`Login realizado com sucesso! Bem-vindo ${email}.`);
        } else {
            alert('Erro: E-mail ou senha incorretos.');
        }
    }
});
    