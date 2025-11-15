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
}

async function getPessoa(id) {
    const idTable = ["id", "nome", "cpf", "genero", "nascimento"];
    const columns = ["ID", "NOME", "CPF", "GENERO", "DATA_NASCIMENTO"];
    const result = await getMethode(`pessoa/${id}`);

    setDados(idTable, columns, result);
    
    return result
};

async function getAssociado(id) {
    const idTable = ["associacao", "caf", "dap", "validade"];
    const columns = ["ASSOCIACAO", "CAF", "DAP", "VALIDADE_CAF"];
    const result = await getMethode(`associado/${id}`);

    setDados(idTable, columns, result);

    return result;
};

async function getMovimentacoes(dap) {
    const idTable = ["produdo", "produzida", "unitario", "movimentacao"];
    const columns = ["PRODUTO", "QNT_PRODUZIDA", "VLR_UNITARIO", "DATA_MOVIMENTACAO"];
    const result = await getMethode(`movimentacao/dap/${dap}`);

    setDados(idTable, columns, result);

    return result;
};

function setDados(idTable, columns, result) {
    
    idTable.forEach(function(elementId, index) {
        const value = document.getElementById(elementId);
        value.textContent = result[columns[index]];
    });
};