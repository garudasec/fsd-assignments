// Navbar

const NAV_ICONS = {
  home: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>`,
  products: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/></svg>`,
  cart: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M2 3h2l2.4 12.2a2 2 0 0 0 2 1.8h8.1a2 2 0 0 0 2-1.6L21 7H5.2"/></svg>`,
  heart: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.4-9.5-8.7C.7 9 2 5 6 5c2.1 0 3.6 1.4 6 3.8C14.4 6.4 15.9 5 18 5c4 0 5.3 4 3.5 7.3C19 16.6 12 21 12 21z"/></svg>`,
  heartFill: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.4-9.5-8.7C.7 9 2 5 6 5c2.1 0 3.6 1.4 6 3.8C14.4 6.4 15.9 5 18 5c4 0 5.3 4 3.5 7.3C19 16.6 12 21 12 21z"/></svg>`,
  mail: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>`,
  chart: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><rect x="7" y="11" width="3" height="6"/><rect x="12" y="7" width="3" height="10"/><rect x="17" y="13" width="3" height="4"/></svg>`,
  sun: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>`,
  moon: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>`,
  logout: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>`,
};

function renderNavbar(activeKey) {
  const root = document.getElementById("navbar-root");
  if (!root) return;

  const user = AppStorage.getLoggedInUser();
  const cartCount = AppStorage.cartCount();
  const wishlistCount = AppStorage.getWishlist().length;
  const isDark = document.documentElement.classList.contains("dark");

  const links = [
    { key: "home", href: "index.html", label: "Home", icon: NAV_ICONS.home },
    { key: "products", href: "products.html", label: "Products", icon: NAV_ICONS.products },
    { key: "cart", href: "cart.html", label: "Cart", icon: NAV_ICONS.cart, badge: cartCount },
    { key: "wishlist", href: "wishlist.html", label: "Wishlist", icon: NAV_ICONS.heart, badge: wishlistCount },
    { key: "contact", href: "contact.html", label: "Contact", icon: NAV_ICONS.mail },
    { key: "dashboard", href: "dashboard.html", label: "Dashboard", icon: NAV_ICONS.chart },
  ];

  root.innerHTML = `
    <nav class="navbar">
      <a href="index.html" class="nav-brand"><span class="nav-dot">●</span> Naptol</a>

      <div class="nav-links">
        ${links.map(link => `
          <a href="${link.href}" class="nav-link ${link.key === activeKey ? "active" : ""}">
            ${link.icon}
            <span>${link.label}</span>
            ${link.badge ? `<span class="nav-badge">${link.badge}</span>` : ""}
          </a>
        `).join("")}
      </div>

      <div class="nav-actions">
        ${user ? `<span class="nav-user">Hi, ${escapeHtml(user.name)}</span>` : ""}
        <button class="btn-icon" id="themeToggleBtn" title="Toggle dark mode" aria-label="Toggle dark mode">
          ${isDark ? NAV_ICONS.sun : NAV_ICONS.moon}
        </button>
        ${user ? `
          <button class="btn btn-outline btn-sm" id="navLogoutBtn">
            ${NAV_ICONS.logout} Logout
          </button>
        ` : ""}
      </div>
    </nav>
  `;

  const themeBtn = document.getElementById("themeToggleBtn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const nowDark = document.documentElement.classList.toggle("dark");
      AppStorage.setTheme(nowDark ? "dark" : "light");
      themeBtn.innerHTML = nowDark ? NAV_ICONS.sun : NAV_ICONS.moon;
    });
  }

  const logoutBtn = document.getElementById("navLogoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      AppStorage.logout();
      showToast("Logged out");
      setTimeout(() => { window.location.href = "login.html"; }, 900);
    });
  }
}
