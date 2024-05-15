document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Perform any necessary validation or authentication here
        const username = loginForm.querySelector('input[type="text"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        // Example validation (you can replace this with actual authentication logic)
        if (username === "admin" && password === "password") {
            // Redirect to the next page
            window.location.href = "http://127.0.0.1:5500/frontend/app/index.html"; // Change to your desired URL
        } else {
            alert('Invalid username or password');
        }
    });
});
