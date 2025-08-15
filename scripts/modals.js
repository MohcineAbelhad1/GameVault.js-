// Accessory Modal Functions
function openAddAccessoryModal() {
  document.getElementById('addAccessoryModal').style.display = 'block';
}

function closeAddAccessoryModal() {
  document.getElementById('addAccessoryModal').style.display = 'none';
}

// Console Modal Functions
function openAddConsoleModal() {
  document.getElementById('addConsoleModal').style.display = 'block';
}

function closeAddConsoleModal() {
  document.getElementById('addConsoleModal').style.display = 'none';
  document.getElementById('addConsoleForm').reset();
  document.getElementById('consoleImagePreview').innerHTML = 'Image preview will appear here';
  document.getElementById('consoleImagePreview').classList.add('empty');
}

// Order Modal Functions
function openAddOrderModal() {
  document.getElementById('addOrderModal').style.display = 'block';
}

function closeAddOrderModal() {
  document.getElementById('addOrderModal').style.display = 'none';
}

// User Modal Functions
function openAddUserModal() {
  document.getElementById('addUserModal').style.display = 'block';
}

function closeAddUserModal() {
  document.getElementById('addUserModal').style.display = 'none';
}

// Form Submit Handlers
document.getElementById('addGameForm').addEventListener('submit', function (e) {
  e.preventDefault();
  // Get form values
  const title = document.getElementById('gameTitle').value;
  const imageUrl = document.getElementById('gameImageUrl').value;
  const genre = document.getElementById('gameGenre').value;
  const price = document.getElementById('gamePrice').value;
  const stock = document.getElementById('gameStock').value;

  // Add to table
  addGameToTable(title, imageUrl, genre, price, stock);
  closeAddGameModal();
  this.reset();
});

document.getElementById('addAccessoryForm').addEventListener('submit', function (e) {
  e.preventDefault();
  // Get form values
  const title = document.getElementById('accessoryTitle').value;
  const imageUrl = document.getElementById('accessoryImageUrl').value;
  const category = document.getElementById('accessoryCategory').value;
  const price = document.getElementById('accessoryPrice').value;
  const stock = document.getElementById('accessoryStock').value;

  // Add to table
  addAccessoryToTable(title, imageUrl, category, price, stock);
  closeAddAccessoryModal();
  this.reset();
});

document.getElementById('addConsoleForm').addEventListener('submit', function (e) {
  e.preventDefault();
  // Get form values
  const title = document.getElementById('consoleTitle').value;
  const imageUrl = document.getElementById('consoleImageUrl').value;
  const brand = document.getElementById('consoleBrand').value;
  const price = document.getElementById('consolePrice').value;
  const stock = document.getElementById('consoleStock').value;

  // Add to table
  addConsoleToTable(title, imageUrl, brand, price, stock);
  closeAddConsoleModal();
  this.reset();
});

document.getElementById('addOrderForm').addEventListener('submit', function (e) {
  e.preventDefault();
  // Get form values
  const customer = document.getElementById('orderCustomer').value;
  const products = Array.from(document.getElementById('orderProducts').selectedOptions)
    .map(option => option.text)
    .join(', ');
  const total = document.getElementById('orderTotal').value;
  const status = document.getElementById('orderStatus').value;

  // Add to table
  addOrderToTable(customer, products, total, status);
  closeAddOrderModal();
});

document.getElementById('addUserForm').addEventListener('submit', function (e) {
  e.preventDefault();
  // Get form values
  const name = document.getElementById('userName').value;
  const email = document.getElementById('userEmail').value;
  const role = document.getElementById('userRole').value;
  const status = document.getElementById('userStatus').value;

  // Add to table
  addUserToTable(name, email, role, status);
  closeAddUserModal();
});

// Helper Functions to Add Items to Tables
function addGameToTable(title, imageUrl, genre, price, stock) {
  const tbody = document.getElementById('gamesTableBody');
  const tr = document.createElement('tr');
  tr.innerHTML = `
        <td>
            <div class="product-cell">
                <img src="${imageUrl}" alt="${title}" class="product-thumb">
                <span>${title}</span>
            </div>
        </td>
        <td>${genre}</td>
        <td>$${price}</td>
        <td>${stock}</td>
        <td>
            <button class="btn-primary"><i class="fas fa-edit"></i></button>
            <button class="btn-secondary"><i class="fas fa-trash"></i></button>
        </td>
    `;
  tbody.appendChild(tr);
}

