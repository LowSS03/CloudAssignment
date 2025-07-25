//     const canvas = document.getElementById("orbCanvas");
//     const ctx = canvas.getContext("2d");

//     let w, h;
// function resizeCanvas() {
//   const canvasSize = 360; // match CSS
//   w = canvas.width = canvasSize;
//   h = canvas.height = canvasSize;
//   center.x = w / 2;
//   center.y = h / 2;
// }

//     resizeCanvas();
//     window.addEventListener("resize", resizeCanvas);

//     const center = { x: w / 2, y: h / 2 };
//     const orbRadius = 220;

//     const innerParticles = [];
//     const outerParticles = [];
//     const maxOuterRadius = orbRadius + 80;
//     const colors = ["#ff00c8", "#00ffe1", "#aaff00", "#ff6600"];

//     for (let i = 0; i < 400; i++) {
//       innerParticles.push({
//         x: center.x + (Math.random() - 0.5) * orbRadius * 1.5,
//         y: center.y + (Math.random() - 0.5) * orbRadius * 1.5,
//         size: Math.random() * 2 + 0.3,
//         dx: (Math.random() - 0.5) * 0.5,
//         dy: (Math.random() - 0.5) * 0.5,
//         color: colors[Math.floor(Math.random() * colors.length)]
//       });
//     }

//     for (let i = 0; i < 200; i++) {
//       let angle = Math.random() * 2 * Math.PI;
//       let radius = orbRadius + Math.random() * 10;
//       outerParticles.push({
//         angle: angle,
//         radius: radius,
//         originalRadius: radius,
//         size: Math.random() * 2 + 0.5,
//         speed: 0.2 + Math.random() * 0.5,
//         color: colors[Math.floor(Math.random() * colors.length)]
//       });
//     }

//     function drawOrbCore() {
//       const gradient = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, orbRadius);
//       gradient.addColorStop(0, "#ff00c880");
//       gradient.addColorStop(1, "#222222");

//       ctx.beginPath();
//       ctx.arc(center.x, center.y, orbRadius, 0, Math.PI * 2);
//       ctx.fillStyle = gradient;
//       ctx.fill();
//     }

//     function drawInnerParticles() {
//       for (let p of innerParticles) {
//         p.x += p.dx;
//         p.y += p.dy;
//         const dist = Math.hypot(p.x - center.x, p.y - center.y);
//         if (dist > orbRadius - 5) {
//           p.dx *= -1;
//           p.dy *= -1;
//         }
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
//         ctx.fillStyle = p.color;
//         ctx.fill();
//       }
//     }

//     function drawOuterParticles() {
//       for (let p of outerParticles) {
//         p.radius += p.speed;
//         if (p.radius > maxOuterRadius) {
//           p.radius = orbRadius + Math.random() * 10; // Reset
//         }
//         const x = center.x + Math.cos(p.angle) * p.radius;
//         const y = center.y + Math.sin(p.angle) * p.radius;
//         ctx.beginPath();
//         ctx.arc(x, y, p.size, 0, Math.PI * 2);
//         ctx.fillStyle = p.color;
//         ctx.fill();
//       }
//     }

//     function animate() {
//       ctx.clearRect(0, 0, w, h);
//       drawOrbCore();
//       drawOuterParticles();
//       drawInnerParticles();
//       requestAnimationFrame(animate);
//     }

//     animate();

// canvas.addEventListener("click", function (e) {
//   const rect = canvas.getBoundingClientRect();
//   const mouseX = e.clientX - rect.left;
//   const mouseY = e.clientY - rect.top;
//   const distance = Math.hypot(mouseX - center.x, mouseY - center.y);

//   if (distance <= orbRadius) {
//     window.location.href = "query.php";
//   }
// });


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
