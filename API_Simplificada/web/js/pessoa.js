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
    const id = params.get("id");
    return id;
};

async function getAll() {
    const id = getValueUrl();
    const pessoa = await getPessoa(id);
    const associado = await getAssociado(id);
    const movimentacao = await getMovimentacoes(associado.DAP);
    const localizacao = getLocalizacao(id);
    const agricultura_familiar = getAgriculturaFamiliar(id);
}

async function getPessoa(id) {
    const idTable = ["id", "nome", "cpf", "genero", "nascimento"];
    const columns = [
        { key: "ID", formatter: null },
        { key: "NOME", formatter: null },
        { key: "CPF", formatter: null },
        { key: "GENERO", formatter: null },
        { key: "DATA_NASCIMENTO", formatter: value => value.split("T")[0] },
    ];

    const result = await getMethode(`pessoas/${id}`);

    setDados(idTable, columns, result);

    return result
};

async function getAssociado(id) {
    const idTable = ["caf", "dap", "validade"];
    const columns = [
        { key: "CAF", formatter: null },
        { key: "DAP", formatter: null },
        { key: "VALIDADE_CAF", formatter: value => value.split("T")[0] },
    ];

    const result = await getMethode(`associados/${id}`);

    setDados(idTable, columns, result);

    return result;
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

async function getLocalizacao(id) {
    const idTable = ["associacao", "latitude", "longitude", "titulo", "descricao"];
    const columns = [
        { key: "ASSOCIACAO", formatter: null },
        { key: "LATITUDE", formatter: null },
        { key: "LONGITUDE", formatter: null },
        { key: "TITULO", formatter: null },
        { key: "DESCRICAO", formatter: null },
    ];
    const result = await getMethode(`localizacoes/${id}`);

    setDados(idTable, columns, result);

    return result;
};

async function getAgriculturaFamiliar(id) {
    const idTable = ["programa"];
    const columns = [
        { key: "PROGRAMA", formatter: null },
    ];
    const result = await getMethode(`agricultura-familiar/${id}`);

    setDados(idTable, columns, result);

    return result;
};

function total(result) {
    const totalId = document.getElementById("total");
    const total = parseFloat(result.QNT_PRODUZIDA * result.VLR_UNITARIO);

    totalId.innerHTML = total;
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