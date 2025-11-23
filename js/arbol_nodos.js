// Lista de nodos
let nodosData = [];

// Contenedor de los nodos
const arbolObj = document.getElementById("arbol");

// Espaciado vertical entre niveles
const espaciado = 200;

// Función para renderizar nodos dinámicamente
function renderizarArbol() {
    arbolObj.replaceChildren();

    const niveles = {};
    nodosData.forEach(nodo => {
        if (!niveles[nodo.nivel]) niveles[nodo.nivel] = [];
        niveles[nodo.nivel].push(nodo);
    });

    // Calcular posiciones
    Object.keys(niveles).forEach(claveLevel => {
        const nivelNodos = niveles[claveLevel];
        const contadores = { left: 0, right: 0, center: 0 };

        nivelNodos.forEach(n => {
            n.top = n.nivel * espaciado + 50;

            // Si tiene padre, ajustar posición relativa
            if (n.padreId) {
                const pariente = nodosData.find(p => p.id === n.padreId);

                if (n.posicion === "left") {
                    n.left = pariente.left - 25 - contadores.left * 5;
                } else if (n.posicion === "right") {
                    n.left = pariente.left + 25 + contadores.right * 5;
                } else {
                    n.left = pariente.left;
                }
            } else {
                // Posición base (sin padre)
                if (n.posicion === "center") n.left = 50;
                else if (n.posicion === "left") n.left = 25 - contadores.left * 5;
                else if (n.posicion === "right") n.left = 75 + contadores.right * 5;
            }

            // Mantener dentro del contenedor (en %)
            n.left = Math.max(5, Math.min(95, n.left));

            // Actualizar contadores
            contadores[n.posicion]++;
        });
    });

    // Crear nodos
    nodosData.forEach(nodo => {
        const nodoObj = document.createElement("a");
        nodoObj.classList.add("nodo");
        nodoObj.style.top = nodo.top + "px";
        nodoObj.style.left = nodo.left + "%";
        nodoObj.style.transform = "translate(-50%, -50%)";
        nodoObj.href = nodo.enlace || "#";

        const tituloObj = document.createElement("span");
        tituloObj.classList.add("titulo");
        tituloObj.innerText = nodo.titulo;
        nodoObj.appendChild(tituloObj);
        arbolObj.appendChild(nodoObj);
    });

    // Crear líneas
    nodosData.forEach(nodo => {
        if (nodo.padreId) {
            const padre = nodosData.find(p => p.id === nodo.padreId);
            if (padre) {
                const linea = document.createElement("div");
                linea.classList.add("linea");

                // Coordenadas absolutas (en px)
                const padreLeft = (padre.left / 100) * arbolObj.offsetWidth;
                const padreTop = padre.top;
                const hijoLeft = (nodo.left / 100) * arbolObj.offsetWidth;
                const hijoTop = nodo.top;

                // Diferencias
                const dx = hijoLeft - padreLeft;
                const dy = hijoTop - padreTop;
                const anguloRad = Math.atan2(dy, dx);
                const anguloDeg = anguloRad * (180 / Math.PI);

                // Ajustar para que la línea toque los bordes (radio = 25px)
                const offset = 25;
                const startX = padreLeft + Math.cos(anguloRad) * offset;
                const startY = padreTop + Math.sin(anguloRad) * offset;
                const endX = hijoLeft - Math.cos(anguloRad) * offset;
                const endY = hijoTop - Math.sin(anguloRad) * offset;

                const nuevaDistancia = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);

                // Aplicar estilos
                linea.style.width = nuevaDistancia + "px";
                linea.style.transform = `rotate(${anguloDeg}deg)`;
                linea.style.top = startY + "px";
                linea.style.left = startX + "px";

                arbolObj.appendChild(linea);
            }
        }
    });
}

const limpiarCadena = str =>
    str.normalize("NFD")
       .replace(/[\u0300-\u036f]/g, "")
       .replace(/ /g, "")
       .replace(/\-/g, "")
       .toLowerCase();

