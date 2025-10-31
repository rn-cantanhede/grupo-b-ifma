const url = `http://localhost:3000/`;

async function getMethode(router) {
    const link = `${url}${router}`;
    const res = await axios.get(link);
    return res.data;
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

    if (header) {
        cell.setAttribute("scope", "row");
    };
    if (tbody) {
        cell.setAttribute("scope", "col");
    };

    cell.textContent = value;
    return cell;
};

function setActiveTab(activeTab) {
    const tabs = ["pessoas", "associacoes"];

    tabs.forEach(tab => {
        const tabElement = document.getElementById(tab);
        tabElement.classList.remove("active");
    });

    document.getElementById(activeTab).classList.add("active");
};