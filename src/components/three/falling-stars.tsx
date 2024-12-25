import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const mountRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let frameId;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Camera position
    camera.position.z = 5;

    // Create background particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Material for background particles - INCREASED SIZE
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.01, // Doubled from 0.005 to 0.01
      color: '#4a90e2',
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    // Create background points
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Falling Stars
    class FallingStar {
      constructor() {
        this.geometry = new THREE.BufferGeometry();
        const trail = 30;
        const positions = new Float32Array(trail * 3);
        
        const x = (Math.random() - 0.5) * 12;
        const y = 5 + Math.random() * 3;
        const z = (Math.random() - 0.5) * 5;
        
        for (let i = 0; i < trail; i++) {
          positions[i * 3] = x;
          positions[i * 3 + 1] = y;
          positions[i * 3 + 2] = z;
        }
        
        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        this.material = new THREE.LineBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending
        });
        
        this.star = new THREE.Line(this.geometry, this.material);
        this.velocity = -0.1 - Math.random() * 0.15;
        this.horizontalVelocity = (Math.random() - 0.5) * 0.02;
        this.positions = positions;
        scene.add(this.star);
      }

      update() {
        const positions = this.positions;
        
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += this.horizontalVelocity;
          positions[i + 1] += this.velocity;
        }
        
        if (positions[1] < -5) {
          const x = (Math.random() - 0.5) * 12;
          const y = 5 + Math.random() * 3;
          for (let i = 0; i < positions.length; i += 3) {
            positions[i] = x;
            positions[i + 1] = y;
          }
          this.velocity = -0.1 - Math.random() * 0.15;
          this.horizontalVelocity = (Math.random() - 0.5) * 0.02;
        }
        
        this.geometry.attributes.position.needsUpdate = true;
      }

      dispose() {
        scene.remove(this.star);
        this.geometry.dispose();
        this.material.dispose();
      }
    }

    // Create falling stars
    const fallingStars = [];
    const numStars = 20;
    for (let i = 0; i < numStars; i++) {
      fallingStars.push(new FallingStar());
    }

    // Mouse move event handler
    const handleMouseMove = (event) => {
      mousePosition.current = {
        x: (event.clientX / width) * 4 - 10,
        y: -(event.clientY / height) * 3 + 1
      };
    };

    // Animation
    const animate = () => {
      particlesMesh.rotation.x += 0.0001;
      particlesMesh.rotation.y += 0.0001;

      particlesMesh.rotation.x += mousePosition.current.y * 0.0003;
      particlesMesh.rotation.y += mousePosition.current.x * 0.0003;

      fallingStars.forEach(star => star.update());

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    // Handle window resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      mountRef.current.removeChild(renderer.domElement);
      
      fallingStars.forEach(star => star.dispose());
    };
  }, []);

  return (
    <div 
      ref={mountRef}
      className="absolute top-0 left-0 w-full h-full"
      style={{ background: 'linear-gradient(to bottom right, #000B1F, #001F3F)' }}
    />
  );
};

export default ThreeBackground;