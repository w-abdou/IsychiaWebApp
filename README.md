
# IsychiaWebApp

IsychiaWebApp is a web-based application designed to facilitate user authentication and real-time communication. Built using HTML, CSS, JavaScript, and PHP, it offers a foundational platform for developing interactive web applications.

## Features

* User Registration and Login
* Real-time Chat Interface
* Account Settings Management
* Modular Backend Architecture
* Structured Database Integration

## Project Structure

```
IsychiaWebApp/
├── .vscode/               # Visual Studio Code configurations
├── backend/               # Server-side PHP scripts
├── database/              # Database schema and related files
├── script/                # Client-side JavaScript files
├── styles/                # CSS stylesheets
├── accountsettings.html   # Account settings page
├── chat.html              # Chat interface
├── login.html             # User login page
├── register.html          # User registration page
└── .DS_Store              # macOS system file (can be ignored)
```

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/w-abdou/IsychiaWebApp.git
   ```

2. **Set Up the Environment:**

   * Ensure you have a local server environment (e.g., XAMPP, WAMP) with PHP and MySQL installed.
   * Place the project folder in the server's root directory (e.g., `htdocs` for XAMPP).

3. **Configure the Database:**

   * Import the database schema from the `database/` directory into your MySQL server.
   * Update database connection settings in the backend PHP scripts as needed.

4. **Run the Application:**

   * Start your local server.
   * Navigate to `http://localhost/IsychiaWebApp/login.html` in your web browser.