// Función para agregar nodo dinámicamente con padreId
function agregarNodo(id, titulo, nivel, posicion, padreId, enlace) {
    if (enlace == "") {
        enlace = `html/${limpiarCadena(titulo)}.html`
    }
    nodosData.push({ id, titulo, nivel, posicion, padreId, enlace });
}

// Inicializar árbol
agregarNodo("center", "Primeros pasos", 0, "center", null, "");
agregarNodo("centerInit", "Git init", 1, "center", "center", "");
agregarNodo("leftClone", "Git clone", 1, "left", "centerInit", "");
agregarNodo("rightRemote", "Git remote", 1, "right", "centerInit", "");
agregarNodo("centerConfig", "Git config", 2, "center", "centerInit", "");
agregarNodo("centerStatus", "Git status", 3, "center", "centerInit", "");
agregarNodo("centerAdd", "Git add", 4, "center", "centerInit", "");
agregarNodo("leftRestore", "Git restore", 4, "left", "centerAdd", "");
agregarNodo("leftRm", "Git rm", 5, "left", "leftRestore", "");
agregarNodo("leftClean", "Git clean", 4, "left", "leftRestore", "");
agregarNodo("rightMv", "Git mv", 4, "right", "centerAdd", "");
agregarNodo("centerCommit", "Git commit", 5, "center", "centerInit", "");
agregarNodo("leftBlame", "Git blame", 5, "left", "centerCommit", "");
agregarNodo("leftLog", "Git log", 6, "left", "centerCommit", "");
agregarNodo("leftShow", "Git show", 6, "left", "leftLog", "");
agregarNodo("leftReflog", "Git reflog", 7, "left", "leftLog", "");
agregarNodo("rightStash", "Git stash", 5, "right", "centerCommit", "");
agregarNodo("rightDiff", "Git diff", 5, "right", "rightStash", "");
agregarNodo("rightPull", "Git pull", 6, "right", "centerCommit", "");
agregarNodo("rightPush", "Git push", 6, "right", "rightPull", "");
agregarNodo("rightTag", "Git tag", 7, "right", "rightPush", "");
agregarNodo("centerFetch", "Git fetch", 7, "center", "rightPull", "");
agregarNodo("leftReset", "Git reset", 7, "left", "centerCommit", "");
agregarNodo("leftRevert", "Git revert", 8, "left", "leftReset", "");
agregarNodo("centerBisect", "Git bisect", 9, "center", "leftRevert", "");
agregarNodo("centerBranch", "Git branch", 6, "center", "centerInit", "");
agregarNodo("rightCheckout", "Git checkout", 8, "right", "centerBranch", "");
agregarNodo("rightSwitch", "Git switch", 8, "right", "rightCheckout", "");
agregarNodo("leftMerge", "Git cherry-pick", 8, "left", "centerBranch", "");
agregarNodo("rightMerge", "Git merge", 9, "right", "centerBranch", "");
agregarNodo("rightRebase", "Git rebase", 9, "right", "rightMerge", "");
agregarNodo("centerGc", "Git gc", 7, "center", "centerInit", "");
agregarNodo("centerArchive", "Git archive", 8, "center", "centerInit", "");
agregarNodo("centerSubmodule", "Git submodule", 9, "center", "centerInit", "");
agregarNodo("centerPruebaFinal", "Prueba final", 10, "center", "centerInit", "");

function espaciadoArbolFooter() {
    // Espaciado entre el arbol y el footer
    const arbol = document.getElementById("arbol");
    const nodos = arbol.querySelectorAll(".nodo");
    let espacioMainFooter = 0;
    
    nodos.forEach(nodo => {
      const bottom = nodo.offsetTop + nodo.offsetHeight;
      if (bottom > espacioMainFooter) espacioMainFooter = bottom;
    });

    arbol.style.height = `${espacioMainFooter + 50}px`;
}

document.addEventListener("DOMContentLoaded", () => {
    renderizarArbol();
    espaciadoArbolFooter();

    // Redibujar al cambiar tamaño de ventana
    let timeout;
    window.addEventListener("resize", () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            renderizarArbol();
            espaciadoArbolFooter();
        }, 100);
    });
});