import { useEffect, useRef } from "react";

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Colore principale dello sfondo
  const backgroundColor = "#1E3853";
  const backgroundColorTransparent = "rgba(100,100,100,0)"; // "rgba(15, 51, 206, 0)";

  // Genera una palette di colori
  const getRandomColor = () => {
    const colors = [
      "#D50000", // rosso
      "#FF8800", // arancio
      "#FFF4B0", // bianco
      "#0095D5", // blu
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const circles = Array.from({ length: 10 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 500 + 100,
      color: getRandomColor(),
      dx: (Math.random() - 0.5) * 3, // Velocità orizzontale
      dy: (Math.random() - 0.5) * 3, // Velocità verticale
      dr: (Math.random() - 0.5) * 2, // Velocità del raggio
    }));

    const drawGradient = (circle) => {
      const gradient = ctx.createRadialGradient(
        circle.x,
        circle.y,
        0,
        circle.x,
        circle.y,
        circle.radius,
      );
      gradient.addColorStop(0, circle.color);
      gradient.addColorStop(1, backgroundColorTransparent);
      ctx.fillStyle = gradient;

      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      circles.forEach((circle) => {
        // Muovi il cerchio
        circle.x += circle.dx;
        circle.y += circle.dy;
        circle.radius += circle.dr;

        // Rimbalza ai bordi
        if (
          circle.x - circle.radius < 0 ||
          circle.x + circle.radius > canvas.width
        ) {
          circle.dx *= -1;
        }
        if (
          circle.y - circle.radius < 0 ||
          circle.y + circle.radius > canvas.height
        ) {
          circle.dy *= -1;
        }
        if (circle.radius < 50 || circle.radius > 300) {
          circle.dr *= -1;
        }

        drawGradient(circle);
      });

      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <>
      {/* Sfondo fisso */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: backgroundColor,
          zIndex: -3, // Sfondo sotto il canvas
        }}
      />
      {/* Canvas animato */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -2,
        }}
      />
    </>
  );
};
