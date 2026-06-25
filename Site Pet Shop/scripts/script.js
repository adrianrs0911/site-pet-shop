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

const bodyElement = document.body;
const btnIn = document.getElementById('zoom-in');
const btnOut = document.getElementById('zoom-out');
const btnReset = document.getElementById('zoom-reset');

let currentZoom = 1;
const ZOOM_STEP = 0.1;
const MAX_ZOOM = 1.5; 
const MIN_ZOOM = 0.8; 

function updateZoom(newZoom) {
  currentZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom));
  bodyElement.style.setProperty('--zoom-level', currentZoom);
}

btnIn.addEventListener('click', () => {
  updateZoom(currentZoom + ZOOM_STEP);
});

btnOut.addEventListener('click', () => {
  updateZoom(currentZoom - ZOOM_STEP);
});

btnReset.addEventListener('click', () => {
  updateZoom(1);
});
    


