document.addEventListener("DOMContentLoaded", () => {
    const alternadorTema = document.createElement("div");
    alternadorTema.id = "alternador-tema";
    
    alternadorTema.innerHTML = "☀️";
    
    document.body.appendChild(alternadorTema);
    
    if (localStorage.getItem("modo-escuro") === "ativo") {
        document.body.classList.add("dark-mode");
        alternadorTema.innerHTML = "🌙"; // Se estava ativo, inicia como Lua
    }

    alternadorTema.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        
        if (document.body.classList.contains("dark-mode")) {
            alternadorTema.innerHTML = "🌙"; 
            localStorage.setItem("modo-escuro", "ativo");
        } else {
            alternadorTema.innerHTML = "☀️";
            localStorage.setItem("modo-escuro", "inativo");
        }
    });
});
