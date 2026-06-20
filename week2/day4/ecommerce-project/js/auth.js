  //  Auth guard — call requireAuth() at the top of any protected page.
  //  Redirects to login.html and returns null when nobody is logged in.


function requireAuth() {
  const user = AppStorage.getLoggedInUser();
  if (!user) {
    window.location.href = "login.html";
    return null;
  }
  return user;
}
