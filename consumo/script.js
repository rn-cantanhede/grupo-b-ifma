const url = `http://localhost:3000/`;

getAgriculturaFamiliar();

async function getMethode(router) {
    const link = `${url}${router}`;
    const res = await axios.get(link);
    return res.data;
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

    return createTable("localizacoes-dos-beneficiados", columns);
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
    setActiveTab("produdos");

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


function setActiveTab(activeTab) {
    const tabs = ["agricultura-familiar", "pessoas", "associacoes",
        "associados", "categorias", "localizacoes", "movimentacoes",
        "produdos", "programas", "secretarias", "tipos-produtos"];

    tabs.forEach(tab => {
        const tabElement = document.getElementById(tab);
        tabElement.classList.remove("active");
    });

    document.getElementById(activeTab).classList.add("active");
};

async function createTable(endpoint, columns) {
    try {
        const data = await getMethode(endpoint);
        const list = document.getElementById("data");
        list.textContent = "";

        createHead(columns);

        const body = document.createElement("tbody");

        data.forEach(item => {
            const row = createRow(item, columns);
            body.appendChild(row);
        });

        list.appendChild(body);
    } catch (error) {
        console.log(error);
    };
};

function createHead(columns) {
    const head = document.createElement("thead");
    const row = document.createElement("tr");

    columns.forEach(column => {
        const cell = createCell("th", column.key, false, true);
        row.appendChild(cell);
    });

    head.appendChild(row);
    document.getElementById("data").appendChild(head);
};

function createRow(data, columns) {
    const row = document.createElement("tr");

    if (data) {
        row.setAttribute("id", data.ID);

        columns.forEach(column => {
            let value = data[column.key];

            if (column.formatter) {
                value = column.formatter(value);
            };

            const cell = createCell("td", value);
            row.appendChild(cell);
        });
    };
    return row;
};

function createCell(tag, value, header = false, tbody = false) {
    const cell = document.createElement(tag);
    const link = document.createElement("a");

    if (header) {
        cell.setAttribute("scope", "row");
    };

    if (tbody) {
        cell.setAttribute("scope", "col");
    };

    //Faze de testes
    // if (tag == "td") {
    //     console.log(tag);
    //     cell.appendChild(link);
    //     link.setAttribute("href", `${url}agricultura-familiar/${value}`);
    //     link.textContent = value;
    // } else {
    //     cell.textContent = value;
    // };

    cell.textContent = value;

    return cell;
};