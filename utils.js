// Date formatting
const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
};

// Number formatting
const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
};

// Currency formatting
const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
};

// Export to CSV
const exportToCSV = (data, filename) => {
    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(CONFIG.EXPORT.CSV_DELIMITER),
        ...data.map(row => 
            headers.map(header => 
                JSON.stringify(row[header] || '')
            ).join(CONFIG.EXPORT.CSV_DELIMITER)
        )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// Pagination
const createPagination = (totalItems, currentPage) => {
    const totalPages = Math.ceil(totalItems / CONFIG.PAGINATION.ITEMS_PER_PAGE);
    const maxPages = CONFIG.PAGINATION.MAX_PAGES_SHOWN;
    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(totalPages, startPage + maxPages - 1);

    if (endPage - startPage + 1 < maxPages) {
        startPage = Math.max(1, endPage - maxPages + 1);
    }

    return {
        totalPages,
        pages: Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i),
        currentPage,
        hasNext: currentPage < totalPages,
        hasPrev: currentPage > 1
    };
};

// Search and filter
const filterData = (data, searchTerm, fields) => {
    if (!searchTerm) return data;
    
    const term = searchTerm.toLowerCase();
    return data.filter(item => 
        fields.some(field => 
            String(item[field]).toLowerCase().includes(term)
        )
    );
};

// Sort data
const sortData = (data, field, direction = 'asc') => {
    return [...data].sort((a, b) => {
        const aVal = a[field];
        const bVal = b[field];
        
        if (typeof aVal === 'string') {
            return direction === 'asc' 
                ? aVal.localeCompare(bVal)
                : bVal.localeCompare(aVal);
        }
        
        return direction === 'asc' 
            ? aVal - bVal
            : bVal - aVal;
    });
};

// Show notification
const showNotification = (message, type = 'success') => {
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
};

// Debounce function
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}; 