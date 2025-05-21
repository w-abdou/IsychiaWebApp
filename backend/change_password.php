<?php
session_start();
require 'db.php';

$currentPassword = $_POST['currentPassword'];
$newPassword = password_hash($_POST['newPassword'], PASSWORD_BCRYPT);
$userId = $_SESSION['user_id'];

$result = $conn->query("SELECT password FROM users WHERE id = $userId");
$row = $result->fetch_assoc();

if (password_verify($currentPassword, $row['password'])) {
    $stmt = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");
    $stmt->bind_param("si", $newPassword, $userId);
    $stmt->execute();
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Incorrect current password"]);
}
?>
