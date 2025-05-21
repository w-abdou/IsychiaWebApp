<?php
session_start();
require 'db.php';

header("Content-Type: application/json");

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "Not logged in"]);
    exit;
}

$user_id = $_SESSION['user_id'];
$contact_username = isset($_GET['contact']) ? $_GET['contact'] : null;

if (!$contact_username) {
    echo json_encode(["error" => "No contact specified"]);
    exit;
}

// Get the contact's user ID
$stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
$stmt->bind_param("s", $contact_username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["error" => "Contact not found"]);
    exit;
}

$contact_id = $result->fetch_assoc()['id'];

// Get messages between current user and contact
$stmt = $conn->prepare("
    SELECT m.id, m.sender_id, m.receiver_id, m.message_text, m.timestamp, 
           u_sender.username as sender_username, u_receiver.username as receiver_username
    FROM messages m
    JOIN users u_sender ON m.sender_id = u_sender.id
    JOIN users u_receiver ON m.receiver_id = u_receiver.id
    WHERE (m.sender_id = ? AND m.receiver_id = ?) 
       OR (m.sender_id = ? AND m.receiver_id = ?)
    ORDER BY m.timestamp ASC
");

$stmt->bind_param("iiii", $user_id, $contact_id, $contact_id, $user_id);
$stmt->execute();
$result = $stmt->get_result();

$messages = array();
while ($row = $result->fetch_assoc()) {
    // Format messages for the client
    $type = ($row['sender_id'] == $user_id) ? 'sent' : 'received';
    
    // Format timestamp for display
    $timestamp = date('g:i A', strtotime($row['timestamp']));
    
    $messages[] = [
        'id' => $row['id'],
        'text' => $row['message_text'],
        'type' => $type,
        'timestamp' => $timestamp,
        'sender' => $row['sender_username'],
        'receiver' => $row['receiver_username']
    ];
}

echo json_encode($messages);
$conn->close();
?>