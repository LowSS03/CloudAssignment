// about-script.js
window.onload = function () {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');

  let squares = [];
  const colors = ['#00ffe1', '#ff00c8', '#ffeb3b', '#4caf50', '#2196f3'];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function createSquares() {
    squares = [];
    for (let i = 0; i < 80; i++) {
      squares.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 20 + 10,
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: (Math.random() - 0.5) * 1.5,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  function drawSquares() {
    ctx.fillStyle = 'rgba(13, 27, 42, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let s of squares) {
      ctx.save();
      ctx.translate(s.x + s.size / 2, s.y + s.size / 2);
      ctx.rotate(s.angle);
      ctx.fillStyle = s.color;
      ctx.fillRect(-s.size / 2, -s.size / 2, s.size, s.size);
      ctx.restore();

      s.x += s.speedX;
      s.y += s.speedY;
      s.angle += s.rotationSpeed;

      // Re-spawn logic
      if (s.x < -50 || s.x > canvas.width + 50 || s.y < -50 || s.y > canvas.height + 50) {
        s.x = Math.random() * canvas.width;
        s.y = Math.random() * canvas.height;
      }
    }

    requestAnimationFrame(drawSquares);
  }

  createSquares();
  drawSquares();
};
