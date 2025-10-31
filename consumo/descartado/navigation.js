import { Table } from "./table";

export class Navigation {
    constructor() {
        this.Listeners();
    };

    Listeners() {
        document.getElementById('pessoas').addEventListener('click', () => this.loadPessoas());
        document.getElementById('associacoes').addEventListener('click', () => this.loadAssociacoes());
    };

    async getAssociacoes() {
        this.setActiveTab("associacoes");

        const columns = [
            { key: "ID", formatter: null },
            { key: "NOME", formatter: null },
            { key: "CPF", formatter: null },
            { key: "GENERO", formatter: null },
            { key: "DATA_NASCIMENTO", formatter: value => value.split("T")[0] },
        ];

        const table = new Table("pessoas", columns);
        await table.render();
    }
    async getAssociacoes() {
        this.setActiveTab("associacoes");

        const columns = [
            { key: "ID", formatter: null },
            { key: "NOME", formatter: null },
            { key: "CATEGORIA", formatter: null },
            { key: "SECRETARIA", formatter: null },
        ];

        const table = new Table("associacoes", columns);
        await table.render();
    }

    setActiveTab(activeTab) {
        const tabs = ["pessoas", "associacoes"];

        tabs.forEach(tab => {
            const tabElement = document.getElementById(tab);
            tabElement.classList.remove("active");
        });

        document.getElementById(activeTab).classList.add("active");
    };
};