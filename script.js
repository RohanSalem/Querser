const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const socket = io('https://your-vercel-backend-url.vercel.app'); // Replace with your Vercel backend URL
let players = {};

// Track the current player's position and state
let myPlayer = { x: 0, y: 0, clicks: 0, color: 'red' };

// Initialize players
socket.on('initialize', (serverPlayers) => {
    players = serverPlayers;
});

// Add a new player
socket.on('playerJoined', ({ id, data }) => {
    players[id] = data;
});

// Remove a disconnected player
socket.on('playerLeft', (id) => {
    delete players[id];
});

// Update player position
socket.on('updatePosition', ({ id, x, y }) => {
    if (players[id]) {
        players[id].x = x;
        players[id].y = y;
    }
});

// Update player color
socket.on('updateColor', ({ id, color }) => {
    if (players[id]) {
        players[id].color = color;
    }
});

// Handle mouse movement
window.addEventListener('mousemove', (e) => {
    myPlayer.x = e.clientX;
    myPlayer.y = e.clientY;
    socket.emit('move', { x: myPlayer.x, y: myPlayer.y });
    draw();
});

// Handle clicks
window.addEventListener('click', () => {
    myPlayer.clicks++;
    socket.emit('click');
});

// Draw all players
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const id in players) {
        const player = players[id];
        ctx.fillStyle = player.color;
        ctx.beginPath();
        ctx.arc(player.x, player.y, 10, 0, Math.PI * 2);
        ctx.fill();
    }
}
