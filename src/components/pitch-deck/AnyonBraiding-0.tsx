// components/AnyonBraiding-0.tsx

'use client';

import React, { useEffect, useRef } from 'react';

const AnyonBraiding: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const hexRadius = 20;
    const hexHeight = hexRadius * Math.sqrt(3);
    const cols = Math.ceil(canvas.width / (hexRadius * 3)) + 1;
    const rows = Math.ceil(canvas.height / hexHeight) + 1;

    const drawHexagon = (x: number, y: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const hx = x + hexRadius * Math.cos(angle);
        const hy = y + hexRadius * Math.sin(angle);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.stroke();
    };

    const drawHexGrid = () => {
      ctx.strokeStyle = 'rgba(100, 100, 100, 0.3)';
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * hexRadius * 3 + ((row % 2) * hexRadius * 3) / 2;
          const y = row * hexHeight;
          drawHexagon(x, y);
        }
      }
    };

    interface Anyon {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
    }

    const anyons: Anyon[] = [];
    const numAnyons = 5;

    for (let i = 0; i < numAnyons; i++) {
      anyons.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        color: i % 2 === 0 ? '#4B0082' : '#00CED1',
      });
    }

    const drawAnyons = () => {
      anyons.forEach((anyon) => {
        ctx.beginPath();
        ctx.arc(anyon.x, anyon.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = anyon.color;
        ctx.fill();
      });
    };

    const braidAnyons = () => {
      anyons.forEach((anyon) => {
        anyon.x += anyon.vx;
        anyon.y += anyon.vy;

        if (anyon.x < 0 || anyon.x > canvas.width) anyon.vx *= -1;
        if (anyon.y < 0 || anyon.y > canvas.height) anyon.vy *= -1;

        anyons.forEach((other) => {
          if (anyon !== other) {
            const dx = other.x - anyon.x;
            const dy = other.y - anyon.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(anyon.x, anyon.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
              ctx.stroke();
            }
          }
        });
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawHexGrid();
      drawAnyons();
      braidAnyons();
      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

export default AnyonBraiding;