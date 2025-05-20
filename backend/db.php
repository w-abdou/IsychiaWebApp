<?php
$host = 'localhost';
$dbname = 'isychia';  // Replace with your DB name
$username = 'root';
$password = ''; // Default password is empty in XAMPP

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("❌ Connection failed: " . $conn->connect_error);
}

//echo "✅ Connected successfully to MySQL!";
?>