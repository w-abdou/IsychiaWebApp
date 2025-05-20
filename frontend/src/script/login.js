document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorLabel = document.getElementById("errorLabel");

  if (!username || !password) {
    errorLabel.textContent = "Please enter both username and password.";
    return;
  }

  fetch("http://localhost/IsychiaWebApp/backend/login.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        // ✅ Redirect to React app passing username in query param
        window.location.href = `http://localhost:3000/chat?username=${encodeURIComponent(username)}`;
      } else {
        errorLabel.textContent = "Login failed: " + data.message;
      }
    })
    .catch((err) => {
      console.error("Login error:", err);
      errorLabel.textContent = "An error occurred. Please try again.";
    });
});
