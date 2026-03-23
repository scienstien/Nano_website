import { useEffect, useRef } from 'react';

export default function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    
    // Mouse Interaction State
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    
    window.addEventListener('resize', resize);
    resize();

    const drawDrone = (w: number, h: number, waveImpact: number) => {
      const droneW = Math.min(350, w * 0.35);
      const droneH = droneW * 0.35;
      const cx = w * 0.65; // Drone locked deeply in the interaction zone
      const cy = h / 2;

      ctx.save();
      ctx.translate(cx, cy);

      // Clean, minimal delta-wing drone silhouette
      ctx.beginPath();
      ctx.moveTo(-droneW/2, 0); // Nose facing left, intercepting waves
      ctx.lineTo(0, -droneH/2); // Top Wing tip
      ctx.lineTo(droneW/2, -droneH/4); // Top trailing edge
      ctx.lineTo(droneW/4, 0); // Tail center
      ctx.lineTo(droneW/2, droneH/4); // Bottom trailing edge
      ctx.lineTo(0, droneH/2); // Bottom wing tip
      ctx.closePath();

      ctx.fillStyle = '#020204'; // Ultra dark matte body
      ctx.fill();

      // Systemic wave interaction glow at the leading edges
      const glowIntensity = Math.abs(waveImpact);
      
      const gradient = ctx.createLinearGradient(-droneW/2, 0, droneW/2, 0);
      gradient.addColorStop(0, `rgba(0, 240, 255, ${0.1 + glowIntensity * 0.6})`); 
      gradient.addColorStop(0.3, `rgba(0, 240, 255, ${0.05 + glowIntensity * 0.2})`);
      gradient.addColorStop(1, `rgba(138, 43, 226, 0.0)`);
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.0;
      
      ctx.shadowBlur = Math.max(0, glowIntensity * 30);
      ctx.shadowColor = 'rgba(0, 240, 255, 0.4)';
      
      ctx.stroke(); // Render the interactive glow frame
      
      // Technical trajectory lines trailing the drone
      ctx.beginPath();
      ctx.moveTo(droneW/4, 0);
      ctx.lineTo(droneW, 0);
      ctx.moveTo(droneW, 0);
      ctx.arc(droneW, 0, 3, 0, Math.PI * 2);
      ctx.strokeStyle = '#2a3a4a';
      ctx.lineWidth = 1;
      ctx.shadowBlur = 0; // Disable glow for pure analytical lines
      ctx.stroke();

      ctx.restore();
    };

    const draw = () => {
      time += 0.012; // Cinematic, deliberate motion speed
      
      // Smooth field interpolation targeting the mouse
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const w = window.innerWidth;
      const h = window.innerHeight;
      
      // Cinematic dark void with extremely subtle mouse tracking light
      const bgGrad = ctx.createRadialGradient(
        w * 0.5 - (mouseX - w/2) * 0.05, h * 0.5 - (mouseY - h/2) * 0.05, 0,
        w * 0.5, h * 0.5, w * 0.8
      );
      bgGrad.addColorStop(0, '#060a12');
      bgGrad.addColorStop(1, '#020205');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);
      
      const numLines = 18;
      const spacing = 40;
      const startY = (h / 2) - ((numLines * spacing) / 2);

      const impactZoneStart = 0.40; // Waves enter field here
      const dronePos = 0.65;
      const totalAbsorbZone = 0.85;
      
      // Sync drone glow with wave peaks hitting its exact nose position
      const noseNX = dronePos - 0.15; // approximate normalized x position of the drone nose
      const waveImpactAtNose = Math.sin(noseNX * 15.0 - time * 4.0);

      for (let i = 0; i < numLines; i++) {
        ctx.beginPath();
        const baseYOffset = startY + (i * spacing);
        ctx.moveTo(0, baseYOffset);
        
        for (let x = 0; x <= w; x += 10) {
          const nx = x / w;
          
          let yOffset = baseYOffset;

          // Mouse depth interaction: Bending the underlying structural field grid
          const fieldShiftX = (mouseX - w/2) * 0.02;
          const fieldShiftY = (mouseY - h/2) * 0.02 * (i - numLines/2) * 0.1;
          yOffset += fieldShiftY;

          // Physics Rule: Waves compress as they enter the interaction medium
          let phaseX = nx * 15.0;
          if (nx > impactZoneStart) {
             // Wavelength shortens mathematically = physical slowing down
             phaseX = (impactZoneStart * 15.0) + (nx - impactZoneStart) * 25.0;
          }
          
          const phase = phaseX - time * 4.0 + (i * 0.35);
          const baseWave = Math.sin(phase);
          
          let attenuation = 1.0;
          let distortion = 0.0;
          
          if (nx > impactZoneStart) {
            const penetration = (nx - impactZoneStart) / (totalAbsorbZone - impactZoneStart);
            attenuation = Math.max(0, 1.0 - Math.pow(penetration, 1.2)); // Absorptive decay
            distortion = Math.sin(nx * 100 - time * 10 + i) * (1.0 - attenuation) * 6.0; 
          }
          
          let y = yOffset + (baseWave * 36.0 * attenuation) + distortion;
          
          // Field repulsion mimicking real-world electromagnetic boundary interference
          const dx = (x + fieldShiftX) - mouseX;
          const dy = y - mouseY;
          const dist = Math.sqrt(dx*dx + dy*dy);
          const repulsionRadius = 250;
          
          if (dist < repulsionRadius) {
            const force = Math.pow(1.0 - dist / repulsionRadius, 2.0);
            y += (dy / dist) * force * 45.0 * attenuation; 
          }
          
          ctx.lineTo(x + fieldShiftX, y);
        }
        
        // Scientific precision plotting stroke
        const gradient = ctx.createLinearGradient(0, 0, w * totalAbsorbZone, 0);
        gradient.addColorStop(0, `rgba(0, 240, 255, ${0.05 + (i % 3) * 0.04})`);
        gradient.addColorStop(impactZoneStart, `rgba(0, 240, 255, 0.4)`);
        gradient.addColorStop(dronePos, `rgba(0, 240, 255, 0.1)`);
        gradient.addColorStop(1, `rgba(0, 240, 255, 0.0)`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 0.8;
        ctx.lineJoin = 'round';
        ctx.stroke();
      }

      drawDrone(w, h, waveImpactAtNose);

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0, 
      }}
    />
  );
}
