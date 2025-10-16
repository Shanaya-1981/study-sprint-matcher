document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const isSignup = window.location.pathname.includes("signup");
    const endpoint = isSignup ? "/api/auth/signup" : "/api/auth/login";

    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    const body = { email, password };
    if (isSignup) {
      body.name = document.querySelector('input[name="name"]').value;
    }

    try {
      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("username", data.name);
        localStorage.setItem("showWelcome", "true");
        window.location.href = "index.html";
      } else {
        alert(data.error || "Error occurred");
      }
    } catch (error) {
      alert("Connection error. Please try again.");
    }
  });
});
