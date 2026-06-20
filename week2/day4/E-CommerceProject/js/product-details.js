// Product details

(function () {
  const user = requireAuth();
  if (!user) return;

  renderNavbar("products");

  const wrapEl = document.getElementById("detailsWrap");
  const spinnerEl = document.getElementById("spinner");

  const productId = AppStorage.getSelectedProductId();

  if (!productId) {
    wrapEl.innerHTML = `
      <div class="empty-state">
        <h3>No product selected</h3>
        <p>Head back to the catalog and pick a product to view its details.</p>
        <a class="btn btn-primary" href="products.html">Browse Products</a>
      </div>
    `;
  } else {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => res.json())
      .then((product) => {
        if (!product || !product.id) throw new Error("Product not found");
        renderDetails(product);
      })
      .catch(() => {
        wrapEl.innerHTML = `
          <div class="empty-state">
            <h3>Product not found</h3>
            <p>It may have been removed. Try browsing the catalog again.</p>
            <a class="btn btn-primary" href="products.html">Browse Products</a>
          </div>
        `;
      })
      .finally(() => { spinnerEl.style.display = "none"; });
  }

  function inCart(id) { return AppStorage.getCart().some((item) => item.id === id); }
  function inWishlist(id) { return AppStorage.getWishlist().some((item) => item.id === id); }

  function renderDetails(product) {
    wrapEl.innerHTML = `
      <a href="products.html" class="back-link">&larr; Back to products</a>
      <div class="details-grid">
        <div class="details-media">
          <img src="${product.image}" alt="${escapeHtml(product.title)}">
        </div>
        <div>
          <div class="details-category">${escapeHtml(product.category)}</div>
          <h1 class="details-title">${escapeHtml(product.title)}</h1>
          <div class="details-rating">${starString(product.rating?.rate)} <span>(${product.rating?.count ?? 0} reviews)</span></div>
          <div class="details-price"><span class="price-tag">${formatPrice(product.price)}</span></div>
          <p class="details-desc">${escapeHtml(product.description)}</p>
          <div class="details-actions">
            <button class="btn btn-primary" id="detailsAddCart" ${inCart(product.id) ? "disabled" : ""}>
              ${inCart(product.id) ? "In Cart" : "Add to Cart"}
            </button>
            <button class="btn btn-outline" id="detailsWishlist">
              ${inWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById("detailsAddCart").addEventListener("click", () => {
      const cart = AppStorage.getCart();
      if (cart.find((item) => item.id === product.id)) {
        Swal.fire({ icon: "info", title: "Already in cart", text: "Product already added to cart." });
        return;
      }
      cart.push({ id: product.id, title: product.title, price: product.price, image: product.image, category: product.category, rating: product.rating, quantity: 1 });
      AppStorage.saveCart(cart);
      showToast("Product added to cart");
      renderNavbar("products");
      renderDetails(product);
    });

    document.getElementById("detailsWishlist").addEventListener("click", () => {
      const wishlist = AppStorage.getWishlist();
      const idx = wishlist.findIndex((item) => item.id === product.id);
      if (idx > -1) {
        wishlist.splice(idx, 1);
        showToast("Removed from wishlist", "info");
      } else {
        wishlist.push({ id: product.id, title: product.title, price: product.price, image: product.image, category: product.category, rating: product.rating });
        showToast("Added to wishlist");
      }
      AppStorage.saveWishlist(wishlist);
      renderNavbar("products");
      renderDetails(product);
    });
  }
})();
