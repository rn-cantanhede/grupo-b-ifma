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
        html: "tipos-de-produtos.html",
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

function getValueUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    return id;
};

async function getAll() {
    const id = getValueUrl();
    const tipo_produto = getTipoProduto(id);
    const produto = getProdutos();
};

async function getTipoProduto(id) {
    const idTable = ["id", "nome"];
    const columns = [
        { key: "ID", formatter: null },
        { key: "NOME", formatter: null },
    ];

    const result = await getMethode(`tipos-produtos/${id}`);

    setDados(idTable, columns, result);

    return result
};

async function getMovimentacoes(dap) {
    const idTable = ["produdo", "produzida", "unitario", "movimentacao"];
    const columns = [
        { key: "PRODUTO", formatter: null },
        { key: "QNT_PRODUZIDA", formatter: null },
        { key: "VLR_UNITARIO", formatter: null },
        { key: "DATA_MOVIMENTACAO", formatter: value => value.split("T")[0] },
    ];
    const result = await getMethode(`movimentacoes/dap/${dap}`);

    setDados(idTable, columns, result);
    total(result);

    return result;
};


async function getProdutos() {
     const columns = [
        { key: "ID", formatter: null },
        { key: "NOME", formatter: null },
    ];

    return createTable("produtos", columns);
};

function setDados(idTable, columns, result) {

    const cut = columns.map(col => {
        if (typeof col == "string") {
            return { key: col, formatter: null };
        };
        return { key: col.key, formatter: col.formatter || null };
    });

    idTable.forEach(function (elementId, index) {
        const value = document.getElementById(elementId);
        const column = cut[index];
        const raw = result[column.key];
        let display;

        if (!column) {
            value.textContent = "";
            return;
        };

        if (column.formatter && typeof column.formatter == "function") {
            display = column.formatter(raw);
        } else {
            display = raw == null ? "" : String(raw);
        };
        
        value.textContent = display;
    });
};

async function createTable(endpoint, columns) {

    const data = await getMethode(endpoint);
    const list = document.getElementById("data");
    list.textContent = "";

    createHead(columns);

    const body = document.createElement("tbody");

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
        link.textContent = value;
        cell.appendChild(link);
    } else {
        cell.textContent = value;
    };

    return cell;
};