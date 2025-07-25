window.onload = function () {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let butterflies = [];
  const colors = ['#00ffe1', '#ff00c8', '#ff6600', '#aaff00', '#00ffff'];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function createButterflies() {
    butterflies = [];
    for (let i = 0; i < 20; i++) {
      butterflies.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 15 + Math.random() * 15,
        color: colors[Math.floor(Math.random() * colors.length)],
        dx: (Math.random() - 0.5) * 1.5,
        dy: (Math.random() - 0.5) * 1.5,
        angle: Math.random() * Math.PI * 2,
        flutter: 0,
      });
    }
  }

  function drawButterfly(b) {
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.rotate(b.angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-b.size, -b.size, -b.size, b.size, 0, 0);
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(b.size, -b.size, b.size, b.size, 0, 0);
    ctx.fillStyle = b.color;
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    butterflies.forEach(b => {
      b.x += b.dx;
      b.y += b.dy;
      b.angle += 0.02;
      b.flutter += 0.05;
      b.dx += Math.sin(b.flutter) * 0.05;
      drawButterfly(b);

      // Bounce off walls
      if (b.x < 0 || b.x > canvas.width) b.dx *= -1;
      if (b.y < 0 || b.y > canvas.height) b.dy *= -1;
    });

    requestAnimationFrame(animate);
  }

  createButterflies();
  animate();
};
