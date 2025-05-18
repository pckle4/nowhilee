
import { useEffect, useRef } from 'react';

interface Dot {
  x: number;
  y: number;
  z: number;
  size: number;
  alpha: number;
  connections: number[];
}

const TechGlobe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.4;
    
    // Clear existing dots
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    
    // Generate dots
    const dots: Dot[] = [];
    const dotCount = 150;
    
    for (let i = 0; i < dotCount; i++) {
      // Generate a point on a sphere
      const phi = Math.random() * 2 * Math.PI;
      const theta = Math.acos(2 * Math.random() - 1);
      const x = centerX + radius * Math.sin(theta) * Math.cos(phi);
      const y = centerY + radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);
      
      const size = Math.random() * 2 + 1;
      const alpha = Math.random() * 0.5 + 0.5;
      
      dots.push({
        x, y, z, size, alpha,
        connections: []
      });
      
      const dot = document.createElement('div');
      dot.className = 'techglobe-dot';
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      dot.style.opacity = alpha.toString();
      container.appendChild(dot);
    }
    
    // Find connections
    for (let i = 0; i < dots.length; i++) {
      const dot1 = dots[i];
      for (let j = i + 1; j < dots.length; j++) {
        const dot2 = dots[j];
        const distance = Math.sqrt(
          Math.pow(dot1.x - dot2.x, 2) + 
          Math.pow(dot1.y - dot2.y, 2) +
          Math.pow(dot1.z - dot2.z, 2)
        );
        
        if (distance < radius * 0.4) {
          dot1.connections.push(j);
          
          const line = document.createElement('div');
          line.className = 'techglobe-line';
          const angle = Math.atan2(dot2.y - dot1.y, dot2.x - dot1.x);
          const length = Math.sqrt(Math.pow(dot2.x - dot1.x, 2) + Math.pow(dot2.y - dot1.y, 2));
          
          line.style.width = `${length}px`;
          line.style.left = `${dot1.x}px`;
          line.style.top = `${dot1.y}px`;
          line.style.transform = `rotate(${angle}rad)`;
          line.style.opacity = (0.5 * (1 - distance / (radius * 0.4))).toString();
          
          container.appendChild(line);
        }
      }
    }
    
    dotsRef.current = dots;
    
    // Animation
    let angle = 0;
    const animate = () => {
      angle += 0.002;
      const cosAngle = Math.cos(angle);
      const sinAngle = Math.sin(angle);
      
      const dotElements = Array.from(container.getElementsByClassName('techglobe-dot'));
      const lineElements = Array.from(container.getElementsByClassName('techglobe-line'));
      let lineIndex = 0;
      
      dots.forEach((dot, i) => {
        // Rotate around Y axis
        const newX = centerX + (dot.x - centerX) * cosAngle - (dot.z) * sinAngle;
        const newZ = (dot.x - centerX) * sinAngle + (dot.z) * cosAngle;
        
        dot.x = newX;
        dot.z = newZ;
        
        if (dotElements[i]) {
          dotElements[i].style.left = `${dot.x}px`;
          dotElements[i].style.top = `${dot.y}px`;
          dotElements[i].style.opacity = (dot.alpha * (newZ + radius) / (2 * radius)).toString();
          dotElements[i].style.zIndex = Math.floor(newZ).toString();
        }
        
        // Update lines
        dot.connections.forEach(j => {
          const dot2 = dots[j];
          if (lineElements[lineIndex]) {
            const angle = Math.atan2(dot2.y - dot.y, dot2.x - dot.x);
            const length = Math.sqrt(Math.pow(dot2.x - dot.x, 2) + Math.pow(dot2.y - dot.y, 2));
            
            lineElements[lineIndex].style.width = `${length}px`;
            lineElements[lineIndex].style.left = `${dot.x}px`;
            lineElements[lineIndex].style.top = `${dot.y}px`;
            lineElements[lineIndex].style.transform = `rotate(${angle}rad)`;
            lineElements[lineIndex].style.opacity = (0.3 * (1 - Math.abs(newZ) / radius) * (1 - Math.abs(dot2.z) / radius)).toString();
            lineIndex++;
          }
        });
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);
  
  return (
    <div className="techglobe-container">
      <div className="techglobe" ref={containerRef}></div>
    </div>
  );
};

export default TechGlobe;
