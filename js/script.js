const apiURL = "./php/api.php";
let jogos = [];

const logos = {
    xbox: "images/xbox.png",
    playstation: "images/PlayStation_logo_and_wordmark.svg",
    nintendo: "images/Nintendo_red_logo.svg.png",
};

const faviconPadrao = "images/controle-de-video-game.png";

const nomesConsole = {
    xbox: "Xbox 360",
    playstation: "PlayStation",
    nintendo: "Nintendo",
};

const scrollbarTema = {
    xbox: {
        thumb: "#107c10",
        track: "#0b0b0b",
        border: "#0b0b0b",
    },
    playstation: {
        thumb: "#2d78ee",
        track: "#081120",
        border: "#081120",
    },
    nintendo: {
        thumb: "#d92f2f",
        track: "#1a0808",
        border: "#1a0808",
    },
};

const ordemConsoles = ["xbox", "playstation", "nintendo"];

function obterConsoleDaURL() {
    const params = new URLSearchParams(window.location.search);
    const consoleParam = params.get("console");

    if (ordemConsoles.includes(consoleParam)) {
        return consoleParam;
    }

    const consoleSalvo = localStorage.getItem("selectedConsole");
    if (ordemConsoles.includes(consoleSalvo)) {
        return consoleSalvo;
    }

    return "xbox";
}

let consoleAtual = obterConsoleDaURL();
localStorage.setItem("selectedConsole", consoleAtual);
const editIndexKey = `editIndex_${consoleAtual}`;

function aplicarVisualConsole() {
    document.body.classList.remove("console-xbox", "console-playstation", "console-nintendo");
    document.body.classList.add(`console-${consoleAtual}`);

    const logo = document.getElementById("consoleLogo");

    if (logo) {
        logo.src = logos[consoleAtual];
        logo.alt = `Logo ${nomesConsole[consoleAtual]}`;
    }

    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
        favicon.href = faviconPadrao;
    }

    const temaScrollbar = scrollbarTema[consoleAtual] || scrollbarTema.xbox;
    document.documentElement.style.setProperty("--scrollbar-thumb", temaScrollbar.thumb);
    document.documentElement.style.setProperty("--scrollbar-track", temaScrollbar.track);
    document.documentElement.style.setProperty("--scrollbar-thumb-border", temaScrollbar.border);
}

function montarUrlComConsole(path) {
    return `${path}?console=${consoleAtual}`;
}

function configurarLinksConsole() {
    const addLink = document.getElementById("addGameLink");
    if (addLink) addLink.href = montarUrlComConsole("adicao.html");

    const backLink = document.getElementById("backToCollectionLink");
    if (backLink) backLink.href = montarUrlComConsole("index.html");
}

function configurarBotaoTrocaConsole() {
    const toggleBtn = document.getElementById("toggleConsoleBtn");
    if (!toggleBtn) return;

    const indiceAtual = ordemConsoles.indexOf(consoleAtual);
    const proximoConsole = ordemConsoles[(indiceAtual + 1) % ordemConsoles.length];
    toggleBtn.textContent = `Trocar para ${nomesConsole[proximoConsole]}`;

    toggleBtn.addEventListener("click", () => {
        const proximo = ordemConsoles[(ordemConsoles.indexOf(consoleAtual) + 1) % ordemConsoles.length];
        const paginaAtual = window.location.pathname.split("/").pop() || "index.html";
        localStorage.removeItem("editIndex_xbox");
        localStorage.removeItem("editIndex_playstation");
        localStorage.removeItem("editIndex_nintendo");
        window.location.href = `${paginaAtual}?console=${proximo}`;
    });
}

function apiURLComConsole() {
    return `${apiURL}?console=${consoleAtual}`;
}

aplicarVisualConsole();
configurarLinksConsole();
configurarBotaoTrocaConsole();

// Detecta página pelo id do body para não depender do nome da pasta/URL.
const pageId = document.body ? document.body.id : "";
const isAddPage = pageId === "adicao" || window.location.pathname.includes("adicao");
const isViewPage = pageId === "index" || window.location.pathname.endsWith("/") || window.location.pathname.includes("index");

// === FUNÇÕES GERAIS ===
async function carregarJogos() {
    const resp = await fetch(apiURLComConsole());
    jogos = await resp.json();
}

async function salvarJogo(game, index = null) {
    const method = index !== null ? "PUT" : "POST";
    if (index !== null) game.index = index;

    await fetch(apiURLComConsole(), {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(game),
    });
}

