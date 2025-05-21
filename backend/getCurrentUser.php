<?php
session_start();

header('Content-Type: application/json');

error_log(print_r($_SESSION, true));

if (isset($_SESSION['user_id'])) {
    echo json_encode([
        'success' => true,
        'username' => $_SESSION['username'] ?? 'Unknown User',
        'user_id' => $_SESSION['user_id']
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Not logged in'
    ]);
}
?>