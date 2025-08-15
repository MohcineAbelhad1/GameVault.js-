const CONFIG = {
    // API endpoints
    API: {
        BASE_URL: 'https://api.example.com/v1',
        ENDPOINTS: {
            GAMES: '/games',
            CONSOLES: '/consoles',
            ACCESSORIES: '/accessories',
            ORDERS: '/orders',
            CUSTOMERS: '/customers',
            CATEGORIES: '/categories',
            PUBLISHERS: '/publishers',
            PLATFORMS: '/platforms'
        }
    },
    
    // Pagination settings
    PAGINATION: {
        ITEMS_PER_PAGE: 12,
        MAX_PAGES_SHOWN: 5
    },
    
    // Chart colors
    CHART_COLORS: {
        primary: '#7B2CBF',
        secondary: '#9D4EDD',
        accent: '#C77DFF',
        dark: '#240046',
        light: '#E0AAFF',
        success: '#4CAF50',
        danger: '#f44336',
        warning: '#ff9800'
    },
    
    // Default language
    DEFAULT_LANGUAGE: 'en',
    
    // Available languages
    LANGUAGES: ['en', 'fr', 'ar'],
    
    // Game categories
    CATEGORIES: [
        'Action',
        'Adventure',
        'RPG',
        'Strategy',
        'Sports',
        'Racing',
        'Simulation',
        'Puzzle',
        'Horror',
        'Family'
    ],

    // Gaming platforms
    PLATFORMS: [
        'PlayStation 5',
        'PlayStation 4',
        'Xbox Series X|S',
        'Xbox One',
        'Nintendo Switch',
        'PC',
        'Mobile'
    ],

    // Order status
    ORDER_STATUS: {
        PENDING: 'pending',
        PROCESSING: 'processing',
        SHIPPED: 'shipped',
        DELIVERED: 'delivered',
        CANCELLED: 'cancelled'
    },

    // Stock status
    STOCK_STATUS: {
        IN_STOCK: 'in_stock',
        LOW_STOCK: 'low_stock',
        OUT_OF_STOCK: 'out_of_stock',
        PRE_ORDER: 'pre_order'
    },
    
    // Export settings
    EXPORT: {
        CSV_DELIMITER: ',',
        PDF_ORIENTATION: 'portrait',
        FILENAME_PREFIX: 'gamestore_'
    },

    // Image settings
    IMAGES: {
        PLACEHOLDER: 'https://via.placeholder.com/300x400',
        UPLOAD_MAX_SIZE: 5 * 1024 * 1024, // 5MB
        ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
        THUMBNAIL_SIZE: {
            width: 300,
            height: 400
        }
    },

    // Currency settings
    CURRENCY: {
        CODE: 'USD',
        SYMBOL: '$',
        POSITION: 'before' // 'before' or 'after'
    }
}; 