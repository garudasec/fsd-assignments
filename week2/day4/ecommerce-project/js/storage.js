
// AppStorage — single place that touches localStorage.
// Every other script reads/writes data through these methods so the
// storage schema only has to be known in one file.

const AppStorage = (function () {
  const KEYS = {
    USERS: "users",
    LOGGED_IN_USER: "loggedInUser",
    CART: "cart",
    WISHLIST: "wishlist",
    MESSAGES: "contactMessages",
    THEME: "theme",
    SELECTED_PRODUCT: "selectedProductId",
  };

  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) {
      console.error(`AppStorage: failed to read "${key}"`, err);
      return fallback;
    }
  }

  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  return {
    // Users / auth
    getUsers() { return read(KEYS.USERS, []); },
    saveUsers(users) { write(KEYS.USERS, users); },

    getLoggedInUser() { return read(KEYS.LOGGED_IN_USER, null); },
    setLoggedInUser(user) { write(KEYS.LOGGED_IN_USER, user); },
    logout() { localStorage.removeItem(KEYS.LOGGED_IN_USER); },

    // Cart — items shaped as { id, title, price, image, category, rating, quantity }
    getCart() { return read(KEYS.CART, []); },
    saveCart(cart) { write(KEYS.CART, cart); },
    cartCount(cart) {
      const items = cart || this.getCart();
      return items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    },

    // Wishlist — items shaped as { id, title, price, image, category, rating }
    getWishlist() { return read(KEYS.WISHLIST, []); },
    saveWishlist(list) { write(KEYS.WISHLIST, list); },

    // Contact messages
    getMessages() { return read(KEYS.MESSAGES, []); },
    saveMessages(messages) { write(KEYS.MESSAGES, messages); },

    // Theme
    getTheme() { return localStorage.getItem(KEYS.THEME) || "light"; },
    setTheme(theme) { localStorage.setItem(KEYS.THEME, theme); },

    // Product details hand-off
    getSelectedProductId() { return localStorage.getItem(KEYS.SELECTED_PRODUCT); },
    setSelectedProductId(id) { localStorage.setItem(KEYS.SELECTED_PRODUCT, id); },

    KEYS,
  };
})();
