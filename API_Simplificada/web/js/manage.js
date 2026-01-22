const api = axios.create({
    baseURL: 'http://localhost:3000/'
});

// Utility to show toast notifications
function showToast(title, message, type = 'success') {
    const toastEl = document.getElementById('liveToast');
    const toast = new bootstrap.Toast(toastEl);
    document.getElementById('toast-title').textContent = title;
    document.getElementById('toast-message').textContent = message;

    if (type === 'danger') {
        toastEl.classList.add('text-bg-danger');
    } else {
        toastEl.classList.remove('text-bg-danger');
    }

    toast.show();
}

// Map entities to their ID field in responses
const entityConfig = {
    pessoas: { idKey: 'ID', textKey: 'NOME' },
    secretarias: { idKey: 'ID', textKey: 'NOME' },
    associacoes: { idKey: 'ID', textKey: 'NOME' },
    associados: { idKey: 'ID', textKey: 'NOME' },
    programas: { idKey: 'ID', textKey: 'NOME' },
    'agricultura-familiar': { idKey: 'ID', textKey: 'DAP' },
    produtos: { idKey: 'ID', textKey: 'NOME' },
    categorias: { idKey: 'ID', textKey: 'NOME' },
    'tipos-produtos': { idKey: 'ID', textKey: 'NOME' },
    localizacoes: { idKey: 'ID', textKey: 'TITULO' },
    movimentacoes: { idKey: 'ID', textKey: 'ID' }
};

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    loadAllDropdowns();
    setupFormHandlers();
});

async function loadAllDropdowns() {
    await Promise.all([
        populateSelect('pessoas', 'select-pessoa'),
        populateSelect('secretarias', 'select-secretaria'),
        populateSelect('associacoes', 'select-associacao'),
        populateSelect('associados', 'select-associado'),
        populateSelect('programas', 'select-programa'),
        populateSelect('agricultura-familiar', 'select-agricultura-familiar'),
        populateSelect('produtos', 'select-produto'),
        populateSelect('tipos-produtos', 'select-tipos-produtos'),
        populateSelect('categorias', 'select-categoria'),
        populateSelect('localizacoes', 'select-localizacoes'),
        populateSelect('movimentacoes', 'select-movimentacoes'),

        // Hydrate foreign key selects
        populateSelect('categorias', 'associacao-categoria'),
        populateSelect('secretarias', 'associacao-secretaria'),
        populateSelect('pessoas', 'associado-pessoa'),
        populateSelect('associacoes', 'associado-associacao'),
        populateSelect('secretarias', 'programa-secretaria'),
        populateSelect('associados', 'agricultura-familiar-associado'),
        populateSelect('programas', 'agricultura-familiar-programa'),
        populateSelect('tipos-produtos', 'produto-tipo'),
        populateSelect('associados', 'localizacao-associado'),
        populateSelect('localizacoes', 'movimentacao-local'),
        populateSelect('agricultura-familiar', 'movimentacao-agricultura-familiar'),
        populateSelect('produtos', 'movimentacao-produto')
    ]);
}

