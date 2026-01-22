const url = `http://localhost:3000/`;

// Cache for DAP -> Producer Name to avoid redundant API calls
const dapCache = {};

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
    return params.get("id");
};

async function getAll() {
    const id = getValueUrl();
    const tipo = await getTipo(id);

    if (tipo && tipo.NOME) {
        // 1. Get all products to find which ones belong to this Type
        const allProdutos = await getMethode('produtos');

        let productNames = [];
        if (Array.isArray(allProdutos)) {
            // Filter products where TIPO_DO_PRODUTO matches the current Tipo's NOME
            const filteredProdutos = allProdutos.filter(p => p.TIPO_DO_PRODUTO === tipo.NOME);
            productNames = filteredProdutos.map(p => p.NOME);

            console.log(`Produtos do tipo ${tipo.NOME}:`, productNames);
        }

        if (productNames.length > 0) {
            // 2. Get all movements
            const allMovimentacoes = await getMethode('movimentacoes');

            // 3. Filter movements for these products
            if (Array.isArray(allMovimentacoes)) {
                const filteredMovimentacoes = allMovimentacoes.filter(m => productNames.includes(m.PRODUTO));
                console.log("Movimentações filtradas:", filteredMovimentacoes);
                await renderMovimentacoes(filteredMovimentacoes); // Now async to fetch names
            } else {
                renderMovimentacoes([]);
            }
        } else {
            console.log("Nenhum produto encontrado para este tipo.");
            renderMovimentacoes([]);
        }
    }
};

async function getTipo(id) {
    const idTable = ["id", "nome"];
    const columns = [
        { key: "ID", formatter: null },
        { key: "NOME", formatter: null },
    ];

    const result = await getMethode(`tipos-produtos/${id}`);
    setDados(idTable, columns, result);
    return result;
};

function setDados(idTable, columns, result) {
    if (!result) {
        idTable.forEach(function (elementId) {
            const el = document.getElementById(elementId);
            if (el) el.textContent = "";
        });
        return;
    };

    const cut = columns.map(col => (typeof col === "string" ? { key: col, formatter: null } : { key: col.key, formatter: col.formatter || null }));

    idTable.forEach(function (elementId, index) {
        const value = document.getElementById(elementId);
        const column = cut[index];

        if (!column) {
            if (value) value.textContent = "";
            return;
        }

        const raw = result[column.key];
        const display = column.formatter && typeof column.formatter === "function" ? column.formatter(raw) : raw == null ? "" : String(raw);

        if (value) value.textContent = display;
    });
};

// Helper to fetch producer name by DAP
async function getProducerName(dap) {
    if (!dap) return "";
    if (dapCache[dap]) return dapCache[dap];

    try {
        const associados = await getMethode(`associados/dap/${encodeURIComponent(dap)}`);
        const assoc = Array.isArray(associados) ? (associados[0] || null) : (associados || null);

        let name = "";
        if (assoc) {
            name = assoc.NOME || assoc.NOME_PESSOA || "";
        }

        dapCache[dap] = name;
        return name;
    } catch (e) {
        console.log(`Erro ao buscar nome para DAP ${dap}`, e);
        return "";
    }
}

async function renderMovimentacoes(data) {
    // Columns to display for movements, including Producer
    const columns = ["ID", "PRODUTO", "DAP", "PRODUTOR", "QUANTIDADE", "VALOR", "DATA"];
    const table = document.getElementById("data");
    if (!table) return;

    table.textContent = "";

    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    columns.forEach(col => {
        const th = document.createElement("th");
        th.scope = "col";
        th.textContent = col;
        headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    if (!Array.isArray(data)) data = data ? [data] : [];

    for (const item of data) {
        const tr = document.createElement("tr");
        const id = item.ID || "";

        tr.style.cursor = "pointer";
        tr.setAttribute('tabindex', '0');

        tr.addEventListener('click', () => {
            const targetUrl = new URL(`movimentacao.html?id=${encodeURIComponent(id)}`, location.href).href;
            window.location.href = targetUrl;
        });

        tr.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const targetUrl = new URL(`movimentacao.html?id=${encodeURIComponent(id)}`, location.href).href;
                window.location.href = targetUrl;
            }
        });

        // Resolve Producer Name asynchronously
        const producerName = await getProducerName(item.DAP);

        // ID
        const idCell = document.createElement("th");
        idCell.scope = "row";
        idCell.textContent = id;
        tr.appendChild(idCell);

        // Produto Name
        const prodCell = document.createElement("td");
        prodCell.textContent = item.PRODUTO || "";
        tr.appendChild(prodCell);

        // DAP
        const dapCell = document.createElement("td");
        dapCell.textContent = item.DAP || "";
        tr.appendChild(dapCell);

        // Produtor Name
        const produtorCell = document.createElement("td");
        produtorCell.textContent = producerName || "";
        tr.appendChild(produtorCell);

        // Qtd
        const qtdCell = document.createElement("td");
        qtdCell.textContent = item.QNT_PRODUZIDA || "";
        tr.appendChild(qtdCell);

        // Valor
        const valCell = document.createElement("td");
        valCell.textContent = item.VLR_UNITARIO || "";
        tr.appendChild(valCell);

        // Data
        const dataCell = document.createElement("td");
        dataCell.textContent = item.DATA_MOVIMENTACAO ? item.DATA_MOVIMENTACAO.split("T")[0] : "";
        tr.appendChild(dataCell);

        tbody.appendChild(tr);
    }

    table.appendChild(tbody);
};