async function deletarJogo(index) {
    await fetch(apiURLComConsole(), {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index }),
    });
}

// === PÁGINA DE ADIÇÃO ===
if (isAddPage) {
    const form = document.getElementById("gameForm");
    const editIndex = document.getElementById("editIndex");
    const imageInput = document.getElementById("gameImage");
    const preview = document.getElementById("previewImage");
    let imagemAntiga = "";

    // Mostrar prévia quando o usuário selecionar uma nova imagem
    imageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                preview.src = event.target.result;
                preview.style.display = "block";
            };
            reader.readAsDataURL(file);
        }
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("gameName").value;
        const category = document.getElementById("gameCategory").value;
        const link = document.getElementById("gameLink").value;

        // Função auxiliar para salvar
        async function salvarComImagem(image) {
            const gameData = { name, category, link, image };
            if (editIndex.value) {
                await salvarJogo(gameData, Number(editIndex.value));
            } else {
                await salvarJogo(gameData);
            }
            alert("Jogo salvo com sucesso!");
            form.reset();
            preview.style.display = "none";
        }

        // Se o usuário escolheu nova imagem
        if (imageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = async function (event) {
                await salvarComImagem(event.target.result);
            };
            reader.readAsDataURL(imageInput.files[0]);
        } 
        // Se não escolheu imagem nova → usa a antiga
        else {
            await salvarComImagem(imagemAntiga);
        }
    });

    // Preencher se veio via edição
    (async () => {
        await carregarJogos();
        const idx = localStorage.getItem(editIndexKey);
        if (idx !== null) {
            const g = jogos[idx];
            if (g) {
                document.getElementById("gameName").value = g.name;
                document.getElementById("gameCategory").value = g.category;
                document.getElementById("gameLink").value = g.link;
                document.getElementById("editIndex").value = idx;

                // Mostra a imagem antiga (prévia)
                if (g.image) {
                    imagemAntiga = g.image;
                    preview.src = g.image;
                    preview.style.display = "block";
                }
            }

            localStorage.removeItem(editIndexKey);
        }
    })();
}

