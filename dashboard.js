class DashboardService {
    constructor() {
        this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.chartColors = {
            purple: '#6a1b9a',
            lightPurple: '#9c27b0',
            green: '#4caf50',
            blue: '#2196f3',
            orange: '#ff9800',
            red: '#f44336'
        };
        this.products = [
            { 
                name: 'PlayStation 5', 
                sales: 1250,
                price: 499.99,
                stock: 50,
                image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300&h=300&fit=crop' 
            },
            { 
                name: 'Xbox Series X', 
                sales: 980,
                price: 499.99,
                stock: 45,
                image: 'https://images.unsplash.com/photo-1621259182978-fbf433fd6eb7?w=300&h=300&fit=crop' 
            },
            { 
                name: 'Nintendo Switch', 
                sales: 850,
                price: 299.99,
                stock: 100,
                image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=300&h=300&fit=crop' 
            },
            { 
                name: 'Gaming Headset Pro', 
                sales: 620,
                price: 99.99,
                stock: 200,
                image: 'https://images.unsplash.com/photo-1618066296858-06f1a1c501cf?w=300&h=300&fit=crop' 
            },
            { 
                name: 'Wireless Controller', 
                sales: 580,
                price: 59.99,
                stock: 150,
                image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=300&h=300&fit=crop' 
            }
        ];
    }

    initialize() {
        this.createDashboardLayout();
        this.initializeCharts();
    }

    createDashboardLayout() {
        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="dashboard-grid">
                <div class="chart-container">
                    <h2>Customer Growth</h2>
                    <canvas id="customerGrowthChart"></canvas>
                </div>
                <div class="chart-container">
                    <h2>Monthly Revenue</h2>
                    <canvas id="revenueChart"></canvas>
                </div>
                <div class="chart-container">
                    <h2>Top Selling Products</h2>
                    <div id="topProducts" class="top-products"></div>
                </div>
                <div class="chart-container">
                    <h2>Order Status</h2>
                    <canvas id="orderStatusChart"></canvas>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Add Game Button
        document.getElementById('addGameBtn').addEventListener('click', () => {
            document.getElementById('addGameModal').style.display = 'block';
        });

        // Cancel Add Game
        document.getElementById('cancelAddGame').addEventListener('click', () => {
            document.getElementById('addGameModal').style.display = 'none';
            document.getElementById('addGameForm').reset();
        });

        // Add Game Form Submit
        document.getElementById('addGameForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addNewGame();
        });

        // Export Data Button
        document.getElementById('exportDataBtn').addEventListener('click', () => {
            this.exportData();
        });
    }

    addNewGame() {
        const newGame = {
            name: document.getElementById('gameName').value,
            price: parseFloat(document.getElementById('gamePrice').value),
            stock: parseInt(document.getElementById('gameStock').value),
            image: document.getElementById('gameImage').value,
            sales: 0
        };

        this.products.push(newGame);
        this.displayTopProducts();
        
        // Close modal and reset form
        document.getElementById('addGameModal').style.display = 'none';
        document.getElementById('addGameForm').reset();

        // Show success notification
        this.showNotification('Game added successfully!', 'success');
    }

    exportData() {
        const data = {
            products: this.products,
            customerGrowth: [120, 150, 180, 220, 250, 280, 310, 350, 380, 410, 450, 480],
            monthlyRevenue: [15000, 18000, 22000, 25000, 28000, 32000, 35000, 38000, 42000, 45000, 48000, 52000],
            orderStatus: {
                completed: 65,
                processing: 20,
                shipped: 10,
                cancelled: 5
            }
        };

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

    initializeCharts() {
        // Customer Growth Chart
        const customerData = {
            labels: this.months,
            datasets: [{
                label: 'New Customers',
                data: [120, 150, 180, 220, 250, 280, 310, 350, 380, 410, 450, 480],
                borderColor: this.chartColors.purple,
                backgroundColor: 'rgba(106, 27, 154, 0.1)',
                tension: 0.4,
                fill: true
            }]
        };

        new Chart('customerGrowthChart', {
            type: 'line',
            data: customerData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: true,
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                }
            }
        });

        // Monthly Revenue Chart
        const revenueData = {
            labels: this.months,
            datasets: [{
                label: 'Revenue',
                data: [15000, 18000, 22000, 25000, 28000, 32000, 35000, 38000, 42000, 45000, 48000, 52000],
                backgroundColor: this.chartColors.lightPurple,
                borderRadius: 8
            }]
        };

        new Chart('revenueChart', {
            type: 'bar',
            data: revenueData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: true,
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                }
            }
        });

        // Order Status Chart
        const orderStatusData = {
            labels: ['Completed', 'Processing', 'Shipped', 'Cancelled'],
            datasets: [{
                data: [65, 20, 10, 5],
                backgroundColor: [
                    this.chartColors.green,
                    this.chartColors.orange,
                    this.chartColors.blue,
                    this.chartColors.red
                ]
            }]
        };

        new Chart('orderStatusChart', {
            type: 'doughnut',
            data: orderStatusData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }

    displayTopProducts() {
        const topProducts = [
            { 
                name: 'PlayStation 5', 
                sales: 1250, 
                image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300&h=300&fit=crop' 
            },
            { 
                name: 'Xbox Series X', 
                sales: 980, 
                image: 'https://images.unsplash.com/photo-1621259182978-fbf433fd6eb7?w=300&h=300&fit=crop' 
            },
            { 
                name: 'Nintendo Switch', 
                sales: 850, 
                image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=300&h=300&fit=crop' 
            },
            { 
                name: 'Gaming Headset Pro', 
                sales: 620, 
                image: 'https://images.unsplash.com/photo-1618066296858-06f1a1c501cf?w=300&h=300&fit=crop' 
            },
            { 
                name: 'Wireless Controller', 
                sales: 580, 
                image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=300&h=300&fit=crop' 
            }
        ];

        const topProductsContainer = document.getElementById('topProducts');
        topProductsContainer.innerHTML = topProducts.map((product, index) => `
            <div class="product-item">
                <span class="rank">#${index + 1}</span>
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.sales} units sold</p>
                </div>
            </div>
        `).join('');
    }

    displayOrderStatus() {
        // Order status is displayed via the doughnut chart initialized in initializeCharts()
    }
}

// Initialize dashboard service
const dashboard = new DashboardService();

// Export for use in other files
window.dashboard = dashboard; 