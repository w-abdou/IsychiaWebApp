
document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const errorLabel = document.getElementById("errorLabel");

  if (password !== confirmPassword) {
    errorLabel.textContent = "Passwords do not match";
    return;
  }

  fetch("http://localhost/isychiawebapp/backend/register.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        // Redirect to login after successful registration
        window.location.href = "login.html";
      } else {
        errorLabel.textContent = data.message || "Registration failed";
      }
    })
    .catch((err) => {
      console.error("Registration error:", err);
      errorLabel.textContent = "Error connecting to server";
    });
});
