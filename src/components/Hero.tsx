import { useEffect, useRef } from "react";
import * as THREE from "three";
import BIRDS from "vanta/dist/vanta.clouds.min.js";
import { useTypewriter } from "../hooks/useTypewriter";
import { ArrowRight } from "lucide-react";
import NetworkSphere from "./three/NetworkSphere";
import CrossroadsScene from "./three/CrossroadsScene";
import ThreeBackground from "./three/falling-stars";

export default function Hero() {
  const vantaRef = useRef<HTMLDivElement | null>(null);
  const vantaEffect = useRef<any>(null); // Store the Vanta effect instance
  const typedText = useTypewriter(
    ["Digital Innovation", "Creative Solutions", "Tech Excellence"],
    150
  );

  useEffect(() => {
    if (!vantaEffect.current && vantaRef.current) {
      vantaEffect.current = BIRDS({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        speed: 2,
      });
    }
    return () => {
      // Clean up the Vanta effect on unmount
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <section
      id="home"
      // ref={vantaRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ThreeBackground />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 font-domine">
            The Crossroads of{" "}
            <span className="text-[#0A45EC] inline-block min-w-[2ch]">
              {typedText}
              <span className="animate-pulse">|</span>
            </span>
          </h1>
          <p
            className={
              "text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-manrope"
            }
          >
            Where innovation meets excellence in digital transformation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#about")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-500 text-white font-semibold hover:opacity-90 transition-colors"
            >
              Explore Our Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center px-6 py-3 rounded-lg border border-primary-500 text-[#0A45EC] font-semibold hover:bg-primary-500 hover:text-white transition-all"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
