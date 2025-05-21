<?php
// Add this at the beginning of get_friends.php for debugging
error_log('Session user_id: ' . $_SESSION['user_id']);
session_start();
require 'db.php';

header("Content-Type: application/json");

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "Not logged in"]);
    exit;
}

$user_id = $_SESSION['user_id'];

// Get all users except the current user
$stmt = $conn->prepare("SELECT id, username FROM users WHERE id != ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$friends = array();
while ($row = $result->fetch_assoc()) {
    $friends[] = $row;
}

// Return directly as an array, not nested in another object
echo json_encode($friends);
$conn->close();
?>