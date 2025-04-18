// login.js
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const player1 = document.getElementById('player1').value;
    const player2 = document.getElementById('player2').value;

    if (player1 && player2) {
        localStorage.setItem('player1', player1);
        localStorage.setItem('player2', player2);
        window.location.href = 'game.html'; // Redirect to the game page
    } else {
        alert('Please enter both player names.');
    }
});
