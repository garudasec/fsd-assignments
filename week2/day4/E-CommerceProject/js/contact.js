// Contact page


(function () {
  const user = requireAuth();
  if (!user) return;

  renderNavbar("contact");

  const form = document.getElementById("contactForm");
  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const messageEl = document.getElementById("message");
  const successEl = document.getElementById("contactSuccess");

  // Pre-fill from the logged-in account for convenience
  nameEl.value = user.name || "";
  emailEl.value = user.email || "";

  function setError(input, errorEl, message) {
    if (message) {
      input.classList.add("invalid");
      errorEl.textContent = message;
      errorEl.classList.add("show");
      return false;
    }
    input.classList.remove("invalid");
    errorEl.classList.remove("show");
    return true;
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    successEl.classList.remove("show");

    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const message = messageEl.value.trim();

    const nameOk = setError(nameEl, document.getElementById("nameError"), !name ? "Name is required" : "");
    const emailOk = setError(emailEl, document.getElementById("emailError"), !email ? "Email is required" : (!isValidEmail(email) ? "Enter a valid email address" : ""));
    const messageOk = setError(messageEl, document.getElementById("messageError"), !message ? "Message is required" : (message.length < 10 ? "Message should be at least 10 characters" : ""));

    if (!nameOk || !emailOk || !messageOk) return;

    const messages = AppStorage.getMessages();
    messages.push({ name, email, message, date: new Date().toISOString() });
    AppStorage.saveMessages(messages);

    successEl.classList.add("show");
    showToast("Message sent — we'll get back to you soon");
    form.reset();
    nameEl.value = user.name || "";
    emailEl.value = user.email || "";
  });
})();
