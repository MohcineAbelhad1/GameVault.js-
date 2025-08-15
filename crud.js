class CrudService {
    constructor() {
        this.currentPage = 'games';
        this.itemsPerPage = 10;
        this.setupEventListeners();
    }

    setupEventListeners() {
        const createBtn = document.querySelector('.create-btn');
        if (createBtn) {
            createBtn.addEventListener('click', () => {
                this.showAddModal();
            });
        }

        const exportBtn = document.querySelector('.export-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', async () => {
                await this.exportData();
            });
        }
    }

    showAddModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'block';
        
        const title = this.currentPage.charAt(0).toUpperCase() + this.currentPage.slice(1);
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Add New ${title.slice(0, -1)}</h2>
                <form id="addForm">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" required>
                    </div>
                    <div class="form-group">
                        <label for="price">Price ($)</label>
                        <input type="number" id="price" step="0.01" required>
                    </div>
                    <div class="form-group">
                        <label for="stock">Stock</label>
                        <input type="number" id="stock" required>
                    </div>
                    <div class="form-group">
                        <label for="image">Image URL</label>
                        <input type="url" id="image" required>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary">Add ${title.slice(0, -1)}</button>
                        <button type="button" class="btn btn-danger" id="cancelAdd">Cancel</button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        const form = document.getElementById('addForm');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.addItem();
            modal.remove();
        });

        document.getElementById('cancelAdd').addEventListener('click', () => {
            modal.remove();
        });
    }

    async addItem() {
        const item = {
            name: document.getElementById('name').value,
            price: parseFloat(document.getElementById('price').value),
            stock: parseInt(document.getElementById('stock').value),
            image: document.getElementById('image').value,
            dateAdded: new Date()
        };

        try {
            await database.add(this.currentPage, item);
            this.showNotification(`${this.currentPage.slice(0, -1)} added successfully!`, 'success');
            await this.loadItems();
        } catch (error) {
            console.error(`Error adding ${this.currentPage.slice(0, -1)}:`, error);
            this.showNotification(`Error adding ${this.currentPage.slice(0, -1)}`, 'error');
        }
    }

    async loadItems() {
        try {
            const items = await database.getAll(this.currentPage);
            this.displayItems(items);
        } catch (error) {
            console.error(`Error loading ${this.currentPage}:`, error);
            this.showNotification(`Error loading ${this.currentPage}`, 'error');
        }
    }

    displayItems(items) {
        const tableBody = document.querySelector('.data-table tbody');
        tableBody.innerHTML = items.map(item => `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.stock}</td>
                <td class="actions-cell">
                    <button class="action-btn edit-btn" onclick="crud.editItem(${item.id})">
                        <i class="fas fa-edit"></i>
                        Edit
                    </button>
                    <button class="action-btn delete-btn" onclick="crud.deleteItem(${item.id})">
                        <i class="fas fa-trash"></i>
                        Delete
                    </button>
                </td>
            </tr>
        `).join('');
    }

    async editItem(id) {
        // Implementation for editing an item
        console.log(`Edit ${this.currentPage.slice(0, -1)}:`, id);
    }

    async deleteItem(id) {
        if (confirm(`Are you sure you want to delete this ${this.currentPage.slice(0, -1)}?`)) {
            try {
                await database.delete(this.currentPage, id);
                this.showNotification(`${this.currentPage.slice(0, -1)} deleted successfully!`, 'success');
                await this.loadItems();
            } catch (error) {
                console.error(`Error deleting ${this.currentPage.slice(0, -1)}:`, error);
                this.showNotification(`Error deleting ${this.currentPage.slice(0, -1)}`, 'error');
            }
        }
    }

    async exportData() {
        try {
            const data = await database.exportAllData();
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `gamestore_data_${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            this.showNotification('Data exported successfully!', 'success');
        } catch (error) {
            console.error('Error exporting data:', error);
            this.showNotification('Error exporting data', 'error');
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Methods for specific sections
    loadGames() {
        this.currentPage = 'games';
        this.loadItems();
    }

    loadConsoles() {
        this.currentPage = 'consoles';
        this.loadItems();
    }

    loadAccessories() {
        this.currentPage = 'accessories';
        this.loadItems();
    }

    loadOrders() {
        this.currentPage = 'orders';
        this.loadItems();
    }

    loadCustomers() {
        this.currentPage = 'customers';
        this.loadItems();
    }
}

// Initialize CRUD service
const crud = new CrudService();

// Export for use in other files
window.crud = crud; 