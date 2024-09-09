let stock = {};

function addItem() {
    const name = document.getElementById('item-name').value.trim();
    const quantity = parseInt(document.getElementById('item-quantity').value);

    if (name && !isNaN(quantity) && quantity > 0) {
        if (stock[name]) {
            stock[name] += quantity;
        } else {
            stock[name] = quantity;
        }
        updateStockList();
        updateSelectOptions();
        document.getElementById('item-name').value = '';
        document.getElementById('item-quantity').value = '';
    } else {
        alert('Por favor, insira um nome e uma quantidade válida.');
    }
}

function removeItem() {
    const name = document.getElementById('remove-item-name').value;
    const quantity = parseInt(document.getElementById('remove-item-quantity').value);

    if (name && !isNaN(quantity) && quantity > 0) {
        if (stock[name]) {
            const confirmRemoval = confirm(`Tem certeza que deseja remover ${quantity} de ${name}?`);
            if (confirmRemoval) {
                stock[name] -= quantity;
                if (stock[name] <= 0) {
                    delete stock[name];
                }
                updateStockList();
                updateSelectOptions();
                document.getElementById('remove-item-quantity').value = '';
            }
        } else {
            alert('Item não encontrado no estoque.');
        }
    } else {
        alert('Por favor, selecione um item e insira uma quantidade válida.');
    }
}

function editItem() {
    const name = document.getElementById('edit-item-name').value;
    const newName = document.getElementById('edit-new-item-name').value.trim();
    const quantity = parseInt(document.getElementById('edit-item-quantity').value);

    if (name && (!isNaN(quantity) || newName)) {
        if (stock[name]) {
            if (newName) {
                stock[newName] = stock[name];
                delete stock[name];
            }
            if (!isNaN(quantity)) {
                stock[newName || name] = quantity;
            }
            updateStockList();
            updateSelectOptions();
            document.getElementById('edit-new-item-name').value = '';
            document.getElementById('edit-item-quantity').value = '';
        } else {
            alert('Item não encontrado no estoque.');
        }
    } else {
        alert('Por favor, insira um novo nome ou quantidade válida.');
    }
}

function updateStockList() {
    const stockList = document.getElementById('stock-list');
    stockList.innerHTML = '';
    
    for (const [name, quantity] of Object.entries(stock)) {
        const li = document.createElement('li');
        li.textContent = `${name}: ${quantity}`;
        stockList.appendChild(li);
    }
}

function updateSelectOptions() {
    const removeSelect = document.getElementById('remove-item-name');
    const editSelect = document.getElementById('edit-item-name');

    removeSelect.innerHTML = '<option value removeSelect.innerHTML = <option value="">Selecione um item</option>';
    editSelect.innerHTML = '<option value="">Selecione um item</option>';

    for (const name of Object.keys(stock)) {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        removeSelect.appendChild(option);
        editSelect.appendChild(option.cloneNode(true));
    }
}

function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section.style.display === "none" || section.style.display === "") {
        section.style.display = "block";
    } else {
        section.style.display = "none";
    }
}

// Inicializar ocultando as seções de retirada e edição
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('remove-section').style.display = 'none';
    document.getElementById('edit-section').style.display = 'none';
});