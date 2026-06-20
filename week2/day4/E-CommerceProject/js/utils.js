// Shared helpers used across pages


// Graceful fallback if the SweetAlert2 CDN didn't load (offline, ad-blocker,
// slow network) so the app degrades to native dialogs instead of crashing.

if (typeof Swal === "undefined") {
  window.Swal = {
    fire(opts = {}) {
      const text = [opts.title, opts.text].filter(Boolean).join("\n");
      window.alert(text || "Notice");
      return Promise.resolve({ isConfirmed: true });
    },
  };
}

function showToast(text, icon = "success") {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon,
    title: text,
    showConfirmButton: false,
    timer: 1800,
    timerProgressBar: true,
  });
}

function formatPrice(value) {
  const num = Number(value) || 0;
  return `$${num.toFixed(2)}`;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.innerText = str ?? "";
  return div.innerHTML;
}

function starString(rate) {
  const rounded = Math.round(Number(rate) || 0);
  return "★".repeat(rounded) + "☆".repeat(5 - rounded);
}
