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
    if (id) {
        const produto = await getProduto(id);
        const nome = produto && (produto.NOME || produto.nome);
        if (nome) await getMovimentacoesByProduto(nome);
        return;
    }

    const tipo_produto = getTipoProduto();
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
    // legacy - not used; prefer getMovimentacoesByProduto
}

async function getProduto(id) {
    const idTable = ["prod_id", "prod_nome", "prod_tipo"];
    const columns = [
        { key: "ID", formatter: null },
        { key: "NOME", formatter: null },
        { key: "TIPO_DO_PRODUTO", formatter: null },
    ];

    const result = await getMethode(`produtos/${id}`);
    setDados(idTable, columns, result);
    return result;
}

async function getMovimentacoesByProduto(produtoName) {
    try {
        const resultado = await getMethode(`movimentacoes/produto/${encodeURIComponent(produtoName)}`);
        renderMovimentacoes(resultado);
        return resultado;
    } catch (err) {
        console.log('Erro ao buscar movimentacoes por produto', err);
    }
}

function renderMovimentacoes(data) {
    const tbody = document.getElementById('movimentos-body');
    if (!tbody) return;
    tbody.textContent = '';
    if (!data) return;
    const list = Array.isArray(data) ? data : [data];
    list.forEach(item => {
        const tr = document.createElement('tr');
        tr.style.cursor = 'pointer';
        tr.setAttribute('tabindex', '0');
        tr.addEventListener('click', () => {
            const targetUrl = new URL(`movimentacao.html?id=${encodeURIComponent(item.ID)}`, location.href).href;
            window.location.href = targetUrl;
        });
        tr.addEventListener('keydown', (e) => { if (e.key === 'Enter') { const targetUrl = new URL(`movimentacao.html?id=${encodeURIComponent(item.ID)}`, location.href).href; window.location.href = targetUrl; } });

        const cols = [
            item.ID || '',
            item.DAP || '',
            item.QNT_PRODUZIDA == null ? '' : item.QNT_PRODUZIDA,
            item.VLR_UNITARIO == null ? '' : item.VLR_UNITARIO,
            item.DATA_MOVIMENTACAO ? item.DATA_MOVIMENTACAO.split('T')[0] : '',
            item.LATITUDE || '',
            item.LONGITUDE || ''
        ];

        cols.forEach(c => {
            const td = document.createElement('td');
            td.textContent = c;
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });
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