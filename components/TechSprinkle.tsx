"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const TECH_ITEMS = [
  { type: "text", content: "React", color: "text-[#61DAFB]" },
  { type: "text", content: "Next.js", color: "text-white" },
  { type: "text", content: "TypeScript", color: "text-[#3178C6]" },
  { type: "text", content: "Node.js", color: "text-[#339933]" },
  { type: "text", content: "Tailwind", color: "text-[#06B6D4]" },
  { type: "text", content: "</>", color: "text-primary-200" },
  { type: "text", content: "{ }", color: "text-primary-300" },
  { type: "text", content: "Python", color: "text-[#FFD43B]" },
  { type: "text", content: "GraphQL", color: "text-[#E10098]" },
  { type: "text", content: "AWS", color: "text-[#FF9900]" },
  { type: "text", content: "Docker", color: "text-[#2496ED]" },
  { type: "image", content: "/react.svg" },
  { type: "image", content: "/tailwind.svg" },
];

export default function TechSprinkle() {
  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    // Generate an awesome set of items with rich randomized values
    const generatedItems = Array.from({ length: 35 }).map((_, i) => {
      const randomTech = TECH_ITEMS[Math.floor(Math.random() * TECH_ITEMS.length)];
      return {
        id: i,
        tech: randomTech,
        left: Math.random() * 100, // random start x
        endLeft: Math.random() * 100, // random end x for drift
        delay: Math.random() * 5, // stagger
        duration: 8 + Math.random() * 10, // slow, cinematic fall (8-18s)
        rotation: (Math.random() - 0.5) * 720, // huge spin
        scale: 0.5 + Math.random() * 1.5, // varied sizes
        blur: Math.random() > 0.6 ? "blur-[2px]" : "", // occasional depth of field blur
      };
    });
    setItems(generatedItems);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-dark-100">
      {/* Subtle ambient light to tie everything together */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-300/10 blur-[120px] rounded-full pointer-events-none" />
      
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ y: "-10vh", x: `${item.left}vw`, opacity: 0, rotate: 0, scale: item.scale }}
          animate={{
            y: "110vh",
            x: `${item.endLeft}vw`, // Drift across the screen
            opacity: [0, 0.8, 1, 0.8, 0], // Smooth fade in and out
            rotate: item.rotation,
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            ease: "linear",
            repeat: Infinity,
          }}
          className={`absolute font-mono font-bold flex items-center justify-center select-none ${item.blur}`}
          style={{ textShadow: "0 0 20px rgba(255,255,255,0.1)" }}
        >
          {item.tech.type === "text" ? (
            <span className={`text-xl md:text-3xl ${item.tech.color} opacity-40 drop-shadow-md`}>
              {item.tech.content}
            </span>
          ) : (
            <div className="opacity-30 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <Image src={item.tech.content} alt="icon" width={48} height={48} />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
