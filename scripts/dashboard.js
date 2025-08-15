// Add this at the beginning of the file
let currentPeriod = 'today'; // Définit la période actuelle affichée sur le tableau de bord (par défaut : aujourd'hui).

// Données fictives pour les graphiques et le tableau de bord
const salesData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Mois de l'année
  datasets: [
    {
      label: 'Sales Revenue', // Nom de la courbe
      data: [65000, 59000, 80000, 81000, 86000, 95000, 91000, 88000, 85000, 87000, 89000, 92000], // Revenus mensuels simulés
      backgroundColor: 'rgba(72, 52, 212, 0.1)', // Couleur de fond du graphique
      borderColor: '#4834d4', // Couleur de la bordure
      tension: 0.4, // Courbure de la ligne
      fill: true, // Remplit la zone sous la courbe
      pointRadius: 6, // Taille des points sur la courbe
      pointBackgroundColor: '#ffffff', // Couleur de fond des points
      pointBorderColor: '#4834d4', // Couleur de la bordure des points
      pointBorderWidth: 2, // Épaisseur de la bordure des points
      pointHoverRadius: 8, // Taille des points lorsqu'ils sont survolés
      pointHoverBackgroundColor: '#4834d4', // Couleur de fond des points lorsqu'ils sont survolés
      pointHoverBorderColor: '#ffffff', // Couleur de la bordure des points survolés
      pointHoverBorderWidth: 2, // Épaisseur de la bordure des points survolés
    },
  ],
};

const genreData = {
  labels: ['Action', 'RPG', 'Strategy', 'Sports', 'Adventure', 'Simulation'], // Genres de jeux
  datasets: [
    {
      data: [30, 25, 20, 15, 20, 15], // Pourcentage de chaque genre
      backgroundColor: [
        // Couleurs pour chaque segment
        '#4834d4', // Couleur pour "Action"
        '#00b894', // Couleur pour "RPG"
        '#ff7675', // Couleur pour "Strategy"
        '#fdcb6e', // Couleur pour "Sports"
        '#0984e3', // Couleur pour "Adventure"
        '#6c5ce7', // Couleur pour "Simulation"
      ],
      borderWidth: 0, // Pas de bordure entre les segments
      borderRadius: 5, // Arrondi des segments
      spacing: 5, // Espacement entre les segments
    },
  ],
};

// Données statistiques pour différentes périodes
const periodStats = {
  today: {
    // Données pour aujourd'hui
    totalGames: 250, // Nombre total de jeux disponibles
    activeUsers: 1234, // Nombre d'utilisateurs actifs
    totalSales: 45678, // Nombre total de ventes
    revenue: 32456, // Chiffre d'affaires
    trends: {
      // Évolution des données
      games: 12.5, // Évolution des jeux (en %)
      users: 8.2, // Évolution des utilisateurs
      sales: 5.7, // Évolution des ventes
      revenue: -2.4, // Évolution du chiffre d'affaires (négative ici)
    },
  },
  // Idem pour les périodes 'week', 'month', et 'year'.
};

// Initialisation des graphiques et du tableau de bord lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
  initializeCharts(); // Crée les graphiques
  initializeDateFilter(); // Configure les filtres de date
  updateStatistics(); // Met à jour les statistiques affichées
});

function initializeCharts() {
  // Initialisation du graphique des ventes
  const salesChart = document.getElementById('salesChart'); // Récupère le canvas du graphique
  if (salesChart) {
    new Chart(salesChart, {
      // Crée un graphique de type "ligne" avec les données
      type: 'line',
      data: salesData,
      options: {
        responsive: true, // Rend le graphique responsive
        maintainAspectRatio: false, // Permet de changer les proportions
        layout: {
          padding: {
            // Ajoute des marges autour du graphique
            top: 20,
            right: 25,
            bottom: 20,
            left: 25,
          },
        },
        plugins: {
          legend: { display: false }, // Cache la légende
          tooltip: {
            // Personnalise l'apparence des infobulles
            backgroundColor: '#ffffff', // Couleur de fond blanche
            titleColor: '#2d3436', // Couleur du titre
            bodyColor: '#2d3436', // Couleur du contenu
            borderColor: '#e1e8ed', // Couleur de bordure
            borderWidth: 1, // Épaisseur de la bordure
            callbacks: {
              // Définit le format des labels
              label: function (context) {
                return '$ ' + context.parsed.y.toLocaleString(); // Format "monétaire"
              },
            },
          },
        },
        scales: {
          y: {
            // Configuration de l'axe Y
            beginAtZero: true, // Commence à 0
            ticks: {
              // Apparence des ticks
              callback: function (value) {
                return '$ ' + value.toLocaleString(); // Format "monétaire"
              },
            },
          },
        },
      },
    });
  }

  // Initialisation du graphique en anneau pour les genres
  const genreChart = document.getElementById('genreChart');
  if (genreChart) {
    new Chart(genreChart, {
      type: 'doughnut',
      data: genreData,
      options: {
        responsive: true,
        layout: {
          padding: { top: 30, bottom: 30, left: 20, right: 140 },
        },
        plugins: {
          legend: { position: 'right' }, // Place la légende à droite
          tooltip: {
            callbacks: {
              label: function (context) {
                const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                const percentage = ((context.raw / total) * 100).toFixed(1);
                return `${context.label}: ${percentage}% (${context.raw} jeux)`;
              },
            },
          },
        },
      },
    });
  }
}

// Fonction pour mettre à jour les statistiques
function updateStatistics() {
  const totalGames = games.length; // Calcule le nombre total de jeux
  const totalValue = games.reduce((sum, game) => sum + game.price * game.stock, 0); // Valeur totale de l'inventaire
  const lowStock = games.filter(game => game.stock < 30).length; // Jeux en stock faible (<30)

  updateStatCard('Total Games', totalGames); // Met à jour la carte "Total Games"
  updateStatCard('Total Value', `$${totalValue.toFixed(2)}`); // Met à jour la carte "Total Value"
  updateStatCard('Low Stock Items', lowStock); // Met à jour la carte "Low Stock Items"
}

// Met à jour les valeurs dans les cartes de statistiques
function updateStatCard(title, value) {
  const cards = document.querySelectorAll('.stat-card'); // Récupère toutes les cartes
  cards.forEach(card => {
    const cardTitle = card.querySelector('h3'); // Titre de la carte
    if (cardTitle && cardTitle.textContent === title) {
      const valueElement = card.querySelector('p'); // Élément contenant la valeur
      if (valueElement) valueElement.textContent = value; // Met à jour la valeur
    }
  });
}
