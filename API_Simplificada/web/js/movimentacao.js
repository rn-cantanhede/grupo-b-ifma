const url = `http://localhost:3000/`;

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
    await getMovimentacao(id);
}

async function getMovimentacao(id) {
    const idTable = ["id", "dap", "produto", "qnt_produzida", "vlr_unitario", "data_movimentacao", "latitude", "longitude"];
    const columns = [
        { key: "ID", formatter: null },
        { key: "DAP", formatter: null },
        { key: "PRODUTO", formatter: null },
        { key: "QNT_PRODUZIDA", formatter: null },
        { key: "VLR_UNITARIO", formatter: null },
        { key: "DATA_MOVIMENTACAO", formatter: value => value ? value.split("T")[0] : "" },
        { key: "LATITUDE", formatter: null },
        { key: "LONGITUDE", formatter: null },
    ];

    const result = await getMethode(`movimentacoes/${id}`);
    setDados(idTable, columns, result);
    // buscar associado(s) via DAP e pessoa; mesclar dados (pessoa + campos faltantes do associado) — não exibir DAP
    try {
        const dap = result && result.DAP;

        const mergedIdTable = ["merged_id", "merged_nome", "merged_cpf", "merged_genero", "merged_nascimento", "merged_caf", "merged_validade", "merged_associacao"];
        const mergedColumns = [
            { key: "ID", formatter: null },
            { key: "NOME", formatter: null },
            { key: "CPF", formatter: null },
            { key: "GENERO", formatter: null },
            { key: "DATA_NASCIMENTO", formatter: value => value ? value.split("T")[0] : "" },
            { key: "CAF", formatter: null },
            { key: "VALIDADE_CAF", formatter: value => value ? value.split("T")[0] : "" },
            { key: "ASSOCIACAO", formatter: null },
        ];

        let assoc = null;
        if (dap) {
            const associados = await getMethode(`associados/dap/${encodeURIComponent(dap)}`);
            assoc = Array.isArray(associados) ? (associados[0] || null) : (associados || null);
        }

        // tentar obter id da pessoa a partir do associado ou do resultado da movimentação
        const idPessoaFromAssoc = assoc && (assoc.ID_PESSOA || assoc.ID);
        const idPessoaFromResult = result && (result.ID_PESSOA || result.ID_PESSOA);
        const idPessoa = idPessoaFromAssoc || idPessoaFromResult || null;

        let pessoa = null;
        if (idPessoa) {
            pessoa = await getMethode(`pessoas/${idPessoa}`);
        }

        // construir objeto mesclado: comece com pessoa (se existir), e adicione campos do associado que faltam
        const merged = {};
        if (pessoa) {
            merged.ID = pessoa.ID;
            merged.NOME = pessoa.NOME;
            merged.CPF = pessoa.CPF;
            merged.GENERO = pessoa.GENERO;
            merged.DATA_NASCIMENTO = pessoa.DATA_NASCIMENTO;
        }

        if (assoc) {
            // adicionar somente se não existirem em `merged`
            merged.CAF = merged.CAF || assoc.CAF || "";
            merged.VALIDADE_CAF = merged.VALIDADE_CAF || assoc.VALIDADE_CAF || "";
            merged.ASSOCIACAO = merged.ASSOCIACAO || assoc.ASSOCIACAO || assoc.NOME || "";
            // garantir ID/NOME/CPF se pessoa não existir
            merged.ID = merged.ID || assoc.ID_PESSOA || assoc.ID || null;
            merged.NOME = merged.NOME || assoc.NOME || assoc.NOME_PESSOA || "";
            merged.CPF = merged.CPF || assoc.CPF || "";
        }

        // se nem pessoa nem associado fornecerem dados, limpar campos
        if (!pessoa && !assoc) {
            setDados(mergedIdTable, mergedColumns, null);
        } else {
            setDados(mergedIdTable, mergedColumns, merged);
        }
    } catch (err) {
        console.log('Erro ao mesclar associado/pessoa por DAP', err);
    }
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