// Créer un jeu
function createGame(gameData) {
  // Crée un nouvel objet jeu avec un ID unique et les données fournies
  const newGame = {
    id: games.length + 1, // ID unique basé sur la longueur du tableau
    ...gameData, // Opérateur spread pour inclure les données du jeu
  };
  games.push(newGame); // Ajoute le nouveau jeu au tableau des jeux
  renderGamesTable(); // Met à jour la table pour afficher le nouveau jeu
  updateStatistics(); // Met à jour les statistiques affichées sur le tableau de bord
  return newGame; // Retourne le nouvel objet jeu créé
}

// Lire un jeu
function getGame(id) {
  // Trouve un jeu dans le tableau des jeux en utilisant son ID
  return games.find(game => game.id === id);
}

// Mettre à jour un jeu
function updateGame(id, updatedData) {
  // Trouve l'index du jeu à mettre à jour en utilisant son ID
  const index = games.findIndex(game => game.id === id);
  if (index !== -1) {
    // Met à jour les données du jeu en fusionnant les données existantes avec les nouvelles données
    games[index] = {
      ...games[index],
      ...updatedData,
    };
    renderGamesTable(); // Rafraîchit la table des jeux
    updateStatistics(); // Rafraîchit les statistiques
    return games[index]; // Retourne l'objet jeu mis à jour
  }
  return null; // Retourne null si le jeu n'a pas été trouvé
}

// Supprimer un jeu
function deleteGame(id) {
  // Demande confirmation à l'utilisateur avant de supprimer le jeu
  if (confirm('Êtes-vous sûr de vouloir supprimer ce jeu ?')) {
    // Trouve l'index du jeu à supprimer en utilisant son ID
    const index = games.findIndex(game => game.id === id);
    if (index !== -1) {
      games.splice(index, 1); // Supprime le jeu du tableau
      renderGamesTable(); // Met à jour la table des jeux
      updateStatistics(); // Met à jour les statistiques
      return true; // Indique que la suppression a réussi
    }
  }
  return false; // Indique que la suppression a échoué
}

// Modifier un jeu
function editGame(id) {
  // Récupère les données du jeu en utilisant son ID
  const game = getGame(id);
  if (game) {
    // Remplit les champs du formulaire avec les données du jeu
    document.getElementById('gameTitle').value = game.title;
    document.getElementById('gameGenre').value = game.genre;
    document.getElementById('gamePrice').value = game.price;
    document.getElementById('gameStock').value = game.stock;

    // Modifie le gestionnaire de soumission du formulaire
    const form = document.getElementById('addGameForm');
    form.onsubmit = e => {
      e.preventDefault(); // Empêche le rechargement de la page
      // Récupère les données mises à jour du formulaire
      const updatedGame = {
        title: document.getElementById('gameTitle').value,
        genre: document.getElementById('gameGenre').value,
        price: parseFloat(document.getElementById('gamePrice').value),
        stock: parseInt(document.getElementById('gameStock').value),
      };
      updateGame(id, updatedGame); // Met à jour le jeu avec les nouvelles données
      closeAddGameModal(); // Ferme la fenêtre modale
      form.onsubmit = null; // Réinitialise le gestionnaire de soumission
    };

    openAddGameModal(); // Ouvre la fenêtre modale pour l'édition
  }
}

// Fonctions de validation des données
function validateGameData(gameData) {
  const errors = []; // Tableau pour stocker les erreurs

  if (!gameData.title || gameData.title.trim() === '') {
    errors.push('Le titre est requis');
  }

  if (!gameData.genre || gameData.genre.trim() === '') {
    errors.push('Le genre est requis');
  }

  if (!gameData.price || isNaN(gameData.price) || gameData.price < 0) {
    errors.push('Le prix doit être un nombre positif valide');
  }

  if (!gameData.stock || isNaN(gameData.stock) || gameData.stock < 0) {
    errors.push('Le stock doit être un nombre positif valide');
  }

  return errors; // Retourne les erreurs
}

// Opérations en masse
function bulkUpdatePrices(percentage) {
  // Met à jour le prix de tous les jeux selon un pourcentage
  games.forEach(game => {
    game.price = parseFloat((game.price * (1 + percentage / 100)).toFixed(2));
  });
  renderGamesTable(); // Rafraîchit la table des jeux
  updateStatistics(); // Met à jour les statistiques
}

function bulkUpdateStock(amount) {
  // Ajoute ou soustrait un montant au stock de tous les jeux
  games.forEach(game => {
    game.stock = Math.max(0, game.stock + amount); // Le stock ne peut pas être négatif
  });
  renderGamesTable(); // Rafraîchit la table des jeux
  updateStatistics(); // Met à jour les statistiques
}

// Fonctions de filtrage et de tri
function filterGamesByGenre(genre) {
  // Retourne les jeux correspondant à un genre spécifique
  return games.filter(game => game.genre.toLowerCase() === genre.toLowerCase());
}

function filterGamesByPriceRange(min, max) {
  // Retourne les jeux dont le prix est dans une plage donnée
  return games.filter(game => game.price >= min && game.price <= max);
}

function sortGames(field, ascending = true) {
  // Trie les jeux selon un champ spécifique (croissant ou décroissant)
  const sortedGames = [...games].sort((a, b) => {
    if (a[field] < b[field]) return ascending ? -1 : 1;
    if (a[field] > b[field]) return ascending ? 1 : -1;
    return 0;
  });
  return sortedGames; // Retourne les jeux triés
}

// Gestionnaires d'événements pour le tri
document.addEventListener('DOMContentLoaded', () => {
  // Ajoute des écouteurs d'événements aux en-têtes de table pour le tri
  const tableHeaders = document.querySelectorAll('th');
  tableHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const field = header.textContent.toLowerCase(); // Champ à trier
      if (['title', 'genre', 'price', 'stock'].includes(field)) {
        const ascending = !header.classList.contains('sort-asc'); // Détermine le sens du tri
        // Supprime les classes de tri des autres en-têtes
        tableHeaders.forEach(h => {
          h.classList.remove('sort-asc', 'sort-desc');
        });
        // Ajoute la classe de tri à l'en-tête cliqué
        header.classList.add(ascending ? 'sort-asc' : 'sort-desc');
        // Trie et affiche les jeux
        const sortedGames = sortGames(field, ascending);
        renderGamesTable(sortedGames);
      }
    });
  });
});
