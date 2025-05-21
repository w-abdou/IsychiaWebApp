<?php
session_start();
header('Content-Type: application/json');


if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Not logged in']);
    exit;
}


$username = $_POST['username'] ?? '';
$email = $_POST['email'] ?? '';


if (empty($username) || empty($email)) {
    echo json_encode(['success' => false, 'message' => 'Username and email are required']);
    exit;
}

require 'db.php'; 
$userId = $_SESSION['user_id'];


$stmt = $conn->prepare("UPDATE users SET username = ?, email = ? WHERE id = ?");
$stmt->bind_param("ssi", $username, $email, $userId);

if ($stmt->execute()) {

    $_SESSION['username'] = $username;
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Update failed: ' . $conn->error]);
}

$stmt->close();
$conn->close();
?>