function addAccessoryToTable(title, imageUrl, category, price, stock) {
  const tbody = document.getElementById('accessoriesTableBody');
  const tr = document.createElement('tr');
  tr.innerHTML = `
        <td>
            <div class="product-cell">
                <img src="${imageUrl}" alt="${title}" class="product-thumb">
                <span>${title}</span>
            </div>
        </td>
        <td>${category}</td>
        <td>$${price}</td>
        <td>${stock}</td>
        <td>
            <button class="btn-primary"><i class="fas fa-edit"></i></button>
            <button class="btn-secondary"><i class="fas fa-trash"></i></button>
        </td>
    `;
  tbody.appendChild(tr);
}

function addConsoleToTable(title, imageUrl, brand, price, stock) {
  const tbody = document.getElementById('consolesTableBody');
  const tr = document.createElement('tr');
  tr.innerHTML = `
        <td>
            <div class="product-cell">
                <img src="${imageUrl}" alt="${title}" class="product-thumb">
                <span>${title}</span>
            </div>
        </td>
        <td>${brand}</td>
        <td>$${price}</td>
        <td>${stock}</td>
        <td>
            <button class="btn-primary"><i class="fas fa-edit"></i></button>
            <button class="btn-secondary"><i class="fas fa-trash"></i></button>
        </td>
    `;
  tbody.appendChild(tr);
}

function addOrderToTable(customer, products, total, status) {
  const tbody = document.getElementById('ordersTableBody');
  const orderId = '#ORD' + String(Math.floor(Math.random() * 1000)).padStart(3, '0');
  const date = new Date().toISOString().split('T')[0];
  const tr = document.createElement('tr');
  tr.innerHTML = `
        <td>${orderId}</td>
        <td>${customer}</td>
        <td>${products}</td>
        <td>$${total}</td>
        <td><span class="status-badge ${status}">${status}</span></td>
        <td>${date}</td>
        <td>
            <button class="btn-primary"><i class="fas fa-edit"></i></button>
            <button class="btn-secondary"><i class="fas fa-trash"></i></button>
        </td>
    `;
  tbody.appendChild(tr);
}

function addUserToTable(name, email, role, status) {
  const tbody = document.getElementById('usersTableBody');
  const userId = '#USR' + String(Math.floor(Math.random() * 1000)).padStart(3, '0');
  const date = new Date().toISOString().split('T')[0];
  const tr = document.createElement('tr');
  tr.innerHTML = `
        <td>${userId}</td>
        <td>${name}</td>
        <td>${email}</td>
        <td><span class="role-badge ${role}">${role}</span></td>
        <td><span class="status-badge ${status}">${status}</span></td>
        <td>${date}</td>
        <td>
            <button class="btn-primary"><i class="fas fa-edit"></i></button>
            <button class="btn-secondary"><i class="fas fa-trash"></i></button>
        </td>
    `;
  tbody.appendChild(tr);
}

// Close modals when clicking outside
window.onclick = function (event) {
  const modals = document.getElementsByClassName('modal');
  for (let modal of modals) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }
};

// Image URL Preview Functionality
function setupImagePreview(inputId, previewId) {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);

  input.addEventListener('input', function () {
    const url = this.value;
    if (url) {
      const img = new Image();
      img.onload = function () {
        preview.innerHTML = '';
        preview.appendChild(img);
        preview.classList.remove('empty');
      };
      img.onerror = function () {
        preview.innerHTML = 'Invalid image URL';
        preview.classList.add('empty');
      };
      img.src = url;
    } else {
      preview.innerHTML = 'Image preview will appear here';
      preview.classList.add('empty');
    }
  });
}

// Setup image previews for all forms
document.addEventListener('DOMContentLoaded', function () {
  setupImagePreview('gameImageUrl', 'gameImagePreview');
  setupImagePreview('accessoryImageUrl', 'accessoryImagePreview');
  setupImagePreview('consoleImageUrl', 'consoleImagePreview');
});

// Section Cancel Functions
function cancelGameSection() {
  if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
    document.getElementById('games').classList.add('hidden');
    document.querySelector('a[href="#dashboard"]').click();
  }
}

function cancelAccessorySection() {
  if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
    document.getElementById('accessories').classList.add('hidden');
    document.querySelector('a[href="#dashboard"]').click();
  }
}

function cancelConsoleSection() {
  if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
    document.getElementById('consoles').classList.add('hidden');
    document.querySelector('a[href="#dashboard"]').click();
  }
}

function cancelOrderSection() {
  if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
    document.getElementById('orders').classList.add('hidden');
    document.querySelector('a[href="#dashboard"]').click();
  }
}
