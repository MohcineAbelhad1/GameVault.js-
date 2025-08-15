class MainService {
    constructor() {
        this.currentPage = 'dashboard';
        this.setupNavigation();
    }

    setupNavigation() {
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.target.closest('a').dataset.page;
                this.navigateToPage(page);
            });
        });
    }

    navigateToPage(page) {
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });

        document.querySelector(`[data-page="${page}"]`).classList.add('active');

        const content = document.getElementById('content');
        
        switch(page) {
            case 'dashboard':
                if (window.dashboard) {
                    dashboard.initialize();
                }
                break;
            case 'games':
                content.innerHTML = this.createSectionHTML('Games', 'gamepad');
                if (window.crud) {
                    crud.setupEventListeners();
                    crud.loadGames();
                }
                break;
            case 'consoles':
                content.innerHTML = this.createSectionHTML('Consoles', 'tv');
                if (window.crud) {
                    crud.setupEventListeners();
                    crud.loadConsoles();
                }
                break;
            case 'accessories':
                content.innerHTML = this.createSectionHTML('Accessories', 'headset');
                if (window.crud) {
                    crud.setupEventListeners();
                    crud.loadAccessories();
                }
                break;
            case 'orders':
                content.innerHTML = this.createSectionHTML('Orders', 'shopping-cart');
                if (window.crud) {
                    crud.setupEventListeners();
                    crud.loadOrders();
                }
                break;
            case 'customers':
                content.innerHTML = this.createSectionHTML('Customers', 'users-gear');
                if (window.crud) {
                    crud.setupEventListeners();
                    crud.loadCustomers();
                }
                break;
        }

        this.currentPage = page;
    }

    createSectionHTML(title, icon) {
        return `
            <div class="section">
                <div class="section-header">
                    <h1 class="section-title">
                        <i class="fas fa-${icon}"></i>
                        ${title}
                    </h1>
                    <div class="section-actions">
                        <button class="create-btn">
                            <i class="fas fa-plus"></i>
                            Create
                        </button>
                        <button class="export-btn">
                            <i class="fas fa-file-export"></i>
                            Export
                        </button>
                    </div>
                </div>
                
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        `;
    }
}

// Initialize main service
const main = new MainService();

// Export for use in other files
window.main = main; 