const productsData = [
    {
        id: 1,
        title: "Ração Premium para Cães Adultos Frango e Arroz - 15kg",
        price: 189.90,
        category: "caes",
        brand: "royal-canin",
        image: "https://placeholder.com",
        popularity: 95
    },
    {
        id: 2,
        title: "Arranhador para Gatos de Três Andares com Brinquedo",
        price: 249.00,
        category: "gatos",
        brand: "premier",
        image: "https://placeholder.com",
        popularity: 88
    },
    {
        id: 3,
        title: "Cama Pet Nuvem Redonda Lavável Tamanho G",
        price: 115.50,
        category: "caes",
        brand: "golden",
        image: "https://placeholder.com",
        popularity: 70
    },
    {
        id: 4,
        title: "Brinquedo Mordedor de Borracha Resistente para Cães",
        price: 34.90,
        category: "caes",
        brand: "premier",
        image: "https://placeholder.com",
        popularity: 62
    },
    {
        id: 5,
        title: "Ração Úmida Whiskas Sachê Carne para Gatos Castrados",
        price: 3.50,
        category: "gatos",
        brand: "whiskas",
        image: "https://placeholder.com",
        popularity: 99
    },
    {
        id: 6,
        title: "Ração para Peixes Alcon Basic Flocos - 50g",
        price: 18.20,
        category: "peixes",
        brand: "golden",
        image: "https://placeholder.com",
        popularity: 45
    }
];

const baseTitles = {
    caes: [
        "Ração Seca Premium Formula Raças Pequenas", "Petisco Bifinho de Carne Especial", 
        "Guia Retrátil Conforto 5 Metros", "Shampoo Neutro Extrato de Aloe Vera 500ml", 
        "Brinquedo Corda com Nó Resistente", "Comedouro Inox Antiderrapante Médio", 
        "Coleira Antipulgas e Carrapatos Proteção 8 Meses", "Tapete Higiênico Ultra Absorvente 30 Unidades", 
        "Educador Sanitário Pode e Não Pode", "Petisco Ossinho Defumado Flexível"
    ],
    gatos: [
        "Areia Sanitária Sílica de Alta Absorção 1.8kg", "Ração Seca Castrados Salmão", 
        "Brinquedo Varinha com Penas e Guizo", "Snack Crocante Controle de Bolas de Pelo", 
        "Fonte de Água Bivolt com Filtro de Carvão", "Caixa de Areia Fechada Antiodor", 
        "Petisco Sachê de Atum ao Molho", "Coleira com Guizo e Fecho de Segurança"
    ],
    passaros: [
        "Mistura de Sementes Selecionadas para Calopsita", "Gaiola Malha Fina com Poleiros", 
        "Bebedouro Automático Plástico 200ml", "Suplemento Vitamínico Canto Perfeito", 
        "Brinquedo Balanço de Madeira Colorida", "Ração Extrusada Premium para Papagaio"
    ],
    peixes: [
        "Ração em Flocos Nutritiva para Peixes Tropicais", "Condicionador de Água Anticloro Rápido", 
        "Filtro Externo Hang-on Fluxo Regulável", "Termostato com Aquecedor Automático 50W", 
        "Enfeite de Resina Barco Naufragado", "Ração Especial para Peixe Betta Mini"
    ]
};

const brands = ["royal-canin", "premier", "whiskas", "golden"];
const categories = ["caes", "gatos", "passaros", "peixes"];

let generatedCount = 0;
let currentId = 7;

while (generatedCount < 6945) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const titlesList = baseTitles[category];
    const baseTitle = titlesList[Math.floor(Math.random() * titlesList.length)];
    
    let brand = brands[Math.floor(Math.random() * brands.length)];
    if (category === "gatos" && Math.random() > 0.5) brand = "whiskas";
    if (category === "caes" && brand === "whiskas") brand = "royal-canin";
    
    const variationNumber = Math.floor(Math.random() * 90000) + 10000;
    const title = `${baseTitle} Ref v-${variationNumber}`;
    
    let price = parseFloat((Math.random() * (220 - 4) + 4).toFixed(2));
    if (baseTitle.includes("Ração") && Math.random() > 0.5) {
        price = parseFloat((Math.random() * (380 - 120) + 120).toFixed(2));
    }

    const popularity = Math.floor(Math.random() * 90) + 10;

    productsData.push({
        id: currentId,
        title: title,
        price: price,
        category: category,
        brand: brand,
        image: "https://placeholder.com",
        popularity: popularity
    });

    currentId++;
    generatedCount++;
}

