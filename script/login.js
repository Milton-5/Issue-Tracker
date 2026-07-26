document.getElementById("login-btn").addEventListener("click", function () {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin123") {
        alert("Login successful!");
        window.location.href = "index.html";
    } else {
        alert("Login failed! Please check your username and password.");
        
    }
});