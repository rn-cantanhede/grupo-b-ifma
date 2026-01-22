const url = `http://localhost:3000/`;

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
    const associacao = await getAssociacao(id);
    if (associacao && associacao.NOME) {
        const nome = encodeURIComponent(associacao.NOME);
        const pessoas = await getMethode(`associados/associacao/${nome}`);
        renderPessoas(pessoas);
    } else {
        renderPessoas([]);
    };
};

async function getAssociacao(id) {
    const idTable = ["id", "nome", "categoria", "id_secretaria", "secretaria"];
    const columns = [
        { key: "ID", formatter: null },
        { key: "NOME", formatter: null },
        { key: "CATEGORIA", formatter: null },
        { key: "ID_SECRETARIA", formatter: null },
        { key: "SECRETARIA", formatter: null },
    ];

    const result = await getMethode(`associacoes/${id}`);
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

function renderPessoas(data) {
    const columns = ["ID", "NOME", "CPF", "GENERO", "DATA_NASCIMENTO"];
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
        tr.id = id;
        tr.style.cursor = "pointer";
        tr.setAttribute('tabindex', '0');
        tr.addEventListener('click', () => {
            const targetUrl = new URL(`pessoa.html?id=${encodeURIComponent(id)}`, location.href).href;
            window.location.href = targetUrl;
        });
        tr.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const targetUrl = new URL(`pessoa.html?id=${encodeURIComponent(id)}`, location.href).href;
                window.location.href = targetUrl;
            }
        });

        const idCell = document.createElement("th");
        idCell.scope = "row";
        idCell.textContent = id;
        tr.appendChild(idCell);

        const nome = document.createElement("td");
        nome.textContent = item.NOME || "";
        tr.appendChild(nome);

        const cpf = document.createElement("td");
        cpf.textContent = item.CPF || "";
        tr.appendChild(cpf);

        const genero = document.createElement("td");
        genero.textContent = item.GENERO || "";
        tr.appendChild(genero);

        const dataN = document.createElement("td");
        dataN.textContent = item.DATA_NASCIMENTO ? item.DATA_NASCIMENTO.split("T")[0] : "";
        tr.appendChild(dataN);

        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
};