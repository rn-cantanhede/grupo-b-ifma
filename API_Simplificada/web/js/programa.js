const url = `http://localhost:3000/`;

// Standard route configuration
const routeAPI = {
    "agricultura-familiar": {
        link: true,
        html: "pessoa.html", // Assuming it links to generic person details or creating a specific one if needed
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
        const programa = await getPrograma(id);
        if (programa && programa.NOME) {
            await getBeneficiariosByPrograma(programa.NOME);
        } else {
            renderBeneficiarios([]);
        }
    }
}

async function getPrograma(id) {
    const idTable = ["id", "nome", "descricao", "data_inicio", "data_fim", "origem", "valor", "secretaria", "estado"];
    const columns = [
        { key: "ID", formatter: null },
        { key: "NOME", formatter: null },
        { key: "DESCRICAO", formatter: null },
        { key: "DATA_INICIO", formatter: value => value ? value.split("T")[0] : "" },
        { key: "DATA_FIM", formatter: value => value ? value.split("T")[0] : "" },
        { key: "ORIGEM_RECURSO", formatter: null },
        { key: "VLR_REPASSE", formatter: null }, // Assuming VLR_REPASSE matches 'valor'
        { key: "SECRETARIA", formatter: null },
        { key: "ESTADO", formatter: null },
    ];

    const result = await getMethode(`programas/${id}`);
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

async function getBeneficiariosByPrograma(nomePrograma) {
    try {
        // Fetch Agricultura Familiar entities linked to this program
        const result = await getMethode(`agricultura-familiar/programa/${encodeURIComponent(nomePrograma)}`);
        renderBeneficiarios(result);
    } catch (err) {
        console.log('Erro ao buscar beneficiários do programa', err);
        renderBeneficiarios([]);
    }
}

function renderBeneficiarios(data) {
    // Columns from agriculture-familiar view/table
    const columns = ["ID", "NOME", "CAF", "DAP"];
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

        // Link to pessoa.html (standard view for people/beneficiaries)
        tr.addEventListener('click', () => {
            // Agricultura Familiar usually links to pessoa.html or a specific view. 
            // Providing link to pessoa.html based on other files.
            const targetUrl = new URL(`pessoa.html?id=${encodeURIComponent(id)}`, location.href).href;
            window.location.href = targetUrl;
        });

        tr.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const targetUrl = new URL(`pessoa.html?id=${encodeURIComponent(id)}`, location.href).href;
                window.location.href = targetUrl;
            }
        });

        // 1. ID
        const idCell = document.createElement("th");
        idCell.scope = "row";
        idCell.textContent = id;
        tr.appendChild(idCell);

        // 2. NOME
        const nomeCell = document.createElement("td");
        nomeCell.textContent = item.NOME || "";
        tr.appendChild(nomeCell);

        // 3. CAF
        const cafCell = document.createElement("td");
        cafCell.textContent = item.CAF || "";
        tr.appendChild(cafCell);

        // 4. DAP
        const dapCell = document.createElement("td");
        dapCell.textContent = item.DAP || "";
        tr.appendChild(dapCell);

        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
}
