import { useEffect, useRef } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';

interface ChartProps {
  id: string;
  title: string;
  description: string;
}

export default function Chart({ id, title, description }: ChartProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div ref={cardRef} className="feature-card rounded-xl p-8 transition-transform duration-300 hover:scale-105">
      <h3 className="mb-4 text-2xl font-bold text-white">{title}</h3>
      <p className="text-base-300 mb-6">{description}</p>
      <div className="relative h-[400px] w-full">
        <canvas id={id} className="w-full h-full rounded-lg bg-dark-bg/50 backdrop-blur-sm border border-[rgba(4,163,255,0.2)]"></canvas>
      </div>

      <style jsx>{`
        .feature-card {
          position: relative;
          border: 1px solid rgba(4, 163, 255, 0.3);
          background: rgba(2, 6, 23, 0.8);
          backdrop-filter: blur(8px);
          transition: all 0.5s;
          overflow: visible;
          box-shadow: 0 0 25px rgba(4, 163, 255, 0.4);
        }

        .feature-card:hover {
          box-shadow: 0 0 50px rgba(4, 163, 255, 0.6);
          transform: translateY(-4px) scale(1.02);
          border-color: rgba(4, 163, 255, 0.5);
          background: rgba(2, 6, 23, 0.9);
          animation: pulse-card 2s ease-in-out infinite;
        }

        @keyframes pulse-card {
          0%, 100% {
            box-shadow: 0 0 50px rgba(4, 163, 255, 0.6);
          }
          50% {
            box-shadow: 0 0 70px rgba(4, 163, 255, 0.8);
          }
        }

        .feature-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 1rem;
          background: radial-gradient(
            800px circle at var(--mouse-x, 0) var(--mouse-y, 0),
            rgba(4, 163, 255, 0.15),
            transparent 40%
          );
          opacity: 0;
          transition: opacity 0.5s;
        }

        .feature-card:hover::before {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
