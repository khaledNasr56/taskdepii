
let data = JSON.parse(localStorage.getItem('crudData')) || [];
let editIndex = -1;
const form = document.getElementById('crudForm');
const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
const notification = document.getElementById('notification');

function showNotification(message) {
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function renderTable() {
    table.innerHTML = '';
    data.forEach((item, index) => {
        const row = table.insertRow();
        Object.values(item).forEach(text => {
            const cell = row.insertCell();
            cell.textContent = text;
        });
        const actionsCell = row.insertCell();
        actionsCell.innerHTML = `
            <button onclick="editItem(${index})">Edit</button>
            <button onclick="deleteItem(${index})">Delete</button>
        `;
    });
}

function saveData() {
    localStorage.setItem('crudData', JSON.stringify(data));
}

function addItem(item) {
    data.push(item);
    saveData();
    renderTable();
    showNotification('Item added successfully');
}

function updateItem(index, item) {
    data[index] = item;
    saveData();
    renderTable();
    showNotification('Item updated successfully');
}

function editItem(index) {
    const item = data[index];
    document.getElementById('name').value = item.name;
    document.getElementById('categ').value = item.categ;
    document.getElementById('price').value = item.price;
    document.getElementById('discount').value = item.discount;
    document.getElementById('quantity').value = item.quantity;
    document.getElementById('description').value = item.description;
        
    
    ;
    editIndex = index;
}

function deleteItem(index) {
    data.splice(index, 1);
    saveData();
    renderTable();
    showNotification('Item deleted successfully');
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const item = {
        name: document.getElementById('name').value,
        categ: document.getElementById('categ').value,
        age: document.getElementById('price').value,
        city: document.getElementById('discount').value,
        occupation: document.getElementById('quantity').value,
        Description: document.getElementById('description').value,
    };
    if (editIndex === -1) {
        addItem(item);
    } else {
        updateItem(editIndex, item);
        editIndex = -1;
    }
    form.reset();
});

// Load data when the page loads
renderTable();
