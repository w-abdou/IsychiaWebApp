<?php
session_start();
require 'db.php';

$currentUser = $_SESSION['username'] ?? '';

$query = "SELECT username FROM users WHERE username != ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $currentUser);
$stmt->execute();
$result = $stmt->get_result();

$users = [];
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

echo json_encode($users);
?>
