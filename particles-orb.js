const canvas = document.getElementById("orbParticles");
const ctx = canvas.getContext("2d");

let w, h, center;
function resizeCanvas() {
  w = canvas.width = 360;
  h = canvas.height = 360;
  center = { x: w / 2, y: h / 2 };
}
resizeCanvas();

// --- CONFIG ---
const orbRadius = 150;
const innerParticles = [];
const outerParticles = [];
const innerCount = 400;
const outerCount = 200;
const colors = ["#ff00c8", "#00ffe1", "#aaff00", "#ff6600"];

// --- UTILS ---
function random(min, max) {
  return Math.random() * (max - min) + min;
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

// --- INIT ---
for (let i = 0; i < innerCount; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = Math.random() * orbRadius;
  innerParticles.push({
    x: center.x + Math.cos(angle) * radius,
    y: center.y + Math.sin(angle) * radius,
    dx: random(-0.5, 0.5),
    dy: random(-0.5, 0.5),
    size: random(0.5, 1.5),
    color: colors[Math.floor(Math.random() * colors.length)]
  });
}

for (let i = 0; i < outerCount; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = orbRadius + random(10, 50);
  outerParticles.push({
    x: center.x + Math.cos(angle) * radius,
    y: center.y + Math.sin(angle) * radius,
    dx: Math.cos(angle) * random(0.1, 0.3),
    dy: Math.sin(angle) * random(0.1, 0.3),
    size: random(0.4, 1.2),
    color: colors[Math.floor(Math.random() * colors.length)]
  });
}

// --- ANIMATE ---
function animate() {
  ctx.clearRect(0, 0, w, h);

  // INNER particles
  for (let p of innerParticles) {
    p.x += p.dx;
    p.y += p.dy;

    // bounce inside orb
    if (distance(p.x, p.y, center.x, center.y) > orbRadius) {
      const angle = Math.atan2(p.y - center.y, p.x - center.x);
      p.dx = -Math.cos(angle) * Math.abs(p.dx);
      p.dy = -Math.sin(angle) * Math.abs(p.dy);
    }

    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  }

  // OUTER particles
  for (let p of outerParticles) {
    p.x += p.dx * 0.5;
    p.y += p.dy * 0.5;

    // fade away or reset
    if (distance(p.x, p.y, center.x, center.y) > orbRadius + 80) {
      const angle = Math.random() * Math.PI * 2;
      const radius = orbRadius + random(10, 50);
      p.x = center.x + Math.cos(angle) * radius;
      p.y = center.y + Math.sin(angle) * radius;
    }

    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(animate);
}
animate();
