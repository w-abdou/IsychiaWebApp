<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['user_id'])) {
    
    require 'db.php';
    

    $userId = $_SESSION['user_id'];
    $stmt = $conn->prepare("SELECT username, email FROM users WHERE id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($row = $result->fetch_assoc()) {
        echo json_encode([
            'success' => true,
            'username' => $row['username'],
            'email' => $row['email']
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'User not found'
        ]);
    }
    
    $stmt->close();
    $conn->close();
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Not logged in'
    ]);
}
?>
