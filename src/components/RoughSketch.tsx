import React, { useEffect, useRef } from "react";
import rough from "roughjs";

interface RoughSketchProps {
  type?: "box" | "underline" | "badge" | "circle" | "spiral" | "corner";
  width?: number | string;
  height?: number | string;
  stroke?: string;
  strokeWidth?: number;
  roughness?: number;
  bowing?: number;
  fill?: string;
  fillStyle?: "hachure" | "solid" | "zigzag" | "cross-hatch" | "dots" | "dashed";
  fillWeight?: number;
  hachureAngle?: number;
  hachureGap?: number;
  className?: string;
  children?: React.ReactNode;
}

export const RoughSketch: React.FC<RoughSketchProps> = ({
  type = "box",
  width,
  height,
  stroke = "#e2e8f0",
  strokeWidth = 1.5,
  roughness = 1.2,
  bowing = 1.5,
  fill,
  fillStyle = "hachure",
  fillWeight = 1,
  hachureAngle = -41,
  hachureGap = 4,
  className = "",
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !container) return;

    const renderSketch = () => {
      const rect = container.getBoundingClientRect();
      const w = rect.width || 100;
      const h = rect.height || 40;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      const rc = rough.canvas(canvas);
      const options = {
        stroke,
        strokeWidth,
        roughness,
        bowing,
        fill,
        fillStyle,
        fillWeight,
        hachureAngle,
        hachureGap,
      };

      const pad = 4;
      const drawW = Math.max(8, w - pad * 2);
      const drawH = Math.max(8, h - pad * 2);

      switch (type) {
        case "box":
          rc.rectangle(pad, pad, drawW, drawH, options);
          break;

        case "underline":
          rc.line(pad, h - pad - 2, w - pad, h - pad, {
            ...options,
            strokeWidth: strokeWidth * 1.4,
          });
          // subtle secondary wave line
          rc.line(pad + 4, h - pad + 1, w - pad - 4, h - pad + 2, {
            ...options,
            strokeWidth: strokeWidth * 0.8,
            roughness: roughness * 1.5,
          });
          break;

        case "badge":
          rc.ellipse(w / 2, h / 2, drawW, drawH, options);
          break;

        case "circle":
          rc.circle(w / 2, h / 2, Math.min(drawW, drawH), options);
          break;

        case "spiral":
          // Draw sketchbook wire bindings / spiral coils
          const loops = Math.max(3, Math.floor(h / 14));
          for (let i = 0; i < loops; i++) {
            const y = pad + (i * (h - pad * 2)) / (loops - 1 || 1);
            rc.ellipse(w / 2, y, drawW * 0.8, 8, {
              ...options,
              strokeWidth: 2,
              roughness: 0.8,
            });
          }
          break;

        case "corner":
          // Decorative sketchbook photo corners
          rc.line(pad, pad + 12, pad, pad, options);
          rc.line(pad, pad, pad + 12, pad, options);
          rc.line(w - pad - 12, pad, w - pad, pad, options);
          rc.line(w - pad, pad, w - pad, pad + 12, options);
          rc.line(pad, h - pad - 12, pad, h - pad, options);
          rc.line(pad, h - pad, pad + 12, h - pad, options);
          rc.line(w - pad - 12, h - pad, w - pad, h - pad, options);
          rc.line(w - pad, h - pad, w - pad, h - pad - 12, options);
          break;
      }
    };

    renderSketch();

    const resizeObserver = new ResizeObserver(() => {
      renderSketch();
    });
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [
    type,
    stroke,
    strokeWidth,
    roughness,
    bowing,
    fill,
    fillStyle,
    fillWeight,
    hachureAngle,
    hachureGap,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};

export default RoughSketch;
