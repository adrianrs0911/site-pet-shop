document.addEventListener("DOMContentLoaded", () => {
    // 1. Criar o container do alternador de tema
    const alternadorTema = document.createElement("div");
    alternadorTema.id = "alternador-tema";
    
    // 2. Definir o ícone inicial como Sol (Modo Claro padrão)
    alternadorTema.innerHTML = "☀️";
    
    // 3. Adicionar o elemento ao corpo do site
    document.body.appendChild(alternadorTema);
    
    // 4. Verificar se o usuário já tinha preferência por modo escuro salva anteriormente
    if (localStorage.getItem("modo-escuro") === "ativo") {
        document.body.classList.add("dark-mode");
        alternadorTema.innerHTML = "🌙"; // Se estava ativo, inicia como Lua
    }

    // 5. Evento de clique para alternar o tema do site
    alternadorTema.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        
        // Altera o emoji em tempo real e grava a decisão no navegador
        if (document.body.classList.contains("dark-mode")) {
            alternadorTema.innerHTML = "🌙"; 
            localStorage.setItem("modo-escuro", "ativo");
        } else {
            alternadorTema.innerHTML = "☀️";
            localStorage.setItem("modo-escuro", "inativo");
        }
    });
});
