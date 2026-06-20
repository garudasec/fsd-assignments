// Login page

(function () {
  if (AppStorage.getLoggedInUser()) {
    window.location.href = "index.html";
    return;
  }

  const loginForm = document.querySelector("#loginForm");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (!email || !password) {
      Swal.fire({ icon: "error", title: "Oops...", text: "All fields are required" });
      return;
    }

    const users = AppStorage.getUsers();

    const foundUser = users.find((user) => user.email.toLowerCase() === email.toLowerCase());

    if (!foundUser) {
      Swal.fire({ icon: "error", title: "User Not Found", text: "Please signup first" });
      return;
    }

    if (foundUser.password !== password) {
      Swal.fire({ icon: "error", title: "Wrong Password", text: "Please enter correct password" });
      return;
    }

    AppStorage.setLoggedInUser(foundUser);

    Swal.fire({ icon: "success", title: "Login Successful", text: `Welcome ${foundUser.name}` });

    loginForm.reset();

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1200);
  });
})();
