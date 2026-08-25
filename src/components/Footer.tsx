"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

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
          repeat: xDuration / yDuration,
          yoyo: true,
          y: startY - stepBounce,
          ease: "power1.inOut",
        },
        0
      );

      return tl;
    };

    const walks = [normalWalk];

    // CLASSES
    class Peep {
      image: HTMLImageElement;
      x = 0;
      y = 0;
      anchorY = 0;
      scaleX = 1;
      scaleY = 1;
      height = 0;
      width = 0;
      depth = 0;
      walk: any = null;
      rect: number[] = [];

      constructor({
        image,
        rect,
      }: {
        image: HTMLImageElement;
        rect: number[];
      }) {
        this.image = image;
        this.setRect(rect);
      }

      setRect(rect: number[]) {
        this.rect = rect;
        this.width = rect[2];
        this.height = rect[3];
      }

      render(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.scaleX, this.scaleY);
        ctx.drawImage(
          this.image,
          this.rect[0],
          this.rect[1],
          this.rect[2],
          this.rect[3],
          0,
          0,
          this.width,
          this.height
        );
        ctx.restore();
      }
    }

    // MAIN
    const img = document.createElement("img");
    img.crossOrigin = "anonymous";
    img.onload = init;
    img.src = config.src;

    const stage = {
      width: 0,
      height: 0,
    };

    const allPeeps: Peep[] = [];
    const availablePeeps: Peep[] = [];
    const crowd: Peep[] = [];

    function createPeeps() {
      allPeeps.length = 0;
      const { rows, cols } = config;
      const { naturalWidth: width, naturalHeight: height } = img;
      const total = rows * cols;
      const rectWidth = width / rows;
      const rectHeight = height / cols;

      for (let i = 0; i < total; i++) {
        allPeeps.push(
          new Peep({
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
    }

    function resize() {
      if (!canvas) return;
      stage.width = canvas.clientWidth;
      stage.height = canvas.clientHeight;
      canvas.width = stage.width * (window.devicePixelRatio || 1);
      canvas.height = stage.height * (window.devicePixelRatio || 1);

      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });

      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);

      initCrowd();
    }

    function initCrowd() {
      while (availablePeeps.length) {
        addPeepToCrowd().walk.progress(Math.random());
      }
    }

    function addPeepToCrowd() {
      const peep = removeRandomFromArray(availablePeeps);
      const walk = getRandomFromArray(walks)({
        peep,
        props: resetPeep({
          peep,
          stage,
        }),
      }).eventCallback("onComplete", () => {
        removeFromArray(crowd, crowd.indexOf(peep));
        availablePeeps.push(peep);
        addPeepToCrowd();
      });

      peep.walk = walk;
      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);

      return peep;
    }

    function render() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

      crowd.forEach((peep) => {
        peep.render(ctx);
      });

      ctx.restore();
    }

    function init() {
      createPeeps();
      resize();
      gsap.ticker.add(render);
    }

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      gsap.ticker.remove(render);
      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });
    };
  }, [src, rows, cols, zoom]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute bottom-0 left-0 w-full h-[40vh] sm:h-[50vh] md:h-[55vh] pointer-events-none z-20"
    />
  );
};

export const Footer: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const line0Ref = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      if (line0Ref.current) {
        tl.fromTo(
          line0Ref.current,
          {
            x: () => -Math.min(window.innerWidth * 0.6, 350),
            rotate: -14,
            opacity: 0,
            scale: 0.4,
          },
          {
            x: 0,
            rotate: 0,
            opacity: 1,
            scale: 1,
            ease: "power2.out",
          },
          0
        );
      }

      if (line1Ref.current) {
        tl.fromTo(
          line1Ref.current,
          {
            x: 0,
            y: 0,
            rotate: 14,
            opacity: 0,
            scale: 0.4,
          },
          {
            x: 0,
            y: 0,
            rotate: 0,
            opacity: 1,
            scale: 1,
            ease: "power2.out",
          },
          0.08
        );
      }

      if (line2Ref.current) {
        tl.fromTo(
          line2Ref.current,
          {
            x: () => Math.min(window.innerWidth * 0.6, 350),
            rotate: -10,
            opacity: 0,
            scale: 0.4,
          },
          {
            x: 0,
            rotate: 0,
            opacity: 1,
            scale: 1,
            ease: "power2.out",
          },
          0.16
        );
      }

      if (noteRef.current) {
        tl.fromTo(
          noteRef.current,
          {
            y: 30,
            opacity: 0,
            scale: 0.6,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "power2.out",
          },
          0.24
        );
      }
    }, section);

    // Refresh ScrollTrigger to ensure correct offsets after layout renders
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  return (
    <footer
      id="footer"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden z-10 select-none px-4 sm:px-8 md:px-12 border-t border-[#1c1917]/15"
      style={{ fontFamily: "var(--font-heading)" }}
    >
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <img
          src="/images/page.webp"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover select-none pointer-events-none"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(235,225,210,0.35)_100%)] pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto text-center flex flex-col items-center justify-center -translate-y-8 sm:-translate-y-12 overflow-visible pointer-events-none">
        <h2
          className="flex flex-col items-center justify-center text-[54px] sm:text-[88px] md:text-[120px] lg:text-[144px] leading-[0.94] tracking-normal font-bold text-[#1c1917]"
          style={{
            fontFamily: "var(--font-sketch)",
          }}
        >
          <div
            ref={line0Ref}
            className="inline-block whitespace-nowrap overflow-visible leading-[0.94] my-0.5 sm:my-1 will-change-transform"
          >
            Thanks
          </div>

          <div
            ref={line1Ref}
            className="inline-block whitespace-nowrap overflow-visible leading-[0.94] my-0.5 sm:my-1 will-change-transform"
          >
            for
          </div>

          <div
            ref={line2Ref}
            className="inline-block whitespace-nowrap overflow-visible leading-[0.94] my-0.5 sm:my-1 will-change-transform"
          >
            visiting.
          </div>
        </h2>

        <div
          ref={noteRef}
          className="mt-4 sm:mt-6 text-[#6b4c30]/90 text-sm sm:text-base md:text-lg font-semibold tracking-wider will-change-transform"
          style={{ fontFamily: "var(--font-kalam)" }}
        >
          ✦ Crafted with care by Pratham Petwal · 2026
        </div>
      </div>

      <CrowdCanvas src="/images/peeps/all-peeps.png" rows={15} cols={7} zoom={0.34} />
    </footer>
  );
};

export { CrowdCanvas, Footer as Skiper39 };
export default Footer;
