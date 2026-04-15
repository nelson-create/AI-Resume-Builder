import { useEffect, useRef } from 'react';

/**
 * AnimatedParticles component
 * Creates floating particles with AI and resume-themed elements
 */
const AnimatedParticles = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particleCount = 40;
    const particles = [];

    // Create particle elements
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 4 + 2;
      const delay = Math.random() * 20;
      const duration = Math.random() * 15 + 20;

      particle.className = 'absolute rounded-full';
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.background = Math.random() > 0.5 
        ? 'rgba(59, 130, 246, 0.6)' // Blue
        : 'rgba(168, 85, 247, 0.6)'; // Purple
      particle.style.boxShadow = `0 0 ${size * 2}px rgba(59, 130, 246, 0.8)`;
      particle.style.animation = `float ${duration}s infinite ease-in-out`;
      particle.style.animationDelay = delay + 's';
      particle.style.filter = 'blur(0.5px)';

      container.appendChild(particle);
      particles.push(particle);
    }

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% {
          transform: translateY(0px) translateX(0px) scale(1);
          opacity: 0.3;
        }
        25% {
          opacity: 0.6;
        }
        50% {
          transform: translateY(-100px) translateX(50px) scale(1.2);
          opacity: 0.9;
        }
        75% {
          opacity: 0.6;
        }
      }

      @keyframes pulse-glow {
        0%, 100% {
          filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.5));
        }
        50% {
          filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.8));
        }
      }

      .ai-icon {
        animation: pulse-glow 2s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);

    return () => {
      particles.forEach(p => container.removeChild(p));
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-20 left-0 w-full h-[calc(100vh-80px)] pointer-events-none overflow-hidden"
    />
  );
};

export default AnimatedParticles;
