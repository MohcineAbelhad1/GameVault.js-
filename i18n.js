const translations = {
    en: {
        // Navigation
        dashboard: 'Dashboard',
        users: 'Users',
        products: 'Products',
        orders: 'Orders',
        clients: 'Clients',
        invoices: 'Invoices',
        logout: 'Logout',
        
        // Actions
        create: 'Create',
        edit: 'Edit',
        delete: 'Delete',
        save: 'Save',
        cancel: 'Cancel',
        search: 'Search...',
        export: 'Export',
        
        // Table headers
        id: 'ID',
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        status: 'Status',
        date: 'Date',
        actions: 'Actions',
        
        // Messages
        confirmDelete: 'Are you sure you want to delete this item?',
        itemCreated: 'Item created successfully',
        itemUpdated: 'Item updated successfully',
        itemDeleted: 'Item deleted successfully',
        error: 'An error occurred',
        
        // Dashboard
        totalUsers: 'Total Users',
        totalProducts: 'Total Products',
        totalOrders: 'Total Orders',
        totalRevenue: 'Total Revenue',
        recentOrders: 'Recent Orders',
        topProducts: 'Top Products',
        
        // Forms
        required: 'This field is required',
        invalidEmail: 'Invalid email address',
        passwordMin: 'Password must be at least 6 characters',
    },
    
    fr: {
        // Navigation
        dashboard: 'Tableau de bord',
        users: 'Utilisateurs',
        products: 'Produits',
        orders: 'Commandes',
        clients: 'Clients',
        invoices: 'Factures',
        logout: 'Déconnexion',
        
        // Actions
        create: 'Créer',
        edit: 'Modifier',
        delete: 'Supprimer',
        save: 'Enregistrer',
        cancel: 'Annuler',
        search: 'Rechercher...',
        export: 'Exporter',
        
        // Table headers
        id: 'ID',
        name: 'Nom',
        email: 'Email',
        phone: 'Téléphone',
        status: 'Statut',
        date: 'Date',
        actions: 'Actions',
        
        // Messages
        confirmDelete: 'Êtes-vous sûr de vouloir supprimer cet élément ?',
        itemCreated: 'Élément créé avec succès',
        itemUpdated: 'Élément mis à jour avec succès',
        itemDeleted: 'Élément supprimé avec succès',
        error: 'Une erreur est survenue',
        
        // Dashboard
        totalUsers: 'Total Utilisateurs',
        totalProducts: 'Total Produits',
        totalOrders: 'Total Commandes',
        totalRevenue: 'Revenu Total',
        recentOrders: 'Commandes Récentes',
        topProducts: 'Meilleurs Produits',
        
        // Forms
        required: 'Ce champ est obligatoire',
        invalidEmail: 'Adresse email invalide',
        passwordMin: 'Le mot de passe doit contenir au moins 6 caractères',
    },
    
    ar: {
        // Navigation
        dashboard: 'لوحة التحكم',
        users: 'المستخدمون',
        products: 'المنتجات',
        orders: 'الطلبات',
        clients: 'العملاء',
        invoices: 'الفواتير',
        logout: 'تسجيل الخروج',
        
        // Actions
        create: 'إنشاء',
        edit: 'تعديل',
        delete: 'حذف',
        save: 'حفظ',
        cancel: 'إلغاء',
        search: 'بحث...',
        export: 'تصدير',
        
        // Table headers
        id: 'المعرف',
        name: 'الاسم',
        email: 'البريد الإلكتروني',
        phone: 'الهاتف',
        status: 'الحالة',
        date: 'التاريخ',
        actions: 'الإجراءات',
        
        // Messages
        confirmDelete: 'هل أنت متأكد من حذف هذا العنصر؟',
        itemCreated: 'تم إنشاء العنصر بنجاح',
        itemUpdated: 'تم تحديث العنصر بنجاح',
        itemDeleted: 'تم حذف العنصر بنجاح',
        error: 'حدث خطأ',
        
        // Dashboard
        totalUsers: 'إجمالي المستخدمين',
        totalProducts: 'إجمالي المنتجات',
        totalOrders: 'إجمالي الطلبات',
        totalRevenue: 'إجمالي الإيرادات',
        recentOrders: 'الطلبات الحديثة',
        topProducts: 'أفضل المنتجات',
        
        // Forms
        required: 'هذا الحقل مطلوب',
        invalidEmail: 'عنوان البريد الإلكتروني غير صالح',
        passwordMin: 'يجب أن تكون كلمة المرور 6 أحرف على الأقل',
    }
};

class I18nService {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || CONFIG.DEFAULT_LANGUAGE;
        this.setLanguage(this.currentLanguage);
    }

    setLanguage(lang) {
        if (CONFIG.LANGUAGES.includes(lang)) {
            this.currentLanguage = lang;
            localStorage.setItem('language', lang);
            document.documentElement.setAttribute('lang', lang);
            if (lang === 'ar') {
                document.documentElement.setAttribute('dir', 'rtl');
            } else {
                document.documentElement.setAttribute('dir', 'ltr');
            }
            this.updatePageTranslations();
        }
    }

    translate(key) {
        return translations[this.currentLanguage][key] || key;
    }

    updatePageTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = this.translate(key);
        });
    }
}

// Create i18n instance
const i18n = new I18nService(); 