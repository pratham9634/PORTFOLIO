import React, { useRef, useEffect, useState } from 'react';
import rough from 'roughjs';
import { Options } from 'roughjs/bin/core';

export interface RoughBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  roughness?: number;
  bowing?: number;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  fillStyle?: 'hachure' | 'solid' | 'zigzag' | 'cross-hatch' | 'dots' | 'dashed';
  fillWeight?: number;
  hachureAngle?: number;
  hachureGap?: number;
  className?: string;
  style?: React.CSSProperties;
  seed?: number;
  padding?: string;
}

export const RoughBox: React.FC<RoughBoxProps> = ({
  children,
  roughness = 1.6,
  bowing = 1.2,
  stroke = '#1c1917',
  strokeWidth = 1.8,
  fill,
  fillStyle,
  fillWeight = 1,
  hachureAngle = -41,
  hachureGap = 4,
  className = '',
  style = {},
  seed,
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const uniqueSeed = useRef(seed || Math.floor(Math.random() * 100000));

  // Measure element size dynamically
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      const { clientWidth, clientHeight } = container;
      if (clientWidth > 0 && clientHeight > 0) {
        setDimensions({ width: clientWidth, height: clientHeight });
      }
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  // Draw rough borders when dimensions or options change
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || dimensions.width === 0 || dimensions.height === 0) return;

    // Clear previous rough elements
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    const rc = rough.svg(svg);
    const options: Options = {
      roughness,
      bowing,
      stroke,
      strokeWidth,
      seed: uniqueSeed.current,
      ...(fill ? { fill, fillStyle: fillStyle || 'hachure', fillWeight, hachureAngle, hachureGap } : {}),
    };

    const margin = Math.ceil(strokeWidth + 2);
    const w = Math.max(dimensions.width - margin * 2, 10);
    const h = Math.max(dimensions.height - margin * 2, 10);

    const node = rc.rectangle(margin, margin, w, h, options);
    svg.appendChild(node);
  }, [
    dimensions,
    roughness,
    bowing,
    stroke,
    strokeWidth,
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
      style={style}
      {...rest}
    >
      {/* Background SVG for Rough.js sketchy outline */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
        width={dimensions.width || '100%'}
        height={dimensions.height || '100%'}
      />

      {/* Foreground Content */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};

/** Rough.js Sketchy Underline */
export const RoughUnderline: React.FC<{
  className?: string;
  stroke?: string;
  strokeWidth?: number;
  roughness?: number;
  bowing?: number;
}> = ({
  className = '',
  stroke = '#1c1917',
  strokeWidth = 2.2,
  roughness = 1.8,
  bowing = 1.4,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const w = containerRef.current.clientWidth;
    if (w > 0) setWidth(w);

    const ro = new ResizeObserver(() => {
      if (containerRef.current) {
        setWidth(containerRef.current.clientWidth);
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || width === 0) return;

    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const rc = rough.svg(svg);
    const line1 = rc.line(2, 4, width - 2, 4, {
      stroke,
      strokeWidth,
      roughness,
      bowing,
    });
    const line2 = rc.line(6, 8, width - 8, 8, {
      stroke,
      strokeWidth: strokeWidth * 0.75,
      roughness: roughness * 1.2,
      bowing: bowing * 1.2,
    });

    svg.appendChild(line1);
    svg.appendChild(line2);
  }, [width, stroke, strokeWidth, roughness, bowing]);

  return (
    <div ref={containerRef} className={`relative w-full h-3 ${className}`}>
      <svg ref={svgRef} className="w-full h-full pointer-events-none" />
    </div>
  );
};
