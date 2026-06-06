import { useRef, ReactNode, MouseEvent, useState } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees */
  max?: number;
}

/**
 * 3D tilt card with a moving glow highlight that follows the cursor.
 * Lifts slightly and reveals a neon border on hover.
 */
export function TiltCard({ children, className = "", max = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50, active: false });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotX = (0.5 - py) * max * 2;
    const rotY = (px - 0.5) * max * 2;
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`;
    setGlow({ x: px * 100, y: py * 100, active: true });
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    setGlow((g) => ({ ...g, active: false }));
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`tilt-card relative transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{
        // glow highlight position
        ["--glow-x" as string]: `${glow.x}%`,
        ["--glow-y" as string]: `${glow.y}%`,
        ["--glow-o" as string]: glow.active ? "1" : "0",
      }}
    >
      {children}
    </div>
  );
}