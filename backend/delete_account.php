<?php
session_start();
require 'db.php';

$password = $_POST['deletePassword'];
$userId = $_SESSION['user_id'];

$result = $conn->query("SELECT password FROM users WHERE id = $userId");
$row = $result->fetch_assoc();

if (password_verify($password, $row['password'])) {
    $conn->query("DELETE FROM users WHERE id = $userId");
    session_destroy();
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Wrong password"]);
}
?>
