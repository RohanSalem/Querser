const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const cursor = { x: 0, y: 0, clicks: 0, color: 'red' };

window.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
    draw();
});

window.addEventListener('click', () => {
    cursor.clicks++;
    const hue = (cursor.clicks * 30) % 360;
    cursor.color = `hsl(${hue}, 100%, 50%)`;
    draw();
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = cursor.color;
    ctx.beginPath();
    ctx.arc(cursor.x, cursor.y, 10, 0, Math.PI * 2);
    ctx.fill();
}
