class DatabaseService {
    constructor() {
        this.dbName = 'gameStoreDB';
        this.dbVersion = 1;
        this.db = null;
        this.initDatabase();
    }

    initDatabase() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = (event) => {
                console.error('Database error:', event.target.error);
                reject(event.target.error);
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                console.log('Database opened successfully');
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Create stores for all sections
                const stores = ['games', 'consoles', 'accessories', 'orders', 'customers'];
                stores.forEach(store => {
                    if (!db.objectStoreNames.contains(store)) {
                        const objectStore = db.createObjectStore(store, { keyPath: 'id', autoIncrement: true });
                        objectStore.createIndex('name', 'name', { unique: false });
                        objectStore.createIndex('price', 'price', { unique: false });
                        objectStore.createIndex('stock', 'stock', { unique: false });
                    }
                });

                // Additional indexes for orders and customers
                if (db.objectStoreNames.contains('orders')) {
                    const orderStore = request.transaction.objectStore('orders');
                    if (!orderStore.indexNames.contains('date')) {
                        orderStore.createIndex('date', 'date', { unique: false });
                    }
                    if (!orderStore.indexNames.contains('status')) {
                        orderStore.createIndex('status', 'status', { unique: false });
                    }
                }

                if (db.objectStoreNames.contains('customers')) {
                    const customerStore = request.transaction.objectStore('customers');
                    if (!customerStore.indexNames.contains('email')) {
                        customerStore.createIndex('email', 'email', { unique: true });
                    }
                }
            };
        });
    }

    // Generic CRUD operations
    async add(storeName, item) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.add(item);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async getAll(storeName) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async update(storeName, id, item) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            item.id = id;
            const request = store.put(item);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async delete(storeName, id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(id);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // Export all data
    async exportAllData() {
        try {
            const stores = ['games', 'consoles', 'accessories', 'orders', 'customers'];
            const data = {};

            for (const store of stores) {
                data[store] = await this.getAll(store);
            }

            return {
                ...data,
                exportDate: new Date()
            };
        } catch (error) {
            console.error('Export error:', error);
            throw error;
        }
    }
}

// Initialize database service
const database = new DatabaseService();

// Export for use in other files
window.database = database; 