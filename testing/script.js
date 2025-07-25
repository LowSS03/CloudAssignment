    const canvas = document.getElementById("orbCanvas");
    const ctx = canvas.getContext("2d");

    let w, h;
    function resizeCanvas() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const center = { x: w / 2, y: h / 2 };
    const orbRadius = 160;

    const innerParticles = [];
    const outerParticles = [];
    const maxOuterRadius = orbRadius + 80;
    const colors = ["#ff00c8", "#00ffe1", "#aaff00", "#ff6600"];

    for (let i = 0; i < 400; i++) {
      innerParticles.push({
        x: center.x + (Math.random() - 0.5) * orbRadius * 1.5,
        y: center.y + (Math.random() - 0.5) * orbRadius * 1.5,
        size: Math.random() * 2 + 0.3,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    for (let i = 0; i < 200; i++) {
      let angle = Math.random() * 2 * Math.PI;
      let radius = orbRadius + Math.random() * 10;
      outerParticles.push({
        angle: angle,
        radius: radius,
        originalRadius: radius,
        size: Math.random() * 2 + 0.5,
        speed: 0.2 + Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    function drawOrbCore() {
      const gradient = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, orbRadius);
      gradient.addColorStop(0, "#ff00c880");
      gradient.addColorStop(1, "#222222");

      ctx.beginPath();
      ctx.arc(center.x, center.y, orbRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    function drawInnerParticles() {
      for (let p of innerParticles) {
        p.x += p.dx;
        p.y += p.dy;
        const dist = Math.hypot(p.x - center.x, p.y - center.y);
        if (dist > orbRadius - 5) {
          p.dx *= -1;
          p.dy *= -1;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
    }

    function drawOuterParticles() {
      for (let p of outerParticles) {
        p.radius += p.speed;
        if (p.radius > maxOuterRadius) {
          p.radius = orbRadius + Math.random() * 10; // Reset
        }
        const x = center.x + Math.cos(p.angle) * p.radius;
        const y = center.y + Math.sin(p.angle) * p.radius;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
    }

    function animate() {
      ctx.clearRect(0, 0, w, h);
      drawOrbCore();
      drawOuterParticles();
      drawInnerParticles();
      requestAnimationFrame(animate);
    }

    animate();

    canvas.addEventListener("click", function (e) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const distance = Math.hypot(mouseX - center.x, mouseY - center.y);
      if (distance <= orbRadius) {
        window.location.href = "query.php";
      }
    });