let currentCategory = "todos";

function renderProducts(productsToRender) {
    const grid = document.getElementById("products-grid");
    grid.innerHTML = "";

    const itemsToShow = productsToRender.slice(0, 20);

    if (productsToRender.length === 0) {
        grid.innerHTML = '<div class="no-products">Nenhum produto encontrado com os filtros selecionados.</div>';
        return;
    }

    itemsToShow.forEach(product => {
        const card = document.createElement("article");
        card.className = "card-produto";
        card.innerHTML = `
            <button class="wishlist-btn" onclick="toggleWishlist(this)">♥</button>
            <img src="${product.image}" alt="${product.title}">
            <span class="badge-promo">Destaque</span>
            <h3>${product.title}</h3>
            <div class="preco-produto">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
            <div class="price-conditions">No PIX ou 10x de R$ ${(product.price / 10).toFixed(2).replace('.', ',')}</div>
            <button class="btn-comprar">Comprar</button>
        `;
        grid.appendChild(card);
    });
}

function filterAndSortProducts() {
    const searchQuery = document.getElementById("search-input").value.toLowerCase();
    const minPrice = parseFloat(document.getElementById("price-min").value) || 0;
    const maxPrice = parseFloat(document.getElementById("price-max").value) || Infinity;
    
    const checkedBrands = Array.from(document.querySelectorAll(".brand-filter:checked")).map(cb => cb.value);
    const sortValue = document.getElementById("sort-select").value;

    let filtered = productsData.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchQuery);
        const matchesCategory = currentCategory === "todos" || product.category === currentCategory;
        const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
        const matchesBrand = checkedBrands.length === 0 || checkedBrands.includes(product.brand);

        return matchesSearch && matchesCategory && matchesPrice && matchesBrand;
    });

    if (sortValue === "menor") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortValue === "maior") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortValue === "procurados") {
        filtered.sort((a, b) => b.popularity - a.popularity);
    }

    renderProducts(filtered);
}

function toggleWishlist(button) {
    button.classList.toggle("active");
}

document.getElementById("alternador-tema").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

document.getElementById("search-input").addEventListener("input", filterAndSortProducts);
document.getElementById("price-min").addEventListener("input", filterAndSortProducts);
document.getElementById("price-max").addEventListener("input", filterAndSortProducts);
document.getElementById("sort-select").addEventListener("change", filterAndSortProducts);

document.querySelectorAll(".brand-filter").forEach(checkbox => {
    checkbox.addEventListener("change", filterAndSortProducts);
});

function setupCategorySelectors() {
    const sidebarLinks = document.querySelectorAll("#sidebar-categories a");
    const topTags = document.querySelectorAll("#top-tags .tag");

    function updateActiveCategory(category) {
        currentCategory = category;

        sidebarLinks.forEach(link => {
            if (link.getAttribute("data-category") === category) {
                link.style.fontWeight = "bold";
                link.style.color = document.body.classList.contains("dark-mode") ? "#81b29a" : "#386641";
            } else {
                link.style.fontWeight = "normal";
                link.style.color = "";
            }
        });

        topTags.forEach(tag => {
            if (tag.getAttribute("data-category") === category) {
                tag.classList.add("active");
            } else {
                tag.classList.remove("active");
            }
        });

        filterAndSortProducts();
    }

    sidebarLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            updateActiveCategory(link.getAttribute("data-category"));
        });
    });

    topTags.forEach(tag => {
        tag.addEventListener("click", () => {
            updateActiveCategory(tag.getAttribute("data-category"));
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderProducts(productsData);
    setupCategorySelectors();
});
