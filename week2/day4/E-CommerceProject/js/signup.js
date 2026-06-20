// signup

(function () {
  if (AppStorage.getLoggedInUser()) {
    window.location.href = "index.html";
    return;
  }

  const signupForm = document.querySelector("#signupForm");

  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();
    const confirmPassword = document.querySelector("#confirmPassword").value.trim();

    if (!name || !email || !password || !confirmPassword) {
      Swal.fire({ icon: "error", title: "Oops...", text: "All fields are required" });
      return;
    }

    if (password.length < 6) {
      Swal.fire({ icon: "error", title: "Weak Password", text: "Password must be at least 6 characters" });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({ icon: "error", title: "Password Mismatch", text: "Passwords do not match" });
      return;
    }

    const users = AppStorage.getUsers();

    const existingUser = users.find((user) => user.email.toLowerCase() === email.toLowerCase());

    if (existingUser) {
      Swal.fire({ icon: "error", title: "Email Already Registered", text: "Please use another email" });
      return;
    }

    users.push({ name, email, password });
    AppStorage.saveUsers(users);

    Swal.fire({ icon: "success", title: "Signup Successful", text: "Account created successfully" });

    signupForm.reset();

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1200);
  });
})();
