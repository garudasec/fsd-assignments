// Dashboard page

(function () {
  const user = requireAuth();
  if (!user) return;

  renderNavbar("dashboard");

  const gridEl = document.getElementById("statGrid");

  const STAT_ICONS = {
    users: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    cart: NAV_ICONS.cart,
    mail: NAV_ICONS.mail,
    heart: NAV_ICONS.heart,
    products: NAV_ICONS.products,
  };

  function renderStats(totalProducts) {
    const stats = [
      { label: "Total Users", value: AppStorage.getUsers().length, icon: STAT_ICONS.users },
      { label: "Total Cart Items", value: AppStorage.cartCount(), icon: STAT_ICONS.cart },
      { label: "Total Contact Messages", value: AppStorage.getMessages().length, icon: STAT_ICONS.mail },
      { label: "Total Wishlist Items", value: AppStorage.getWishlist().length, icon: STAT_ICONS.heart },
      { label: "Total Products", value: totalProducts, icon: STAT_ICONS.products },
    ];

    gridEl.innerHTML = stats.map((s) => `
      <div class="stat-card">
        <div class="stat-icon">${s.icon}</div>
        <div class="stat-value">${s.value}</div>
        <div class="stat-label">${s.label}</div>
      </div>
    `).join("");
  }

  renderStats("–");

  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((products) => renderStats(products.length))
    .catch(() => renderStats("–"));
})();
