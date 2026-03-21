// NavBar & Footer

fetch("navbar.html").then(r => r.text()).then(h => navbar.innerHTML = h);
fetch("footer.html").then(r => r.text()).then(h => footer.innerHTML = h);

// Skill Swiper

document.addEventListener("DOMContentLoaded", function () {
    const skillSwiperElement = document.querySelector(".skillSwiper");

    if (skillSwiperElement) {
        new Swiper(".skillSwiper", {
            loop: true,
            spaceBetween: 24,
            slidesPerView: 1,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            breakpoints: {
                768: {
                    slidesPerView: 2
                },
                992: {
                    slidesPerView: 3
                }
            }
        });
    }

    laadOefeningen();
});

// .NET pagina insert html foreach TXT doc.

const oefeningen = [
    {
        type: "Sequentie",
        beschrijving: "Schrijf een programma dat een getal inleest.\nDaarna wordt het kwadraat afgedrukt van dit getal.\nDruk ook het kwadraat van de buren van dit getal af.",
        code: "TXT/DotNet/sequentie.txt",
    },
    {
        type: "Selectie",
        beschrijving: "Schrijf een programma dat voor een bepaald coördinaat bepaalt in welk kwadrant dit ligt.\nDe gebruiker geeft een X-coördinaat in.\nDe gebruiker geeft een Y-coördinaat in.\nHet programma bepaalt vervolgens het juiste kwadrant.",
        code: "TXT/DotNet/selectie.txt",
    },
    {
        type: "For Loop",
        beschrijving: "Lees 2 symbolen in.\nVraag daarna een lengte.\nVraag daarna een breedte.\nDruk vervolgens een sjaal af met de ingevoerde symbolen, lengte en breedte.",
        code: "TXT/DotNet/forLoop.txt",
    },
    {
        type: "Do While",
        beschrijving: "Lees voor 3 pijlen de landingsplaats.\nGeef vervolgens het totaal van de punten weer.\nIngevoerde waardes moeten gehele getallen zijn.\nDe waarden moeten groter zijn dan 0 en kleiner of gelijk aan 4.\nNa een correcte invoer wordt een nieuw scherm getoond.\n\nBuiten de roos: 0 punten (landingsplaats 1)\nBinnenste ring: 20 punten (landingsplaats 2)\nBuitenste ring: 50 punten (landingsplaats 3)\nIn het hart: 100 punten (landingsplaats 4)",
        code: "TXT/DotNet/doWhile.txt",
    },
    {
        type: "While Do",
        beschrijving: "Vraag de gebruiker om een tafel in te geven.\nDe gebruiker kan dit blijven doen tot het getal 0 wordt ingegeven.\nWe tonen van elk ingegeven getal de tafel van 10.",
        code: "TXT/DotNet/whileDo.txt",
    },
    {
        type: "Collecties",
        beschrijving: "Schrijf een programma dat de gebruiker vraagt om woorden in te geven.\nDeze woorden steek je in een lijst.\n\nPrint daarna het kortste woord.\nPrint ook het langste woord.\n\nPrint vervolgens de som af van de posities van het kortste en het langste woord in de lijst.",
        code: "TXT/DotNet/collecties.txt",
    },
];

const container = document.getElementById("dotnetOefeningen");

const controlKeywords = new Set([
    "if", "else", "for", "foreach", "while", "do", "switch", "case", "default",
    "break", "continue", "return", "throw", "try", "catch", "finally", "goto",
    "lock", "yield", "await", "namespace", "using", "new", "when"
]);

const typeKeywords = new Set([
    "bool", "byte", "char", "decimal", "double", "float", "int", "long", "object",
    "sbyte", "short", "string", "uint", "ulong", "ushort", "void", "var", "dynamic",
    "class", "struct", "interface", "enum", "delegate", "record", "public", "private",
    "protected", "internal", "static", "readonly", "const", "sealed", "abstract",
    "virtual", "override", "partial", "extern", "volatile", "unsafe", "async", "ref",
    "out", "in", "params", "typeof", "sizeof", "nameof", "is", "as", "checked",
    "unchecked", "explicit", "implicit", "operator", "stackalloc", "fixed", "null",
    "true", "false", "this", "base", "get", "set", "init", "add", "remove", "value",
    "event", "with"
]);

function appendToken(parent, text, className = "") {
    if (!text) return;

    if (className) {
        const span = document.createElement("span");
        span.className = className;
        span.textContent = text;
        parent.appendChild(span);
        return;
    }

    parent.appendChild(document.createTextNode(text));
}

