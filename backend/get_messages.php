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

// Get messages between current user and contact - note column names match the DB schema
$stmt = $conn->prepare("
    SELECT m.id, m.senderID, m.receiverID, m.message_text, m.sent_at as timestamp, 
           u_sender.username as sender_username, u_receiver.username as receiver_username
    FROM messages m
    JOIN users u_sender ON m.senderID = u_sender.id
    JOIN users u_receiver ON m.receiverID = u_receiver.id
    WHERE (m.senderID = ? AND m.receiverID = ?) 
       OR (m.senderID = ? AND m.receiverID = ?)
    ORDER BY m.sent_at ASC
");

$stmt->bind_param("iiii", $user_id, $contact_id, $contact_id, $user_id);
$stmt->execute();
$result = $stmt->get_result();

$messages = array();
while ($row = $result->fetch_assoc()) {
    // Format messages for the client
    $type = ($row['senderID'] == $user_id) ? 'sent' : 'received';
    
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