// HOme page

(function () {
  const user = requireAuth();
  if (!user) return;

  renderNavbar("home");
})();
