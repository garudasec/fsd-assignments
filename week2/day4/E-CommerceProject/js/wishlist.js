// wishlist page

(function () {
  const user = requireAuth();
  if (!user) return;

  renderNavbar("wishlist");

  const listEl = document.getElementById("wishlistList");

  function render() {
    const wishlist = AppStorage.getWishlist();

    if (!wishlist.length) {
      listEl.innerHTML = `
        <div class="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 21s-7-4.4-9.5-8.7C.7 9 2 5 6 5c2.1 0 3.6 1.4 6 3.8C14.4 6.4 15.9 5 18 5c4 0 5.3 4 3.5 7.3C19 16.6 12 21 12 21z"/>
          </svg>
          <h3>Your wishlist is empty</h3>
          <p>Save products you love here so you can find them later.</p>
          <a class="btn btn-primary" href="products.html">Browse Products</a>
        </div>
      `;
      return;
    }

    const cart = AppStorage.getCart();

    listEl.innerHTML = `<div class="line-list">${wishlist.map((item) => {
      const alreadyInCart = cart.some((c) => c.id === item.id);
      return `
      <div class="line-item" data-id="${item.id}">
        <img src="${item.image}" alt="${escapeHtml(item.title)}">
        <div>
          <div class="line-title">${escapeHtml(item.title)}</div>
          <div class="line-category">${escapeHtml(item.category)}</div>
        </div>
        <span class="price-tag">${formatPrice(item.price)}</span>
        <div class="line-price-col">
          <button class="btn btn-primary btn-sm" data-tocart="${item.id}" ${alreadyInCart ? "disabled" : ""}>
            ${alreadyInCart ? "In Cart" : "Add to Cart"}
          </button>
          <button class="btn btn-danger btn-sm" data-remove="${item.id}" style="margin-left:8px;">Remove</button>
        </div>
      </div>
    `;
    }).join("")}</div>`;

    listEl.querySelectorAll("[data-tocart]").forEach((btn) => {
      btn.addEventListener("click", () => moveToCart(Number(btn.dataset.tocart)));
    });
    listEl.querySelectorAll("[data-remove]").forEach((btn) => {
      btn.addEventListener("click", () => removeItem(Number(btn.dataset.remove)));
    });
  }

  function moveToCart(id) {
    const wishlist = AppStorage.getWishlist();
    const item = wishlist.find((p) => p.id === id);
    if (!item) return;

    const cart = AppStorage.getCart();
    if (cart.find((p) => p.id === id)) {
      Swal.fire({ icon: "info", title: "Already in cart", text: "Product already added to cart." });
      return;
    }

    cart.push({ ...item, quantity: 1 });
    AppStorage.saveCart(cart);
    showToast("Product added to cart");
    renderNavbar("wishlist");
    render();
  }

  function removeItem(id) {
    const wishlist = AppStorage.getWishlist().filter((p) => p.id !== id);
    AppStorage.saveWishlist(wishlist);
    showToast("Removed from wishlist", "info");
    renderNavbar("wishlist");
    render();
  }

  render();
})();