// === PÁGINA DE COLEÇÃO ===
if (isViewPage) {
    const coverModal = document.getElementById("coverModal");
    const coverModalImage = document.getElementById("coverModalImage");
    const coverModalTitle = document.getElementById("coverModalTitle");
    const closeCoverModal = document.getElementById("closeCoverModal");
    const TAMANHO_LOTE_RENDER = 12;

    function proximoFrame() {
        return new Promise((resolve) => requestAnimationFrame(resolve));
    }

    function criarCardJogo(game, index) {
        const card = document.createElement("div");
        card.className = "game-card";
        card.title = "Dê 2 cliques para ampliar a capa";

        const temLink = game.link && game.link.trim() !== "";

        card.innerHTML = `
            <img src="${game.image || 'https://via.placeholder.com/150'}" alt="${game.name}">
            ${game.category === 'tenho' ? '<div class="confere">CONFERE</div>' : ''}
            <h3>${game.name}</h3>
            <div class="link-container">
                ${
                    temLink
                        ? `<a href="${game.link}" target="_blank" class="has-link">🔗 Ver link</a>`
                        : `<span class="no-link">🚫 Sem link</span>`
                }
            </div>
            <div class="actions">
                <button onclick="editar(${index})">✏️ Editar</button>
                <button onclick="remover(${index})">🗑️ Excluir</button>
            </div>
        `;

        const imagem = card.querySelector("img");
        if (imagem) {
            imagem.loading = "lazy";
            imagem.decoding = "async";
            imagem.addEventListener("click", (event) => {
                // No mobile, tocar na capa abre o modal sem conflitar com botões/links do card.
                if (window.matchMedia("(pointer: coarse)").matches) {
                    event.stopPropagation();
                    abrirModalCapa(game);
                }
            });
        }

        card.addEventListener("dblclick", (event) => {
            const clicouEmAcao = event.target.closest(".actions");
            const clicouEmLink = event.target.closest(".link-container a");

            if (clicouEmAcao || clicouEmLink) return;
            abrirModalCapa(game);
        });

        return card;
    }

    function abrirModalCapa(game) {
        if (!coverModal || !coverModalImage || !coverModalTitle) return;

        coverModalImage.src = game.image || "https://via.placeholder.com/300x420";
        coverModalImage.alt = `Capa de ${game.name}`;
        coverModalTitle.textContent = game.name;
        coverModal.classList.add("active");
        coverModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function fecharModalCapa() {
        if (!coverModal || !coverModalImage) return;

        coverModal.classList.remove("active");
        coverModal.setAttribute("aria-hidden", "true");
        coverModalImage.src = "";
        document.body.style.overflow = "";
    }

    if (closeCoverModal) {
        closeCoverModal.addEventListener("click", fecharModalCapa);
    }

    if (coverModal) {
        coverModal.addEventListener("click", (event) => {
            if (event.target === coverModal) {
                fecharModalCapa();
            }
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            fecharModalCapa();
        }
    });

    (async function renderGames() {
        await carregarJogos();
        const categories = document.querySelectorAll(".games");
        categories.forEach(div => div.innerHTML = ""); // limpa

        for (let i = 0; i < jogos.length; i += TAMANHO_LOTE_RENDER) {
            const lote = jogos.slice(i, i + TAMANHO_LOTE_RENDER);
            const fragmentosPorCategoria = {
                caro: document.createDocumentFragment(),
                futuro: document.createDocumentFragment(),
                tenho: document.createDocumentFragment(),
            };

            lote.forEach((game, offset) => {
                const indexOriginal = i + offset;
                const card = criarCardJogo(game, indexOriginal);
                if (fragmentosPorCategoria[game.category]) {
                    fragmentosPorCategoria[game.category].appendChild(card);
                }
            });

            Object.entries(fragmentosPorCategoria).forEach(([categoria, fragment]) => {
                const container = document.getElementById(categoria);
                if (container && fragment.childNodes.length > 0) {
                    container.appendChild(fragment);
                }
            });

            await proximoFrame();
        }

        // === Adiciona filtro de busca AQUI, depois que os cards foram renderizados ===
const searchBar = document.getElementById("searchBar");
if (searchBar) {
    searchBar.addEventListener("input", () => {
        const termo = searchBar.value.toLowerCase();
        document.querySelectorAll(".game-card").forEach(card => {
            const nome = card.querySelector("h3").textContent.toLowerCase();
            card.style.display = nome.includes(termo) ? "" : "none";
        });
    });
}

        // === Configura setas DEPOIS de renderizar os jogos ===
        document.querySelectorAll(".category").forEach(category => {
            const container = category.querySelector(".games");
            const leftArrow = category.querySelector(".arrow.left");
            const rightArrow = category.querySelector(".arrow.right");

            // Adiciona classe scrollable para esconder scrollbar
            container.classList.add("scrollable");

            if (leftArrow && rightArrow && container) {
                leftArrow.addEventListener("click", () => {
                    container.scrollBy({ left: -300, behavior: "smooth" });
                });

                rightArrow.addEventListener("click", () => {
                    container.scrollBy({ left: 300, behavior: "smooth" });
                });
            }
        });
    })();
}

document.querySelectorAll(".games").forEach(container => {
    new Sortable(container, {
        animation: 150,         // animação suave
        ghostClass: "dragging", // estilo do card enquanto arrasta
        direction: "horizontal", // essencial pra arrastar pro lado
        swapThreshold: 0.65,    // mais fácil de trocar posição
        onEnd: async function(evt) {
            // Atualiza a ordem no array 'jogos'
            const parentId = evt.to.id; // categoria
            const cards = Array.from(evt.to.children);
            cards.forEach((card, i) => {
                const nome = card.querySelector("h3").textContent;
                const jogo = jogos.find(j => j.name === nome && j.category === parentId);
                if (jogo) jogo.index = i; // atualiza índice
                salvarJogo(jogo, jogos.indexOf(jogo)); // salva no backend
            });
        }
    });
});

async function editar(index) {
    localStorage.setItem(editIndexKey, index);
    window.location.href = montarUrlComConsole("adicao.html");
}

async function remover(index) {
    if (confirm("Tem certeza que deseja excluir este jogo?")) {
        await deletarJogo(index);
        location.reload();
    }
}
// === SETAS DE NAVEGAÇÃO ===
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".category").forEach(category => {
        const container = category.querySelector(".games");
        const leftArrow = category.querySelector(".arrow.left");
        const rightArrow = category.querySelector(".arrow.right");

        if (leftArrow && rightArrow && container) {
            leftArrow.addEventListener("click", () => {
                container.scrollBy({ left: -300, behavior: "smooth" });
            });

            rightArrow.addEventListener("click", () => {
                container.scrollBy({ left: 300, behavior: "smooth" });
            });
        }
    });
});
