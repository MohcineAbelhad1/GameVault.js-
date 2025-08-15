// Navigation handling
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section');

  // Navigation click handler
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);

      // Update active states
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // Show/hide sections
      sections.forEach(section => {
        section.classList.add('hidden');
        if (section.id === targetId) {
          section.classList.remove('hidden');
        }
      });
    });
  });

  // Language selector
  const languageSelect = document.getElementById('language');
  languageSelect.addEventListener('change', e => {
    const language = e.target.value;
    changeLanguage(language);
  });

  // Search functionality
  const searchInput = document.querySelector('.search-bar input');
  searchInput.addEventListener('input', e => {
    const searchTerm = e.target.value.toLowerCase();
    searchGames(searchTerm);
  });
});

// Mock data for games
const games = [
  { id: 1, title: 'Cyberpunk 2077', genre: 'RPG', price: 59.99, stock: 50 },
  { id: 2, title: 'FIFA 23', genre: 'Sports', price: 49.99, stock: 75 },
  { id: 3, title: 'Elden Ring', genre: 'Action', price: 59.99, stock: 30 },
  { id: 4, title: 'Age of Empires IV', genre: 'Strategy', price: 39.99, stock: 25 },
];

// Search games function
function searchGames(term) {
  const filteredGames = games.filter(
    game => game.title.toLowerCase().includes(term) || game.genre.toLowerCase().includes(term)
  );
  renderGamesTable(filteredGames);
}

// Render games table
function renderGamesTable(gamesToRender = games) {
  const tableBody = document.getElementById('gamesTableBody');
  if (!tableBody) return;

  tableBody.innerHTML = gamesToRender
    .map(
      game => `
        <tr>
            <td>${game.title}</td>
            <td>${game.genre}</td>
            <td>$${game.price}</td>
            <td>${game.stock}</td>
            <td>
                <button class="btn-primary" onclick="editGame(${game.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-secondary" onclick="deleteGame(${game.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `
    )
    .join('');
}

// Modal handling
function openAddGameModal() {
  const modal = document.getElementById('addGameModal');
  modal.style.display = 'block';
}

function closeAddGameModal() {
  const modal = document.getElementById('addGameModal');
  modal.style.display = 'none';
}

// Form handling
document.getElementById('addGameForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const newGame = {
    id: games.length + 1,
    title: document.getElementById('gameTitle').value,
    genre: document.getElementById('gameGenre').value,
    price: parseFloat(document.getElementById('gamePrice').value),
    stock: parseInt(document.getElementById('gameStock').value),
  };
  games.push(newGame);
  renderGamesTable();
  closeAddGameModal();
});

// Export to CSV
function exportToCSV() {
  const headers = ['Title', 'Genre', 'Price', 'Stock'];
  const csvContent = [
    headers.join(','),
    ...games.map(game => [game.title, game.genre, game.price, game.stock].join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', 'games_inventory.csv');
  a.click();
}

// Language translations (mock)
const translations = {
  en: {
    dashboard: 'Dashboard',
    games: 'Games',
    categories: 'Categories',
    orders: 'Orders',
    users: 'Users',
  },
  fr: {
    dashboard: 'Tableau de bord',
    games: 'Jeux',
    categories: 'Catégories',
    orders: 'Commandes',
    users: 'Utilisateurs',
  },
  ar: {
    dashboard: 'لوحة القيادة',
    games: 'ألعاب',
    categories: 'فئات',
    orders: 'طلبات',
    users: 'المستخدمين',
  },
};

function changeLanguage(lang) {
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  // Update document direction for Arabic
  document.dir = lang === 'ar' ? 'rtl' : 'ltr';
}

// Initial render
renderGamesTable();
