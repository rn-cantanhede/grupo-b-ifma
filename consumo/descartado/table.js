import { ApiService } from "./api.js";

export class Table {
    constructor(endpoint, columns) {
        this.endpoint = endpoint;
        this.columns = columns;
    };

    async render() {
        try {
            const data = await ApiService.getMethode(this.endpoint);
            const list = document.getElementById("data");

            list.textContent = "";

            const body = document.createElement("tbody");

            data.forEach(item => {
                const row = createRow(item, columns);
                body.appendChild(row);
            });
        } catch (error) {
            console.log(error);
        };
    };

    createHead(/*columns*/) {
        const head = document.createElement("thead");
        const row = document.createElement("tr");

        this.columns.forEach(column => {
            const cell = createCell("th", column.key, true);
            row.appendChild(cell);
        });

        head.appendChild(row);
        document.getElementById("data").appendChild(head);
    };

    createRow(data, /*columns*/) {
        const row = document.createElement("tr");

        if (data) {
            row.setAttribute("id", data.ID);

            this.columns.forEach(column => {
                let value = data[column.key];

                if (column.formatter) {
                    value = column.formatter(value);
                };

                const cell = this.createCell("td", value);
                row.appendChild(cell);
            });
        };
        return row;
    };

    createCell(tag, value, header = false, /*tbody = false*/) {
        const cell = document.createElement(tag);

        if (header) {
            cell.setAttribute("scope", "row");
        };
        // if (tbody) {
        //     cell.setAttribute("scope", "col");
        // };

        cell.textContent = value;
        return cell;
    };
};