const url = `http://localhost:3000/`;

const routeAPI = {
    pessoas: {
        link: true,
        html: "pessoa.html",
        param: "id"
    },
    "agricultura-familiar": {
        link: true,
        html: "pessoa.html",
        param: "id"
    },
    "tipos-produtos": {
        link: true,
        html: "tipo.html",
        param: "id"
    },
    produtos: {
        link: true,
        html: "produto.html",
        param: "id"
    },
    associacoes: {
        link: true,
        html: "associacao.html",
        param: "id"
    },
    associados: {
        link: true,
        html: "pessoa.html",
        param: "id"
    },
    movimentacoes: {
        link: true,
        html: "movimentacao.html",
        param: "id"
    },
    secretarias: {
        link: true,
        html: "secretaria.html",
        param: "id"
    },
    programas: {
        link: true,
        html: "programa.html",
        param: "id"
    },
};

async function getMethode(router) {
    try {
        const link = `${url}${router}`;
        const res = await axios.get(link);
        return res.data;
    } catch (error) {
        console.log(error);
    };
};

async function getAgriculturaFamiliar() {
    setActiveTab("agricultura-familiar");

    const columns = [
        { key: "ID", formatter: null },
        { key: "NOME", formatter: null },
        { key: "CAF", formatter: null },
        { key: "PROGRAMA", formatter: null },
        { key: "DAP", formatter: null },
    ];

    return createTable("agricultura-familiar", columns);
};

async function getPessoas() {
    setActiveTab("pessoas");

    const columns = [
        { key: "ID", formatter: null },
        { key: "NOME", formatter: null },
        { key: "CPF", formatter: null },
        { key: "GENERO", formatter: null },
        { key: "DATA_NASCIMENTO", formatter: value => value.split("T")[0] },
    ];

    return createTable("pessoas", columns);
};

async function getAssociacoes() {
    setActiveTab("associacoes");

    const columns = [
        { key: "ID", formatter: null },
        { key: "NOME", formatter: null },
        { key: "CATEGORIA", formatter: null },
        { key: "SECRETARIA", formatter: null },
    ];

    return createTable("associacoes", columns);
};

async function getAssociados() {
    setActiveTab("associados");

    const columns = [
        { key: "ID", formatter: null },
        { key: "NOME", formatter: null },
        { key: "CPF", formatter: null },
        { key: "CAF", formatter: null },
        { key: "VALIDADE_CAF", formatter: value => value.split("T")[0] },
        { key: "ASSOCIACAO", formatter: null },
        { key: "DAP", formatter: null },
    ];

    return createTable("associados", columns);
};

async function getCategorias() {
    setActiveTab("categorias");

    const columns = [
        { key: "ID", formatter: null },
        { key: "NOME", formatter: null },
    ];

    return createTable("categorias", columns);
};

async function getLocalizacoes() {
    setActiveTab("localizacoes");

    const columns = [
        { key: "ID", formatter: null },
        { key: "NOME", formatter: null },
        { key: "ASSOCIACAO", formatter: null },
        { key: "LATITUDE", formatter: null },
        { key: "LONGITUDE", formatter: null },
        { key: "TITULO", formatter: null },
        { key: "DESCRICAO", formatter: null },
    ];

    return createTable("localizacoes", columns);
};

async function getMovimentacoes() {
    setActiveTab("movimentacoes");

    const columns = [
        { key: "ID", formatter: null },
        { key: "DAP", formatter: null },
        { key: "PRODUTO", formatter: null },
        { key: "QNT_PRODUZIDA", formatter: null },
        { key: "VLR_UNITARIO", formatter: null },
        { key: "DATA_MOVIMENTACAO", formatter: value => value.split("T")[0] },
        { key: "LATITUDE", formatter: null },
        { key: "LONGITUDE", formatter: null },
    ];

    return createTable("movimentacoes", columns);
};

async function getProgramas() {
    setActiveTab("programas");

    const columns = [
        { key: "ID", formatter: null },
        { key: "NOME", formatter: null },
        { key: "DESCRICAO", formatter: null },
        { key: "DATA_INICIO", formatter: value => value.split("T")[0] },
        { key: "DATA_FIM", formatter: value => value.split("T")[0] },
        { key: "ORIGEM_RECURSO", formatter: null },
        { key: "VLR_REPASSE", formatter: null },
        { key: "SECRETARIA", formatter: null },
        { key: "ESTADO", formatter: null },
    ];

    return createTable("programas", columns);
};

async function getSecretarias() {
    setActiveTab("secretarias");

    const columns = [
        { key: "ID", formatter: null },
        { key: "NOME", formatter: null },
        { key: "CIDADE", formatter: null },
        { key: "ESTADO", formatter: null },
        { key: "ENDERECO", formatter: null },
    ];

    return createTable("secretarias", columns);
};

