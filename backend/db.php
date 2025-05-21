<?php

$conn = new mysqli("localhost", "root", "", "isychia");


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>