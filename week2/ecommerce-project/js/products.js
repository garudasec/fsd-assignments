// Product details

(function () {
  const user = requireAuth();
  if (!user) return;

  renderNavbar("products");

  const API = "https://fakestoreapi.com/products";
  const CATEGORIES_API = "https://fakestoreapi.com/products/categories";

  const rootEl = document.getElementById("root");
  const spinnerEl = document.getElementById("spinner");
  const chipRowEl = document.getElementById("chipRow");
  const searchEl = document.getElementById("search");
  const sortEl = document.getElementById("sort");

  let allProducts = [];
  let activeCategory = "all";

  function getCart() { return AppStorage.getCart(); }
  function getWishlist() { return AppStorage.getWishlist(); }

  function isInCart(id) { return getCart().some((item) => item.id === id); }
  function isInWishlist(id) { return getWishlist().some((item) => item.id === id); }

  function addToCart(product) {
    const cart = getCart();
    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      Swal.fire({ icon: "info", title: "Already in cart", text: "Product already added to cart." });
      return;
    }

    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      rating: product.rating,
      quantity: 1,
    });

    AppStorage.saveCart(cart);
    showToast("Product added to cart");
    renderNavbar("products");
    renderProducts(currentList());
  }

  function toggleWishlist(product) {
    const wishlist = getWishlist();
    const idx = wishlist.findIndex((item) => item.id === product.id);

    if (idx > -1) {
      wishlist.splice(idx, 1);
      showToast("Removed from wishlist", "info");
    } else {
      wishlist.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
        rating: product.rating,
      });
      showToast("Added to wishlist");
    }

    AppStorage.saveWishlist(wishlist);
    renderNavbar("products");
    renderProducts(currentList());
  }

  function viewDetails(product) {
    AppStorage.setSelectedProductId(String(product.id));
    window.location.href = "product-details.html";
  }

  function currentList() {
    let list = [...allProducts];

    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }

    const query = searchEl.value.trim().toLowerCase();
    if (query) {
      list = list.filter((p) => p.title.toLowerCase().includes(query));
    }

    const sortVal = sortEl.value;
    if (sortVal === "asc") list.sort((a, b) => a.price - b.price);
    if (sortVal === "desc") list.sort((a, b) => b.price - a.price);

    return list;
  }

  function renderProducts(list) {
    if (!list.length) {
      rootEl.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          <h3>No products found</h3>
          <p>Try a different search term or category.</p>
        </div>
      `;
      return;
    }

    rootEl.innerHTML = list.map((p) => `
      <div class="card" data-id="${p.id}">
        <div class="card-media">
          <button class="btn-icon card-wishlist ${isInWishlist(p.id) ? "active" : ""}" data-wishlist="${p.id}" aria-label="Toggle wishlist">
            ${isInWishlist(p.id) ? NAV_ICONS.heartFill : NAV_ICONS.heart}
          </button>
          <img src="${p.image}" alt="${escapeHtml(p.title)}">
        </div>
        <div class="card-body">
          <span class="card-category">${escapeHtml(p.category)}</span>
          <h3 class="card-title">${escapeHtml(p.title)}</h3>
          <div class="card-meta">
            <span class="price-tag">${formatPrice(p.price)}</span>
            <span class="card-rating"><span class="star">★</span> ${p.rating?.rate ?? "–"}</span>
          </div>
          <div class="card-actions">
            <button class="btn btn-outline btn-sm" data-details="${p.id}">View Details</button>
            <button class="btn btn-primary btn-sm" data-addcart="${p.id}" ${isInCart(p.id) ? "disabled" : ""}>
              ${isInCart(p.id) ? "In Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    `).join("");

    rootEl.querySelectorAll("[data-addcart]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const product = allProducts.find((p) => p.id === Number(btn.dataset.addcart));
        addToCart(product);
      });
    });

    rootEl.querySelectorAll("[data-wishlist]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const product = allProducts.find((p) => p.id === Number(btn.dataset.wishlist));
        toggleWishlist(product);
      });
    });

    rootEl.querySelectorAll("[data-details]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const product = allProducts.find((p) => p.id === Number(btn.dataset.details));
        viewDetails(product);
      });
    });
  }

  function renderChips(categories) {
    const items = ["all", ...categories];
    chipRowEl.innerHTML = items.map((cat) => `
      <button class="chip ${cat === activeCategory ? "active" : ""}" data-cat="${cat}">
        ${cat === "all" ? "All Products" : cat}
      </button>
    `).join("");

    chipRowEl.querySelectorAll(".chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        activeCategory = chip.dataset.cat;
        renderChips(categories);
        renderProducts(currentList());
      });
    });
  }

  function showSpinner(show) {
    spinnerEl.style.display = show ? "flex" : "none";
    rootEl.style.display = show ? "none" : "grid";
  }

  showSpinner(true);

  Promise.all([
    fetch(API).then((res) => res.json()),
    fetch(CATEGORIES_API).then((res) => res.json()),
  ])
    .then(([products, categories]) => {
      allProducts = products;
      renderChips(categories);
      renderProducts(currentList());
    })
    .catch((err) => {
      console.error(err);
      rootEl.innerHTML = `<div class="empty-state" style="grid-column:1/-1;"><h3>Couldn't load products</h3><p>Please check your connection and refresh the page.</p></div>`;
    })
    .finally(() => showSpinner(false));

  searchEl.addEventListener("input", () => renderProducts(currentList()));
  sortEl.addEventListener("change", () => renderProducts(currentList()));
})();
