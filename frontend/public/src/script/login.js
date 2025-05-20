document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  fetch("http://localhost/isychiawebapp/backend/login.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        // Redirect to React chat app
        window.location.href = "http://localhost:3000/chat";
      } else {
        document.getElementById("errorLabel").textContent = data.message || "Login failed";
      }
    })
    .catch((err) => {
      console.error("Login error:", err);
      document.getElementById("errorLabel").textContent = "Error connecting to server";
    });
});
