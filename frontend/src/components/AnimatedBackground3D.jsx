import { useEffect, useRef } from 'react';

/**
 * AnimatedBackground3D component
 * Creates an animated 3D scene with floating elements related to resume and AI
 * Features:
 * - Floating document/resume icons
 * - AI neural network nodes
 * - Connecting lines showing data flow
 * - Particle system for depth and atmosphere
 * - Central glow effect with AI theme colors
 */
const AnimatedBackground3D = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight - 80;

    let animationFrameId;
    let particles = [];
    let time = 0;

    // Particle class for floating elements
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.type = Math.floor(Math.random() * 3); // 0: dot, 1: line, 2: triangle
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.99;
        this.vy *= 0.99;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw(ctx) {
        ctx.fillStyle = `rgba(96, 165, 250, ${this.opacity})`;
        ctx.strokeStyle = `rgba(59, 130, 246, ${this.opacity * 0.8})`;

        if (this.type === 0) {
          // Dot
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (this.type === 1) {
          // Line
          ctx.lineWidth = this.size * 0.5;
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x + this.size * 3, this.y + this.size * 3);
          ctx.stroke();
        } else {
          // Triangle
          ctx.beginPath();
          ctx.moveTo(this.x, this.y - this.size);
          ctx.lineTo(this.x - this.size, this.y + this.size);
          ctx.lineTo(this.x + this.size, this.y + this.size);
          ctx.closePath();
          ctx.stroke();
        }
      }
    }

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle());
    }

    // Draw document/resume icon at various positions
    const drawDocument = (x, y, scale, opacity) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = `rgba(96, 165, 250, ${opacity * 0.5})`;
      ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
      ctx.lineWidth = 1.5;

      // Document outline
      ctx.fillRect(x, y, 20 * scale, 30 * scale);
      ctx.strokeRect(x, y, 20 * scale, 30 * scale);

      // Lines inside document (resume content)
      ctx.strokeStyle = `rgba(96, 165, 250, ${opacity * 0.7})`;
      ctx.lineWidth = 1;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(x + 3 * scale, y + (5 + i * 8) * scale);
        ctx.lineTo(x + 17 * scale, y + (5 + i * 8) * scale);
        ctx.stroke();
      }

      // Resume marker icon
      ctx.fillStyle = `rgba(168, 85, 247, ${opacity * 0.6})`;
      ctx.beginPath();
      ctx.arc(x + 2 * scale, y + 2 * scale, 1.5 * scale, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // Draw AI/neural network icon with more complexity
    const drawAINode = (x, y, scale, opacity) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = `rgba(168, 85, 247, ${opacity * 0.5})`;
      ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
      ctx.lineWidth = 1.5;

      // Central node (larger and brighter)
      const centerSize = 5 * scale;
      ctx.beginPath();
      ctx.arc(x, y, centerSize, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Glow around center
      const glowGradient = ctx.createRadialGradient(x, y, centerSize, x, y, centerSize * 3);
      glowGradient.addColorStop(0, `rgba(168, 85, 247, ${opacity * 0.3})`);
      glowGradient.addColorStop(1, `rgba(168, 85, 247, 0)`);
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(x, y, centerSize * 3, 0, Math.PI * 2);
      ctx.fill();

      // Connected nodes (outer layer)
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 15 * scale;
        const nx = x + Math.cos(angle) * radius;
        const ny = y + Math.sin(angle) * radius;

        // Connection line with gradient
        const lineGradient = ctx.createLinearGradient(x, y, nx, ny);
        lineGradient.addColorStop(0, `rgba(168, 85, 247, ${opacity * 0.8})`);
        lineGradient.addColorStop(1, `rgba(59, 130, 246, ${opacity * 0.4})`);
        ctx.strokeStyle = lineGradient;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        // Outer node
        ctx.fillStyle = `rgba(59, 130, 246, ${opacity * 0.6})`;
        ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(nx, ny, 2.5 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
      ctx.restore();
    };

    // Draw connecting lines between elements
    const drawConnector = (x1, y1, x2, y2, opacity) => {
      ctx.save();
      ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.4})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // Animated dot along the line
      const t = (time * 0.02) % 1;
      const dotX = x1 + (x2 - x1) * t;
      const dotY = y1 + (y2 - y1) * t;
      ctx.setLineDash([]);
      ctx.fillStyle = `rgba(99, 102, 241, ${opacity * 0.8})`;
      ctx.beginPath();
      ctx.arc(dotX, dotY, 1.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // Draw text label
    const drawLabel = (x, y, text, opacity) => {
      ctx.save();
      ctx.globalAlpha = opacity * 0.7;
      ctx.fillStyle = `rgba(203, 213, 225, ${opacity})`;
      ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(text, x, y);
      ctx.restore();
    };

    const animate = () => {
      // Clear canvas with slight fade
      ctx.fillStyle = 'rgba(15, 20, 25, 0.1)';
      ctx.fillRect(0, 0, width, height);

      time += 0.5;

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, 'rgba(15, 20, 25, 0)');
      gradient.addColorStop(0.5, 'rgba(29, 78, 137, 0.08)');
      gradient.addColorStop(1, 'rgba(15, 20, 25, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });

      // Draw floating document icons (resume)
      for (let i = 0; i < 3; i++) {
        const x = (width * (i + 1)) / 4 + Math.sin(time * 0.01 + i) * 50;
        const y = (height * 0.3) + Math.cos(time * 0.015 + i) * 100;
        const opacity = 0.3 + Math.sin(time * 0.02 + i) * 0.2;
        drawDocument(x, y, 1, opacity);
      }

      // Draw floating AI nodes (neural network)
      for (let i = 0; i < 2; i++) {
        const x = (width * (i + 0.5)) / 2 + Math.sin(time * 0.008 + i * 5) * 60;
        const y = (height * 0.7) + Math.cos(time * 0.012 + i * 5) * 80;
        const opacity = 0.3 + Math.sin(time * 0.025 + i * 5) * 0.2;
        drawAINode(x, y, 1, opacity);
        
        // Add labels
        drawLabel(x, y - 50, i === 0 ? 'AI Processing' : 'Smart Analysis', opacity);
      }

      // Draw connecting lines between documents and AI
      for (let i = 0; i < 2; i++) {
        const x1 = (width * (i + 1)) / 4 + Math.sin(time * 0.01 + i) * 50;
        const y1 = (height * 0.3) + Math.cos(time * 0.015 + i) * 100;
        const x2 = (width * (i + 0.5)) / 2 + Math.sin(time * 0.008 + i * 5) * 60;
        const y2 = (height * 0.7) + Math.cos(time * 0.012 + i * 5) * 80;
        const opacity = 0.2 + Math.sin(time * 0.02 + i) * 0.15;
        drawConnector(x1, y1, x2, y2, opacity);
      }

      // Draw central glow effect (represents AI core)
      const centerX = width / 2;
      const centerY = height / 2;
      const glowSize = 200 + Math.sin(time * 0.01) * 50;
      const glowGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowSize);
      glowGradient.addColorStop(0, 'rgba(59, 130, 246, 0.15)');
      glowGradient.addColorStop(0.3, 'rgba(99, 102, 241, 0.08)');
      glowGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
      ctx.fillStyle = glowGradient;
      ctx.fillRect(centerX - glowSize, centerY - glowSize, glowSize * 2, glowSize * 2);

      // Draw grid lines (modern tech aesthetic)
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.05)';
      ctx.lineWidth = 0.5;
      const gridSize = 100;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - 80;
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-20 left-0 w-full pointer-events-none"
      style={{ height: 'calc(100vh - 80px)' }}
    />
  );
};

export default AnimatedBackground3D;
