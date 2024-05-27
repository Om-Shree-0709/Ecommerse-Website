<?php
session_start();

// Database connection parameters
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "mydatabase";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Register new user
if (isset($_POST['register'])) {
    $user = $_POST['username'];
    $pass = $_POST['password'];

    // Hash password
    $hashed_password = password_hash($pass, PASSWORD_DEFAULT);

    // Insert user into database
    $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $user, $hashed_password);

    if ($stmt->execute()) {
        // Registration successful
        header("Location: login.html"); // Redirect to login page
        exit();
    } else {
        // Registration failed
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

// Authenticate user login
if (isset($_POST['login'])) {
    $user = $_POST['username'];
    $pass = $_POST['password'];

    // Retrieve hashed password from database
    $stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
    $stmt->bind_param("s", $user);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        $hashed_password = $row['password'];

        // Verify password
        if (password_verify($pass, $hashed_password)) {
            // Login successful
            $_SESSION['username'] = $user;
            header("Location: index.html"); // Redirect to dashboard
            exit();
        } else {
            // Invalid password
            echo "Invalid password";
        }
    } else {
        // User not found
        echo "User not found";
    }

    $stmt->close();
}

$conn->close();
?>
