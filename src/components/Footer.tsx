"use client";

import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

interface CrowdCanvasProps {
  src?: string;
  rows?: number;
  cols?: number;
  zoom?: number;
}

const CrowdCanvas: React.FC<CrowdCanvasProps> = ({
  src = "/images/peeps/all-peeps.png",
  rows = 15,
  cols = 7,
  zoom = 0.35,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const config = {
      src,
      rows,
      cols,
      zoom,
    };

    // UTILS
    const randomRange = (min: number, max: number) =>
      min + Math.random() * (max - min);
    const randomIndex = (array: any[]) => randomRange(0, array.length) | 0;
    const removeFromArray = (array: any[], i: number) => array.splice(i, 1)[0];
    const removeItemFromArray = (array: any[], item: any) =>
      removeFromArray(array, array.indexOf(item));
    const removeRandomFromArray = (array: any[]) =>
      removeFromArray(array, randomIndex(array));
    const getRandomFromArray = (array: any[]) => array[randomIndex(array) | 0];

    // TWEEN FACTORIES
    const resetPeep = ({ stage, peep }: { stage: any; peep: any }) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const depth = gsap.parseEase("power2.in")(Math.random());

      const baseZoom = config.zoom;
      const peepScale = baseZoom * (0.85 + (1 - depth) * 0.35);

      peep.scaleX = direction * peepScale;
      peep.scaleY = peepScale;
      peep.depth = depth;

      const currentWidth = peep.width * peepScale;
      const currentHeight = peep.height * peepScale;

      const offsetY = 10 - 130 * depth;
      const startY = stage.height - currentHeight + offsetY;

      let startX: number;
      let endX: number;

      if (direction === 1) {
        startX = -currentWidth;
        endX = stage.width;
      } else {
        startX = stage.width + currentWidth;
        endX = 0;
      }

      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;

      return {
        startY,
        endX,
        depth,
      };
    };

    const normalWalk = ({ peep, props }: { peep: any; props: any }) => {
      const { startY, endX, depth } = props;
      const xDuration = (9 + (depth || 0) * 4) * randomRange(0.85, 1.25);
      const yDuration = 0.22;
      const stepBounce = 5 * (peep.scaleY / 0.35);

      const tl = gsap.timeline();
      tl.to(
        peep,
        {
          duration: xDuration,
          x: endX,
          ease: "none",
        },
        0
      );
      tl.to(
        peep,
        {
          duration: yDuration,
          repeat: Math.floor(xDuration / yDuration),
          yoyo: true,
          y: startY - stepBounce,
          ease: "power1.inOut",
        },
        0
      );

      return tl;
    };

    const walks = [normalWalk];

    // TYPES
    type Peep = {
      image: HTMLImageElement;
      rect: number[];
      width: number;
      height: number;
      drawArgs: any[];
      x: number;
      y: number;
      anchorY: number;
      scaleX: number;
      scaleY: number;
      depth: number;
      walk: any;
      setRect: (rect: number[]) => void;
      render: (ctx: CanvasRenderingContext2D) => void;
    };

    // FACTORY FUNCTIONS
    const createPeep = ({
      image,
      rect,
    }: {
      image: HTMLImageElement;
      rect: number[];
    }): Peep => {
      const peep: Peep = {
        image,
        rect: [],
        width: 0,
        height: 0,
        drawArgs: [],
        x: 0,
        y: 0,
        anchorY: 0,
        scaleX: config.zoom,
        scaleY: config.zoom,
        depth: 0,
        walk: null,
        setRect: (rect: number[]) => {
          peep.rect = rect;
          peep.width = rect[2];
          peep.height = rect[3];
          peep.drawArgs = [peep.image, ...rect, 0, 0, peep.width, peep.height];
        },
        render: (ctx: CanvasRenderingContext2D) => {
          ctx.save();
          ctx.translate(peep.x, peep.y);
          ctx.scale(peep.scaleX, peep.scaleY);
          ctx.drawImage(
            peep.image,
            peep.rect[0],
            peep.rect[1],
            peep.rect[2],
            peep.rect[3],
            0,
            0,
            peep.width,
            peep.height
          );
          ctx.restore();
        },
      };

      peep.setRect(rect);
      return peep;
    };

    const img = document.createElement("img");
    img.crossOrigin = "anonymous";
    const stage = {
      width: 0,
      height: 0,
    };

    const allPeeps: Peep[] = [];
    const availablePeeps: Peep[] = [];
    const crowd: Peep[] = [];

    const createPeeps = () => {
      allPeeps.length = 0;
      const { rows, cols } = config;
      const { naturalWidth: width, naturalHeight: height } = img;
      const total = rows * cols;
      const rectWidth = width / rows;
      const rectHeight = height / cols;

      for (let i = 0; i < total; i++) {
        allPeeps.push(
          createPeep({
            image: img,
            rect: [
              (i % rows) * rectWidth,
              ((i / rows) | 0) * rectHeight,
              rectWidth,
              rectHeight,
            ],
          })
        );
      }
    };

    const addPeepToCrowd = () => {
      if (!availablePeeps.length) return null;
      const peep = removeRandomFromArray(availablePeeps);
      const walk = getRandomFromArray(walks)({
        peep,
        props: resetPeep({
          peep,
          stage,
        }),
      }).eventCallback("onComplete", () => {
        removePeepFromCrowd(peep);
        addPeepToCrowd();
      });

      peep.walk = walk;
      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);

      return peep;
    };

    const initCrowd = () => {
      while (availablePeeps.length) {
        const peep = addPeepToCrowd();
        if (peep && peep.walk) {
          peep.walk.progress(Math.random());
        }
      }
    };

    const removePeepFromCrowd = (peep: Peep) => {
      removeItemFromArray(crowd, peep);
      availablePeeps.push(peep);
    };

    const render = () => {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

      crowd.forEach((peep) => {
        peep.render(ctx);
      });

      ctx.restore();
    };

    let isInitialized = false;

    const resize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      stage.width = canvas.clientWidth || window.innerWidth;
      stage.height = canvas.clientHeight || 400;
      canvas.width = stage.width * dpr;
      canvas.height = stage.height * dpr;

      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });

      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);

      initCrowd();
    };

    const init = () => {
      if (isInitialized) return;
      isInitialized = true;
      createPeeps();
      resize();
      gsap.ticker.add(render);
    };

    img.onload = init;
    img.src = config.src;

    if (img.complete && img.naturalWidth > 0) {
      init();
    }

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(render);
      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });
    };
  }, [src, rows, cols, zoom]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute bottom-0 left-0 w-full h-[40vh] sm:h-[50vh] md:h-[55vh] pointer-events-none z-0"
    />
  );
};

