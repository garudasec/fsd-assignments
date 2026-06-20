// Cart page


(function () {
  const user = requireAuth();
  if (!user) return;

  renderNavbar("cart");

  const listEl = document.getElementById("cartList");
  const summaryEl = document.getElementById("cartSummary");

  function render() {
    const cart = AppStorage.getCart();

    if (!cart.length) {
      listEl.innerHTML = `
        <div class="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/>
            <path d="M2 3h2l2.4 12.2a2 2 0 0 0 2 1.8h8.1a2 2 0 0 0 2-1.6L21 7H5.2"/>
          </svg>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added anything yet. Let's fix that.</p>
          <a class="btn btn-primary" href="products.html">Continue Shopping</a>
        </div>
      `;
      summaryEl.style.display = "none";
      return;
    }

    summaryEl.style.display = "flex";

    listEl.innerHTML = `<div class="line-list">${cart.map((item) => `
      <div class="line-item" data-id="${item.id}">
        <img src="${item.image}" alt="${escapeHtml(item.title)}">
        <div>
          <div class="line-title">${escapeHtml(item.title)}</div>
          <div class="line-category">${escapeHtml(item.category)}</div>
        </div>
        <div class="qty-row">
          <button class="btn-icon" data-dec="${item.id}" aria-label="Decrease quantity">-</button>
          <span class="qty-value">${item.quantity || 1}</span>
          <button class="btn-icon" data-inc="${item.id}" aria-label="Increase quantity">+</button>
        </div>
        <div class="line-price-col">
          <span class="price-tag">${formatPrice(item.price * (item.quantity || 1))}</span>
          <button class="btn btn-danger btn-sm" data-remove="${item.id}" style="margin-left:8px;">Remove</button>
        </div>
      </div>
    `).join("")}</div>`;

    const grandTotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    const itemCount = AppStorage.cartCount(cart);

    summaryEl.innerHTML = `
      <div class="summary-card">
        <div class="summary-row"><span>Items</span><span>${itemCount}</span></div>
        <div class="summary-total"><span>Total</span><span>${formatPrice(grandTotal)}</span></div>
        <button class="btn btn-primary btn-block" id="checkoutBtn">Proceed to Checkout</button>
      </div>
    `;

    listEl.querySelectorAll("[data-inc]").forEach((btn) => {
      btn.addEventListener("click", () => updateQty(Number(btn.dataset.inc), 1));
    });
    listEl.querySelectorAll("[data-dec]").forEach((btn) => {
      btn.addEventListener("click", () => updateQty(Number(btn.dataset.dec), -1));
    });
    listEl.querySelectorAll("[data-remove]").forEach((btn) => {
      btn.addEventListener("click", () => removeItem(Number(btn.dataset.remove)));
    });

    const checkoutBtn = document.getElementById("checkoutBtn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        Swal.fire({
          icon: "success",
          title: "Order placed!",
          text: "Thanks for shopping with Naptol.",
        });
        AppStorage.saveCart([]);
        renderNavbar("cart");
        render();
      });
    }
  }

  function updateQty(id, delta) {
    const cart = AppStorage.getCart();
    const item = cart.find((p) => p.id === id);
    if (!item) return;

    item.quantity = (item.quantity || 1) + delta;

    if (item.quantity <= 0) {
      AppStorage.saveCart(cart.filter((p) => p.id !== id));
    } else {
      AppStorage.saveCart(cart);
    }

    renderNavbar("cart");
    render();
  }

  function removeItem(id) {
    const cart = AppStorage.getCart().filter((p) => p.id !== id);
    AppStorage.saveCart(cart);
    showToast("Product removed from cart", "info");
    renderNavbar("cart");
    render();
  }

  render();
})();
