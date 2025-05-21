import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from 'gsap';

const TechGlobe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg');
    earthTexture.colorSpace = THREE.SRGBColorSpace; // Important for correct color display

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Geometry and Material
    const geometry = new THREE.SphereGeometry(2, 64, 64); // Increased segments for better texture mapping
    const material = new THREE.MeshStandardMaterial({
      map: earthTexture,
      transparent: true,
      opacity: 0, // For GSAP entry animation
      roughness: 0.7,
      metalness: 0.3,
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.scale.set(0, 0, 0); // Start with scale 0
    scene.add(sphere);

    // Dot Cloud
    const dotCount = 150;
    const vertices = new Float32Array(dotCount * 3);
    const dotRadius = 2; // Same as sphere radius

    for (let i = 0; i < dotCount; i++) {
      const phi = Math.random() * 2 * Math.PI;
      const theta = Math.acos(2 * Math.random() - 1);
      const x = dotRadius * Math.sin(theta) * Math.cos(phi);
      const y = dotRadius * Math.sin(theta) * Math.sin(phi);
      const z = dotRadius * Math.cos(theta);
      vertices[i * 3] = x;
      vertices[i * 3 + 1] = y;
      vertices[i * 3 + 2] = z;
    }

    const dotGeometry = new THREE.BufferGeometry();
    dotGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    const dotMaterial = new THREE.PointsMaterial({
      color: 0x00bcd4, // Light blue
      size: 0.05,
      transparent: true,
      opacity: 0, // Start with opacity 0
      sizeAttenuation: true,
    });

    const dotCloud = new THREE.Points(dotGeometry, dotMaterial);
    dotCloud.scale.set(0, 0, 0); // Start with scale 0
    scene.add(dotCloud);

    // GSAP Animation
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } }); // Set default ease

    // Globe and Dots Entry (slightly faster and more impactful)
    tl.to(sphere.scale, { x: 1, y: 1, z: 1, duration: 1.2 })
      .to(material, { opacity: 1, duration: 1.2 }, "<") // Animate material opacity simultaneously
      .to(dotCloud.scale, { x: 1, y: 1, z: 1, duration: 1.2 }, "-=1.0") // Stagger dot cloud, slightly faster
      .to(dotCloud.material.opacity, { value: 0.8, duration: 1.2 }, "<"); // Animate opacity simultaneously

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Slightly increased ambient light
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1.5, 100); // Increased intensity
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.5, 100); // Added another point light from other side
    pointLight2.position.set(-5, -3, -3);
    scene.add(pointLight2);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8; // Slower auto-rotation
    controls.enableDamping = true;
    controls.dampingFactor = 0.05; // Standard damping factor

    // Tech Icons
    const iconSpritesRef = useRef<THREE.Sprite[]>([]);
    const iconTextures: THREE.Texture[] = [];

    // Create placeholder textures (colored squares)
    const createPlaceholderTexture = (color: string): THREE.CanvasTexture => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const context = canvas.getContext('2d')!;
      context.fillStyle = color;
      context.fillRect(0, 0, 64, 64);
      context.fillStyle = 'white';
      context.font = 'bold 24px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText('Icon', 32, 32); // Simple text
      return new THREE.CanvasTexture(canvas);
    };

    iconTextures.push(createPlaceholderTexture('red'));
    iconTextures.push(createPlaceholderTexture('green'));
    iconTextures.push(createPlaceholderTexture('blue'));

    const iconPositions = [
      { radius: 2.1, phi: Math.PI * 0.25, theta: Math.PI * 0.25 }, // Example positions
      { radius: 2.1, phi: Math.PI * 0.75, theta: Math.PI * 0.5 },
      { radius: 2.1, phi: Math.PI * 1.25, theta: Math.PI * 0.75 },
    ];

    iconPositions.forEach((pos, index) => {
      const spriteMaterial = new THREE.SpriteMaterial({
        map: iconTextures[index % iconTextures.length],
        transparent: true,
        opacity: 0, // Start transparent for GSAP animation
      });
      const sprite = new THREE.Sprite(spriteMaterial);

      const x = pos.radius * Math.sin(pos.theta) * Math.cos(pos.phi);
      const y = pos.radius * Math.sin(pos.theta) * Math.sin(pos.phi);
      const z = pos.radius * Math.cos(pos.phi); // Correction: should be Math.cos(pos.theta)
      // Corrected position calculation:
      // const z = pos.radius * Math.cos(pos.theta);
      // For consistency with existing dot cloud generation:
      const cartesianX = pos.radius * Math.sin(pos.theta) * Math.cos(pos.phi);
      const cartesianY = pos.radius * Math.sin(pos.theta) * Math.sin(pos.phi);
      const cartesianZ = pos.radius * Math.cos(pos.theta);


      sprite.position.set(cartesianX, cartesianY, cartesianZ);
      sprite.scale.set(0, 0, 0); // Start with scale 0 for GSAP animation
      scene.add(sprite);
      iconSpritesRef.current.push(sprite);

      // GSAP entry animation for icons (staggered, starts after main globe is mostly visible)
      // Adjusted stagger: "-=0.9" makes it start a bit earlier relative to dotCloud animation if dotCloud is 1.2s and starts at "-=1.0" from sphere.
      // Let's tie it to the end of the sphere animation or slightly after.
      // Sphere duration 1.2s. Dot cloud starts at T=0.2s (1.2 - 1.0). Dot cloud duration 1.2s. Ends at T=1.4s
      // Icons should start appearing around T=0.8s to T=1.0s
      const iconDelay = 0.8 + index * 0.15; // Stagger icons themselves
      tl.to(sprite.scale, { x: 0.2, y: 0.2, z: 0.2, duration: 0.8 }, iconDelay)
        .to(sprite.material.opacity, { value: 1, duration: 0.8 }, "<"); // Animate opacity simultaneously
    });


    // Raycaster for hover effects
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredIcon: THREE.Sprite | null = null;
    let currentHoverTween: gsap.core.Tween | null = null;


    const onMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(iconSpritesRef.current, false); // Non-recursive for sprites

      if (intersects.length > 0) {
        const firstIntersected = intersects[0].object as THREE.Sprite;
        if (hoveredIcon !== firstIntersected) {
          if (currentHoverTween) currentHoverTween.kill(); // Kill previous tween
          if (hoveredIcon) {
            currentHoverTween = gsap.to(hoveredIcon.scale, { x: 0.2, y: 0.2, z: 0.2, duration: 0.25, ease: "power2.out" });
          }
          hoveredIcon = firstIntersected;
          currentHoverTween = gsap.to(hoveredIcon.scale, { x: 0.25, y: 0.25, z: 0.25, duration: 0.25, ease: "power2.out" });
          renderer.domElement.style.cursor = 'pointer';
        }
      } else {
        if (hoveredIcon) {
          if (currentHoverTween) currentHoverTween.kill(); // Kill previous tween
          currentHoverTween = gsap.to(hoveredIcon.scale, { x: 0.2, y: 0.2, z: 0.2, duration: 0.25, ease: "power2.out" });
          renderer.domElement.style.cursor = 'default';
          hoveredIcon = null;
        }
      }
    };
    renderer.domElement.addEventListener('mousemove', onMouseMove);

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.offsetWidth;
        const newHeight = containerRef.current.offsetHeight;
        
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    let tlKill: gsap.core.Timeline | null = tl; // Keep a reference to kill
    return () => {
      if (tlKill) {
        tlKill.kill();
        tlKill = null;
      }
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);

      iconSpritesRef.current.forEach(sprite => {
        if (sprite.material.map) {
          sprite.material.map.dispose();
        }
        sprite.material.dispose();
      });
      iconTextures.forEach(texture => texture.dispose()); // Dispose canvas textures

      if (renderer) {
        renderer.dispose();
      }
      if (geometry) {
        geometry.dispose();
      }
      if (material) {
        material.dispose();
      }
      if (earthTexture) {
        earthTexture.dispose();
      }
      if (dotGeometry) {
        dotGeometry.dispose();
      }
      if (dotMaterial) {
        dotMaterial.dispose();
      }
      // controls.dispose(); // OrbitControls also has a dispose method
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount

  return (
    <div className="techglobe-container" style={{ width: '100%', height: '100vh' }}> {/* Ensure container has size */}
      <div ref={containerRef} style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default TechGlobe;
