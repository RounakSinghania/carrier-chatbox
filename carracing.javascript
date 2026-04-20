const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let car = { x: 180, y: 500, width: 40, height: 80, speed: 5 };
let roadLines = [];
let offset = 0;

// Generate initial road lines
for (let i = 0; i < 20; i++) {
  roadLines.push({ y: i * 40 });
}

// Handle key input
let keys = {};
document.addEventListener('keydown', (e) => keys[e.key] = true);
document.addEventListener('keyup', (e) => keys[e.key] = false);

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move the road lines (simulate infinite road)
  offset += 5;
  if (offset >= 40) {
    offset = 0;
    roadLines.push({ y: -40 });
    roadLines.shift();
  }

  // Draw road lines
  ctx.fillStyle = "#fff";
  roadLines.forEach(line => {
    ctx.fillRect(195, line.y + offset, 10, 30);
  });

  // Draw car
  ctx.fillStyle = "#0af";
  ctx.fillRect(car.x, car.y, car.width, car.height);

  // Car movement
  if (keys['ArrowLeft'] && car.x > 0) car.x -= car.speed;
  if (keys['ArrowRight'] && car.x < canvas.width - car.width) car.x += car.speed;

  requestAnimationFrame(gameLoop);
}

gameLoop();
