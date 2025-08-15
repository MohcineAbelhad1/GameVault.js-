class ApiService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async request(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // Generic CRUD operations
    async getAll(endpoint) {
        return this.request(endpoint);
    }

    async getById(endpoint, id) {
        return this.request(`${endpoint}/${id}`);
    }

    async create(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async update(endpoint, id, data) {
        return this.request(`${endpoint}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async delete(endpoint, id) {
        return this.request(`${endpoint}/${id}`, {
            method: 'DELETE'
        });
    }
}

// Create API instance
const api = new ApiService(CONFIG.API.BASE_URL); 