export const Footer: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // 3-line format for animated headline
  const lines = ["Thanks", "for", "visiting."];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const chars = titleRef.current?.querySelectorAll(".char-item");
    const tl = gsap.timeline({ paused: true });

    if (chars && chars.length > 0) {
      tl.fromTo(
        chars,
        {
          yPercent: 130,
          rotateX: 55,
          opacity: 0,
          filter: "blur(8px)",
        },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.03,
          ease: "power4.out",
        }
      );
    }

    tlRef.current = tl;

    // IntersectionObserver to re-trigger text animation whenever footer enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tl.restart();
          }
        });
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      tl.kill();
    };
  }, []);

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen w-full tactile-menu-bg text-black flex flex-col justify-center items-center overflow-hidden z-10 select-none px-6 sm:px-10 border-t border-[#1c1917]/15"
      style={{ fontFamily: "var(--font-heading)" }}
    >
      {/* 3-Line Centered GSAP Animated Text Reveal */}
      <div className="relative z-10 w-full max-w-6xl mx-auto text-center flex flex-col items-center justify-center -translate-y-8 sm:-translate-y-12">
        <h2
          ref={titleRef}
          className="flex flex-col items-center justify-center text-[54px] sm:text-[88px] md:text-[120px] lg:text-[144px] leading-[0.92] tracking-tight font-bold text-black"
          style={{
            perspective: "1000px",
          }}
        >
          {lines.map((line, lineIndex) => (
            <div
              key={lineIndex}
              className="inline-block whitespace-nowrap overflow-visible leading-[0.92] my-0.5 sm:my-1"
            >
              {line.split("").map((char, charIndex) => (
                <span
                  key={charIndex}
                  className="char-item inline-block transform-gpu will-change-transform"
                >
                  {char}
                </span>
              ))}
            </div>
          ))}
        </h2>
      </div>

      {/* Zoomed Out Walking Crowd Canvas */}
      <CrowdCanvas src="/images/peeps/all-peeps.png" rows={15} cols={7} zoom={0.34} />
    </footer>
  );
};

export { CrowdCanvas, Footer as Skiper39 };
export default Footer;