async function getProdutos() {
    setActiveTab("produtos");

    const columns = [
        { key: "ID", formatter: null },
        { key: "NOME", formatter: null },
        { key: "TIPO_DO_PRODUTO", formatter: null },
    ];

    return createTable("produtos", columns);
};

async function getTiposProduto() {
    setActiveTab("tipos-produtos");

    const columns = [
        { key: "ID", formatter: null },
        { key: "NOME", formatter: null },
    ];

    return createTable("tipos-produtos", columns);
};


const tabFunctions = {
    "agricultura-familiar": getAgriculturaFamiliar,
    "pessoas": getPessoas,
    "associacoes": getAssociacoes,
    "associados": getAssociados,
    "categorias": getCategorias,
    "localizacoes": getLocalizacoes,
    "produtos": getProdutos,
    "movimentacoes": getMovimentacoes,
    "programas": getProgramas,
    "secretarias": getSecretarias,
    "tipos-produtos": getTiposProduto
};

function setActiveTab(activeTab) {
    const tabs = Object.keys(tabFunctions);

    tabs.forEach(tab => {
        // Sidebar marker
        const tabElement = document.getElementById(tab);
        if (tabElement) tabElement.classList.remove("active");

        // Dropdown marker
        const dropdownItems = document.querySelectorAll(`.dropdown-item[href*="tab=${tab}"]`);
        dropdownItems.forEach(item => item.classList.remove("active"));
    });

    // Sidebar marker
    const activeEl = document.getElementById(activeTab);
    if (activeEl) activeEl.classList.add("active");

    // Dropdown marker
    const activeDropdownItems = document.querySelectorAll(`.dropdown-item[href*="tab=${activeTab}"]`);
    activeDropdownItems.forEach(item => item.classList.add("active"));
}

function loadTabFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");

    if (tab && tabFunctions[tab]) {
        tabFunctions[tab]();
    } else {
        // Default
        getAgriculturaFamiliar();
    }
}

async function createTable(endpoint, columns) {

    const data = await getMethode(endpoint);
    const list = document.getElementById("data");
    list.textContent = "";

    // Set Table Title
    const titleEl = document.getElementById("table-title");
    const menuItem = document.getElementById(endpoint);
    if (titleEl && menuItem) {
        titleEl.innerText = menuItem.innerText.trim();
    }

    createHead(columns);

    const body = document.createElement("tbody");
    body.classList.add("table-group-divider");

    data.forEach(item => {
        const row = createRow(item, columns, endpoint);
        body.appendChild(row);
    });

    list.appendChild(body);
};

function createHead(columns) {
    const head = document.createElement("thead");
    const row = document.createElement("tr");

    columns.forEach(column => {
        const cell = createCell("th", column.key, true, false);
        row.appendChild(cell);
    });

    head.appendChild(row);
    document.getElementById("data").appendChild(head);
};

function createRow(data, columns, endpoint) {
    const row = document.createElement("tr");

    if (data) {
        row.setAttribute("id", data.ID);

        const route = routeAPI[endpoint];
        if (route && route.link) {
            const id = data.ID || "";
            row.style.cursor = "pointer";
            row.setAttribute('tabindex', '0');
            row.addEventListener('click', () => {
                const targetUrl = new URL(`${route.html}?${route.param}=${encodeURIComponent(id)}`, location.href).href;
                window.open(targetUrl, '_blank');
            });
            row.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const targetUrl = new URL(`${route.html}?${route.param}=${encodeURIComponent(id)}`, location.href).href;
                    window.open(targetUrl, '_blank');
                }
            });
        }
        columns.forEach(column => {
            let value = data[column.key];

            if (column.formatter) {
                value = column.formatter(value);
            };

            const cell = createCell("td", value, false, true, data.ID, endpoint);
            row.appendChild(cell);
        });
    };
    return row;
};

function createCell(tag, value, header = false, tbody = false, id, endpoint) {
    const cell = document.createElement(tag);
    const route = routeAPI[endpoint];

    if (header) {
        cell.setAttribute("scope", "row");
        cell.textContent = value;
        return cell;
    };

    if (tbody) {
        cell.setAttribute("scope", "col");
    };

    if (tag == "td" && route && route.link) {
        const link = document.createElement("a");
        const html = route.html;
        const param = route.param;

        link.setAttribute("class", "nav-link");
        link.setAttribute("href", `${html}?${param}=${id}`);
        link.setAttribute("target", "_blank");
        link.textContent = value;
        cell.appendChild(link);
    } else {
        cell.textContent = value;
    };

    return cell;
};