async function populateSelect(endpoint, selectId) {
    try {
        const response = await api.get(endpoint);
        const select = document.getElementById(selectId);
        if (!select) return;

        const config = entityConfig[endpoint] || { idKey: 'ID', textKey: 'NOME' };

        const hasNone = select.options[0]?.value === "";
        const noneText = select.options[0]?.text || "-- Selecionar --";

        select.innerHTML = hasNone ? `<option value="">${noneText}</option>` : '<option value="">-- Selecionar --</option>';

        response.data.forEach(item => {
            const option = document.createElement('option');
            option.value = item[config.idKey];

            let text = item[config.textKey];
            if (endpoint === 'movimentacoes') {
                text = `Movimentação #${item.ID} - ${item.PRODUTO || ''} (${item.DATA_MOVIMENTACAO?.split('T')[0] || ''})`;
            } else if (endpoint === 'localizacoes') {
                text = item.TITULO || item.NOME || `Localização #${item.ID}`;
            }

            option.textContent = text || `${endpoint} #${item[config.idKey]}`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error(`Error loading ${endpoint}:`, error);
    }
}

async function loadEntityData(endpoint, id) {
    let prefix = endpoint === 'pessoas' ? 'pessoa' :
        endpoint === 'associacoes' ? 'associacao' :
            endpoint === 'associados' ? 'associado' :
                endpoint === 'secretarias' ? 'secretaria' :
                    endpoint === 'programas' ? 'programa' :
                        endpoint === 'produtos' ? 'produto' :
                            endpoint === 'categorias' ? 'categoria' :
                                endpoint === 'localizacoes' ? 'localizacoes' :
                                    endpoint === 'movimentacoes' ? 'movimentacoes' : endpoint.replace('tipos-', '');

    if (!id) {
        resetForm(prefix);
        return;
    }

    try {
        const response = await api.get(`${endpoint}/${id}`);
        const data = Array.isArray(response.data) ? response.data[0] : response.data;

        if (!data) return;

        document.getElementById(`${prefix}-id`).value = data.ID;

        const delBtn = document.getElementById(`btn-delete-${prefix}`);
        if (delBtn) delBtn.classList.remove('d-none');

        if (prefix === 'pessoa') {
            document.getElementById('pessoa-nome').value = data.NOME;
            document.getElementById('pessoa-cpf').value = data.CPF;
            document.getElementById('pessoa-genero').value = data.GENERO;
            document.getElementById('pessoa-nascimento').value = data.DATA_NASCIMENTO?.split('T')[0] || '';
        } else if (prefix === 'secretaria') {
            document.getElementById('secretaria-nome').value = data.NOME;
            document.getElementById('secretaria-cidade').value = data.CIDADE;
            document.getElementById('secretaria-estado').value = data.ESTADO;
            document.getElementById('secretaria-endereco').value = data.ENDERECO;
        } else if (prefix === 'associacao') {
            document.getElementById('associacao-nome').value = data.NOME;
            document.getElementById('associacao-endereco').value = data.ENDERECO;
            document.getElementById('associacao-categoria').value = data.ID_CATEGORIA || '';
            document.getElementById('associacao-secretaria').value = data.ID_SECRETARIA || '';
        } else if (prefix === 'associado') {
            document.getElementById('associado-pessoa').value = data.ID_PESSOA || '';
            document.getElementById('associado-associacao').value = data.ID_ASSOCIACAO || '';
            document.getElementById('associado-caf').value = data.CAF;
            document.getElementById('associado-validade').value = data.VALIDADE_CAF?.split('T')[0] || '';
        } else if (prefix === 'programa') {
            document.getElementById('programa-nome').value = data.NOME;
            document.getElementById('programa-descricao').value = data.DESCRICAO;
            document.getElementById('programa-inicio').value = data.DATA_INICIO?.split('T')[0] || '';
            document.getElementById('programa-fim').value = data.DATA_FIM?.split('T')[0] || '';
            document.getElementById('programa-origem').value = data.ORIGEM_RECURSO;
            document.getElementById('programa-repasse').value = data.VLR_REPASSE;
            document.getElementById('programa-secretaria').value = data.ID_SECRETARIA || '';
        } else if (prefix === 'agricultura-familiar') {
            document.getElementById('agricultura-familiar-associado').value = data.ID_ASSOCIADO || '';
            document.getElementById('agricultura-familiar-programa').value = data.ID_PROGRAMA || '';
            document.getElementById('agricultura-familiar-dap').value = data.DAP;
        } else if (prefix === 'produto') {
            document.getElementById('produto-nome').value = data.NOME;
            document.getElementById('produto-tipo').value = data.ID_TIPO_DO_PRODUTO || '';
        } else if (prefix === 'tipos-produtos') {
            document.getElementById('tipos-produtos-nome').value = data.NOME;
        } else if (prefix === 'categoria') {
            document.getElementById('categoria-nome').value = data.NOME;
        } else if (prefix === 'localizacoes') {
            document.getElementById('localizacao-associado').value = data.ID_ASSOCIADO || '';
            document.getElementById('localizacao-latitude').value = data.LATITUDE;
            document.getElementById('localizacao-longitude').value = data.LONGITUDE;
            document.getElementById('localizacao-titulo').value = data.TITULO;
            document.getElementById('localizacao-descricao').value = data.DESCRICAO;
        } else if (prefix === 'movimentacoes') {
            document.getElementById('movimentacao-local').value = data.ID_LOCAL || '';
            document.getElementById('movimentacao-agricultura-familiar').value = data.ID_AGRICULTURA_FAMILIAR || '';
            document.getElementById('movimentacao-produto').value = data.ID_PRODUTO || '';
            document.getElementById('movimentacao-quantidade').value = data.QNT_PRODUZIDA;
            document.getElementById('movimentacao-valor-unitario').value = data.VLR_UNITARIO;
            document.getElementById('movimentacao-data').value = data.DATA_MOVIMENTACAO?.split('T')[0] || '';
        }
    } catch (error) {
        console.error(`Error loading data for ${endpoint}/${id}:`, error);
        showToast('Erro', 'Não foi possível carregar os dados.', 'danger');
    }
}

function resetForm(prefix) {
    const form = document.getElementById(`form-${prefix}`);
    if (form) form.reset();

    const idField = document.getElementById(`${prefix}-id`);
    if (idField) idField.value = "";

    const delBtn = document.getElementById(`btn-delete-${prefix}`);
    if (delBtn) delBtn.classList.add('d-none');
}

function setupFormHandlers() {
    const forms = {
        'form-pessoa': {
            endpoint: 'pessoas', prefix: 'pessoa', data: () => ({
                NOME: document.getElementById('pessoa-nome').value,
                CPF: document.getElementById('pessoa-cpf').value,
                GENERO: document.getElementById('pessoa-genero').value,
                DATA_NASCIMENTO: document.getElementById('pessoa-nascimento').value
            })
        },
        'form-secretaria': {
            endpoint: 'secretarias', prefix: 'secretaria', data: () => ({
                NOME: document.getElementById('secretaria-nome').value,
                CIDADE: document.getElementById('secretaria-cidade').value,
                ESTADO: document.getElementById('secretaria-estado').value,
                ENDERECO: document.getElementById('secretaria-endereco').value
            })
        },
        'form-associacao': {
            endpoint: 'associacoes', prefix: 'associacao', data: () => ({
                NOME: document.getElementById('associacao-nome').value,
                ENDERECO: document.getElementById('associacao-endereco').value,
                ID_CATEGORIA: document.getElementById('associacao-categoria').value,
                ID_SECRETARIA: document.getElementById('associacao-secretaria').value
            })
        },
        'form-associado': {
            endpoint: 'associados', prefix: 'associado', data: () => ({
                ID_PESSOA: document.getElementById('associado-pessoa').value,
                ID_ASSOCIACAO: document.getElementById('associado-associacao').value,
                CAF: document.getElementById('associado-caf').value,
                VALIDADE_CAF: document.getElementById('associado-validade').value
            })
        },
        'form-programa': {
            endpoint: 'programas', prefix: 'programa', data: () => ({
                NOME: document.getElementById('programa-nome').value,
                DESCRICAO: document.getElementById('programa-descricao').value,
                DATA_INICIO: document.getElementById('programa-inicio').value,
                DATA_FIM: document.getElementById('programa-fim').value,
                ORIGEM_RECURSO: document.getElementById('programa-origem').value,
                VLR_REPASSE: document.getElementById('programa-repasse').value,
                ID_SECRETARIA: document.getElementById('programa-secretaria').value
            })
        },
        'form-agricultura-familiar': {
            endpoint: 'agricultura-familiar', prefix: 'agricultura-familiar', data: () => ({
                ID_ASSOCIADO: document.getElementById('agricultura-familiar-associado').value,
                ID_PROGRAMA: document.getElementById('agricultura-familiar-programa').value,
                DAP: document.getElementById('agricultura-familiar-dap').value
            })
        },
        'form-produto': {
            endpoint: 'produtos', prefix: 'produto', data: () => ({
                NOME: document.getElementById('produto-nome').value,
                ID_TIPO_DO_PRODUTO: document.getElementById('produto-tipo').value
            })
        },
        'form-tipos-produtos': {
            endpoint: 'tipos-produtos', prefix: 'tipos-produtos', data: () => ({
                NOME: document.getElementById('tipos-produtos-nome').value
            })
        },
        'form-categoria': {
            endpoint: 'categorias', prefix: 'categoria', data: () => ({
                NOME: document.getElementById('categoria-nome').value
            })
        },
        'form-localizacoes': {
            endpoint: 'localizacoes', prefix: 'localizacoes', data: () => ({
                ID_ASSOCIADO: document.getElementById('localizacao-associado').value,
                LATITUDE: document.getElementById('localizacao-latitude').value,
                LONGITUDE: document.getElementById('localizacao-longitude').value,
                TITULO: document.getElementById('localizacao-titulo').value,
                DESCRICAO: document.getElementById('localizacao-descricao').value
            })
        },
        'form-movimentacoes': {
            endpoint: 'movimentacoes', prefix: 'movimentacoes', data: () => ({
                ID_LOCAL: document.getElementById('movimentacao-local').value,
                ID_AGRICULTURA_FAMILIAR: document.getElementById('movimentacao-agricultura-familiar').value,
                ID_PRODUTO: document.getElementById('movimentacao-produto').value,
                QNT_PRODUZIDA: document.getElementById('movimentacao-quantidade').value,
                VLR_UNITARIO: document.getElementById('movimentacao-valor-unitario').value,
                DATA_MOVIMENTACAO: document.getElementById('movimentacao-data').value
            })
        }
    };

    function cleanPayload(data) {
        const clean = {};
        Object.keys(data).forEach(key => {
            if (data[key] !== undefined && data[key] !== "" && data[key] !== " ") {
                clean[key] = data[key];
            }
        });
        return clean;
    }

    Object.keys(forms).forEach(formId => {
        const formEl = document.getElementById(formId);
        if (!formEl) return;

        formEl.addEventListener('submit', async (e) => {
            e.preventDefault();
            const config = forms[formId];
            const id = document.getElementById(`${config.prefix}-id`).value;
            const payload = cleanPayload(config.data());

            try {
                if (id) {
                    await api.put(`${config.endpoint}/update/${id}`, payload);
                    showToast('Sucesso', 'Registro atualizado com sucesso!');
                } else {
                    await api.post(`${config.endpoint}/new`, payload);
                    showToast('Sucesso', 'Registro criado com sucesso!');
                }

                await loadAllDropdowns();
                resetForm(config.prefix);
                const mainSelect = document.getElementById(`select-${config.prefix}`);
                if (mainSelect) mainSelect.value = "";
            } catch (error) {
                console.error('Error saving:', error);
                const msg = error.response?.data?.error || 'Ocorreu um erro ao salvar o registro.';
                showToast('Erro', msg, 'danger');
            }
        });
    });
}

async function deleteEntity(endpoint, prefix) {
    const id = document.getElementById(`${prefix}-id`).value;
    if (!id) return;

    if (!confirm(`Tem certeza que deseja excluir este registro?`)) return;

    try {
        await api.delete(`${endpoint}/delete/${id}`);
        showToast('Sucesso', 'Registro excluído com sucesso!');
        await loadAllDropdowns();
        resetForm(prefix);
        const mainSelect = document.getElementById(`select-${prefix}`);
        if (mainSelect) mainSelect.value = "";
    } catch (error) {
        console.error('Error deleting:', error);
        const msg = error.response?.data?.error || 'Ocorreu um erro ao excluir o registro.';
        showToast('Erro', msg, 'danger');
    }
}
