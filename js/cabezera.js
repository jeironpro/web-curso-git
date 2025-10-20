document.addEventListener("DOMContentLoaded", () => {

    const ruta = [
        "primerospasos",
        "gitinit",
        "gitremote",
        "gitconfig",
        "gitstatus",
        "gitadd",
        "gitmv",
        "gitrestore",
        "gitrm",
        "gitclean",
        "gitcommit",
        "gitstash",
        "gitdiff",
        "gitblame",
        "gitlog",
        "gitshow",
        "gitreflog",
        "gitreset",
        "gitrevert",
        "gitbisect",
        "gitpush",
        "gittag",
        "gitbranch",
        "gitcheckout",
        "gitswitch",
        "gitmerge",
        "gitrebase",
        "gitcherrypick",
        "gitgc",
        "gitarchive",
        "gitsubmodule",
        "gitclone",
        "gitpull",
        "gitfetch",
        "pruebafinal"
    ];

    const cabeza = document.querySelector("head");

    const googleIcons = document.createElement("link");
    googleIcons.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined";
    googleIcons.rel = "stylesheet";

    if (!document.querySelector('link[href*="Material+Symbols+Outlined"]')) {
        cabeza.appendChild(googleIcons);
    }

    const titulo = document.querySelector("h1");

    const contenedorPrincipalAnterior = document.createElement("div");
    contenedorPrincipalAnterior.classList.add("contenedor-principal-anterior");
    
    const enlacePrincipal = document.createElement("a");
    enlacePrincipal.href = "../index.html";
    enlacePrincipal.title = "Volver a la página principal";

    const icono = document.createElement("span");
    icono.classList.add("material-symbols-outlined");
    icono.textContent = "home";
    
    enlacePrincipal.appendChild(icono);
    
    contenedorPrincipalAnterior.append(enlacePrincipal);

    const botonAnterior = document.createElement("a");
    botonAnterior.id = "boton-anterior";
    const iconoBotonAnterior = document.createElement("span");
    iconoBotonAnterior.classList.add("material-symbols-outlined");
    iconoBotonAnterior.textContent = "arrow_back";
    botonAnterior.appendChild(iconoBotonAnterior);

    contenedorPrincipalAnterior.appendChild(botonAnterior);

    const botonSiguiente = document.createElement("a");
    botonSiguiente.id = "boton-siguiente";
    const iconoBotonSiguiente = document.createElement("span");
    iconoBotonSiguiente.classList.add("material-symbols-outlined");
    iconoBotonSiguiente.textContent = "arrow_forward";
    botonSiguiente.appendChild(iconoBotonSiguiente);

    titulo.insertAdjacentElement("beforebegin", contenedorPrincipalAnterior);
    titulo.insertAdjacentElement("afterend", botonSiguiente); 

    const paginaActual = window.location.pathname.split("/").pop().replace(".html", "");
    const indice = ruta.indexOf(paginaActual);

    if (indice == 0) {
        botonAnterior.href = `./${ruta[ruta.length -1]}.html`;
        botonSiguiente.href = `./${ruta[indice + 1]}.html`;
    } else if (indice == ruta.length -1) {
        botonAnterior.href = `./${ruta[indice -1]}.html`;
        botonSiguiente.href = `./${ruta[0]}.html`;
    } else {
        botonAnterior.href = `./${ruta[indice -1]}.html`;
        botonSiguiente.href = `./${ruta[indice +1]}.html`;
    }
});