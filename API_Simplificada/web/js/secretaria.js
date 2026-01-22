const url = `http://localhost:3000/`;

// Standard route configuration for consistency
const routeAPI = {
    associacoes: {
        link: true,
        html: "associacao.html",
        param: "id"
    }
};

async function getMethode(router) {
    try {
        const link = `${url}${router}`;
        const res = await axios.get(link);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

function getValueUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

async function getAll() {
    const id = getValueUrl();
    if (id) {
        const secretaria = await getSecretaria(id);
        if (secretaria && secretaria.NOME) {
            await getAssociacoesBySecretaria(secretaria.NOME);
        } else {
            renderAssociacoes([]);
        }
    }
}

async function getSecretaria(id) {
    const idTable = ["id", "nome", "cidade", "estado", "endereco"];
    const columns = [
        { key: "ID", formatter: null },
        { key: "NOME", formatter: null },
        { key: "CIDADE", formatter: null },
        { key: "ESTADO", formatter: null },
        { key: "ENDERECO", formatter: null },
    ];

    const result = await getMethode(`secretarias/${id}`);
    setDados(idTable, columns, result);
    return result;
}

function setDados(idTable, columns, result) {
    if (!result) {
        idTable.forEach(function (elementId) {
            const el = document.getElementById(elementId);
            if (el) el.textContent = "";
        });
        return;
    }

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
}

async function getAssociacoesBySecretaria(nomeSecretaria) {
    try {
        // Fetch associations linked to this secretariat
        const result = await getMethode(`associacoes/secretaria/${encodeURIComponent(nomeSecretaria)}`);
        renderAssociacoes(result);
    } catch (err) {
        console.log('Erro ao buscar associações da secretaria', err);
        renderAssociacoes([]);
    }
}

function renderAssociacoes(data) {
    const columns = ["ID", "NOME", "CATEGORIA"];
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

    data.forEach(item => {
        const tr = document.createElement("tr");
        const id = item.ID || "";

        tr.style.cursor = "pointer";
        tr.setAttribute('tabindex', '0');

        // Link to associacao.html
        tr.addEventListener('click', () => {
            const targetUrl = new URL(`associacao.html?id=${encodeURIComponent(id)}`, location.href).href;
            window.location.href = targetUrl;
        });

        tr.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const targetUrl = new URL(`associacao.html?id=${encodeURIComponent(id)}`, location.href).href;
                window.location.href = targetUrl;
            }
        });

        // Loop through standard columns
        // Note: We need to match the columns array order

        // 1. ID
        const idCell = document.createElement("th");
        idCell.scope = "row";
        idCell.textContent = id;
        tr.appendChild(idCell);

        // 2. NOME
        const nomeCell = document.createElement("td");
        nomeCell.textContent = item.NOME || "";
        tr.appendChild(nomeCell);

        // 3. CATEGORIA
        const catCell = document.createElement("td");
        catCell.textContent = item.CATEGORIA || "";
        tr.appendChild(catCell);

        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
}