function getNextSignificantChar(text, index) {
    for (let i = index; i < text.length; i++) {
        if (!/\s/.test(text[i])) {
            return text[i];
        }
    }
    return "";
}

function getPrevSignificantChar(text, index) {
    for (let i = index; i >= 0; i--) {
        if (!/\s/.test(text[i])) {
            return text[i];
        }
    }
    return "";
}

function renderPlainCode(parent, text) {
    const regex = /\b(0x[0-9a-fA-F_]+[uUlL]*|0b[01_]+[uUlL]*|[0-9][0-9_]*(\.[0-9_]+)?([eE][+-]?[0-9_]+)?[fFdDmMlLuU]*)\b|\b([A-Za-z_][A-Za-z0-9_]*)\b/g;

    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
        appendToken(parent, text.slice(lastIndex, match.index));

        const token = match[0];

        if (match[1]) {
            appendToken(parent, token, "cs-number");
        } else {
            const nextChar = getNextSignificantChar(text, regex.lastIndex);
            const prevChar = getPrevSignificantChar(text, match.index - 1);

            if (controlKeywords.has(token)) {
                appendToken(parent, token, "cs-keyword-control");
            } else if (typeKeywords.has(token)) {
                appendToken(parent, token, "cs-keyword-type");
            } else if (nextChar === "(") {
                appendToken(parent, token, "cs-method");
            } else if (prevChar === "." && /^[A-Z]/.test(token)) {
                appendToken(parent, token, "cs-method");
            } else if (nextChar === "." && /^[A-Z]/.test(token)) {
                appendToken(parent, token, "cs-type");
            } else if (/^[A-Z]/.test(token)) {
                appendToken(parent, token, "cs-type");
            } else {
                appendToken(parent, token, "cs-variable");
            }
        }

        lastIndex = regex.lastIndex;
    }

    appendToken(parent, text.slice(lastIndex));
}

function renderHighlightedCode(codeElement, code) {
    codeElement.innerHTML = "";

    const tokenRegex = /(\/\*[\s\S]*?\*\/|\/\/.*$|^\s*#.*$|\$@\"[\s\S]*?\"|@\"[\s\S]*?\"|\$\"(?:\\.|[^"\\])*\"|\"(?:\\.|[^"\\])*\"|'(?:\\.|[^'\\])*')/gm;

    let lastIndex = 0;
    let match;

    while ((match = tokenRegex.exec(code)) !== null) {
        renderPlainCode(codeElement, code.slice(lastIndex, match.index));

        const token = match[0];

        if (token.startsWith("/*") || token.startsWith("//")) {
            appendToken(codeElement, token, "cs-comment");
        } else if (token.trimStart().startsWith("#")) {
            appendToken(codeElement, token, "cs-preprocessor");
        } else {
            appendToken(codeElement, token, "cs-string");
        }

        lastIndex = tokenRegex.lastIndex;
    }

    renderPlainCode(codeElement, code.slice(lastIndex));
}

async function laadOefeningen() {
    if (!container) return;

    for (const oefening of oefeningen) {
        const kaart = document.createElement("article");
        kaart.className = "mb-4 mb-lg-5";

        kaart.innerHTML = `
            <div class="row g-4 align-items-start">
                <div class="col-12 col-lg-4">
                    <div class="p-4 text-bg-dark rounded-4 overflow-hidden d-inline-block w-100">
                        <p class="label mb-2">Oefening | C#</p>
                        <h2 class="h4 mb-3">${oefening.type}</h2>
                        <p class="mb-0" style="white-space: pre-line;">${oefening.beschrijving}</p>
                    </div>
                </div>

                <div class="col-12 col-lg-8">
                    <div class="text-bg-dark rounded-4 overflow-hidden">
                        <div class="px-4 pt-3 pb-2 border-bottom">
                            <div class="d-flex align-items-center gap-2">
                                <span class="rounded-circle bg-danger d-inline-block opacity-75" style="width:10px; height:10px;"></span>
                                <span class="rounded-circle bg-warning d-inline-block opacity-75" style="width:10px; height:10px;"></span>
                                <span class="rounded-circle bg-success d-inline-block opacity-75" style="width:10px; height:10px;"></span>
                            </div>
                        </div>

                        <div class="p-4">
                            <pre class="mb-0 overflow-auto code-editor"><code></code></pre>
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(kaart);

        const codeElement = kaart.querySelector("code");

        try {
            const response = await fetch(oefening.code);
            const text = await response.text();
            renderHighlightedCode(codeElement, text);
        } catch {
            codeElement.textContent = "Code kon niet geladen worden.";
        }
    }
}