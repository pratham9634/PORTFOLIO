"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

function lerp(a: number, b: number, n: number) {
  return (1 - n) * a + n * b;
}

function getLocalPointerPos(e: MouseEvent | TouchEvent, rect: DOMRect) {
  let clientX = 0;
  let clientY = 0;
  if ('touches' in e && e.touches && e.touches.length > 0) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else if ('clientX' in e) {
    clientX = (e as MouseEvent).clientX;
    clientY = (e as MouseEvent).clientY;
  }
  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
    clientX,
    clientY,
  };
}

function getMouseDistance(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.hypot(dx, dy);
}

class ImageItem {
  DOM: { el: HTMLElement; inner: HTMLElement | null };
  defaultStyle = { scale: 1, x: 0, y: 0, opacity: 0 };
  rect!: { width: number; height: number; top: number; left: number; right: number; bottom: number };
  resize!: () => void;

  constructor(DOM_el: HTMLElement) {
    this.DOM = {
      el: DOM_el,
      inner: DOM_el.querySelector('.content__img-inner')
    };
    this.getRect();
    this.initEvents();
  }

  initEvents() {
    this.resize = () => {
      gsap.set(this.DOM.el, this.defaultStyle);
      this.getRect();
    };
    window.addEventListener('resize', this.resize);
  }

  getRect() {
    const r = this.DOM.el.getBoundingClientRect();
    this.rect = {
      width: r.width || 120,
      height: r.height || 120,
      top: r.top,
      left: r.left,
      right: r.right,
      bottom: r.bottom,
    };
  }

  destroy() {
    window.removeEventListener('resize', this.resize);
  }
}

class ImageTrailVariant1 {
  container: HTMLElement;
  rafId: number | null = null;
  destroyed = false;
  DOM: { el: HTMLElement };
  images: ImageItem[];
  imagesTotal: number;
  imgPosition = 0;
  zIndexVal = 1;
  activeImagesCount = 0;
  isIdle = true;
  threshold = 60;
  mousePos = { x: 0, y: 0 };
  lastMousePos = { x: 0, y: 0 };
  cacheMousePos = { x: 0, y: 0 };
  handlePointerMove: (ev: MouseEvent | TouchEvent) => void;
  initRender: (ev: MouseEvent | TouchEvent) => void;

  constructor(container: HTMLElement) {
    this.container = container;
    this.DOM = { el: container };
    this.images = [...container.querySelectorAll<HTMLElement>('.content__img')].map(
      img => new ImageItem(img)
    );
    this.imagesTotal = this.images.length;

    const handlePointerMove = (ev: MouseEvent | TouchEvent) => {
      if (!this.container) return;
      const rect = this.container.getBoundingClientRect();
      const pos = getLocalPointerPos(ev, rect);
      if (
        pos.clientX >= rect.left - 20 &&
        pos.clientX <= rect.right + 20 &&
        pos.clientY >= rect.top - 20 &&
        pos.clientY <= rect.bottom + 20
      ) {
        this.mousePos = { x: pos.x, y: pos.y };
      }
    };

    const initRender = (ev: MouseEvent | TouchEvent) => {
      if (!this.container) return;
      const rect = this.container.getBoundingClientRect();
      const pos = getLocalPointerPos(ev, rect);
      if (
        pos.clientX >= rect.left - 20 &&
        pos.clientX <= rect.right + 20 &&
        pos.clientY >= rect.top - 20 &&
        pos.clientY <= rect.bottom + 20
      ) {
        this.mousePos = { x: pos.x, y: pos.y };
        this.cacheMousePos = { ...this.mousePos };
        this.lastMousePos = { ...this.mousePos };
        this.rafId = requestAnimationFrame(() => this.render());

        window.removeEventListener('mousemove', initRender as EventListener);
        window.removeEventListener('touchmove', initRender as EventListener);
      }
    };

    window.addEventListener('mousemove', handlePointerMove as EventListener, { passive: true });
    window.addEventListener('touchmove', handlePointerMove as EventListener, { passive: true });
    window.addEventListener('mousemove', initRender as EventListener, { passive: true });
    window.addEventListener('touchmove', initRender as EventListener, { passive: true });

    this.handlePointerMove = handlePointerMove;
    this.initRender = initRender;
  }

  render() {
    if (this.destroyed) return;

    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);

    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) {
      this.zIndexVal = 1;
    }
    this.rafId = requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    if (this.imagesTotal === 0) return;
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    if (!img || !img.rect) return;

    gsap.killTweensOf(img.DOM.el);
    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated()
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          scale: 0.2,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2
        },
        {
          duration: 0.45,
          ease: 'power2.out',
          scale: 1,
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2
        },
        0
      )
      .to(
        img.DOM.el,
        {
          duration: 0.45,
          ease: 'power3.inOut',
          opacity: 0,
          scale: 0.2
        },
        0.35
      );
  }

  destroy() {
    this.destroyed = true;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    window.removeEventListener('mousemove', this.handlePointerMove as EventListener);
    window.removeEventListener('touchmove', this.handlePointerMove as EventListener);
    window.removeEventListener('mousemove', this.initRender as EventListener);
    window.removeEventListener('touchmove', this.initRender as EventListener);
    this.images.forEach(img => {
      gsap.killTweensOf(img.DOM.el);
      img.destroy();
    });
  }

  onImageActivated() {
    this.activeImagesCount++;
    this.isIdle = false;
  }
  onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) {
      this.isIdle = true;
    }
  }
}

class ImageTrailVariant2 {
  container: HTMLElement;
  rafId: number | null = null;
  destroyed = false;
  DOM: { el: HTMLElement };
  images: ImageItem[];
  imagesTotal: number;
  imgPosition = 0;
  zIndexVal = 1;
  activeImagesCount = 0;
  isIdle = true;
  threshold = 60;
  mousePos = { x: 0, y: 0 };
  lastMousePos = { x: 0, y: 0 };
  cacheMousePos = { x: 0, y: 0 };
  handlePointerMove: (ev: MouseEvent | TouchEvent) => void;
  initRender: (ev: MouseEvent | TouchEvent) => void;

  constructor(container: HTMLElement) {
    this.container = container;
    this.DOM = { el: container };
    this.images = [...container.querySelectorAll<HTMLElement>('.content__img')].map(
      img => new ImageItem(img)
    );
    this.imagesTotal = this.images.length;

    const handlePointerMove = (ev: MouseEvent | TouchEvent) => {
      if (!this.container) return;
      const rect = container.getBoundingClientRect();
      const pos = getLocalPointerPos(ev, rect);
      if (
        pos.clientX >= rect.left - 20 &&
        pos.clientX <= rect.right + 20 &&
        pos.clientY >= rect.top - 20 &&
        pos.clientY <= rect.bottom + 20
      ) {
        this.mousePos = { x: pos.x, y: pos.y };
      }
    };

    const initRender = (ev: MouseEvent | TouchEvent) => {
      if (!this.container) return;
      const rect = container.getBoundingClientRect();
      const pos = getLocalPointerPos(ev, rect);
      if (
        pos.clientX >= rect.left - 20 &&
        pos.clientX <= rect.right + 20 &&
        pos.clientY >= rect.top - 20 &&
        pos.clientY <= rect.bottom + 20
      ) {
        this.mousePos = { x: pos.x, y: pos.y };
        this.cacheMousePos = { ...this.mousePos };
        this.lastMousePos = { ...this.mousePos };
        this.rafId = requestAnimationFrame(() => this.render());

        window.removeEventListener('mousemove', initRender as EventListener);
        window.removeEventListener('touchmove', initRender as EventListener);
      }
    };

    window.addEventListener('mousemove', handlePointerMove as EventListener, { passive: true });
    window.addEventListener('touchmove', handlePointerMove as EventListener, { passive: true });
    window.addEventListener('mousemove', initRender as EventListener, { passive: true });
    window.addEventListener('touchmove', initRender as EventListener, { passive: true });

    this.handlePointerMove = handlePointerMove;
    this.initRender = initRender;
  }

  render() {
    if (this.destroyed) return;

    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);

    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) {
      this.zIndexVal = 1;
    }
    this.rafId = requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    if (this.imagesTotal === 0) return;
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    if (!img || !img.rect) return;

    gsap.killTweensOf(img.DOM.el);
    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated()
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          scale: 0,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2
        },
        {
          duration: 0.4,
          ease: 'power1',
          scale: 1,
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2
        },
        0
      )
      .fromTo(
        img.DOM.inner,
        {
          scale: 2.8,
          filter: 'brightness(250%)'
        },
        {
          duration: 0.4,
          ease: 'power1',
          scale: 1,
          filter: 'brightness(100%)'
        },
        0
      )
      .to(
        img.DOM.el,
        {
          duration: 0.4,
          ease: 'power2',
          opacity: 0,
          scale: 0.2
        },
        0.45
      );
  }

  destroy() {
    this.destroyed = true;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    window.removeEventListener('mousemove', this.handlePointerMove as EventListener);
    window.removeEventListener('touchmove', this.handlePointerMove as EventListener);
    window.removeEventListener('mousemove', this.initRender as EventListener);
    window.removeEventListener('touchmove', this.initRender as EventListener);
    this.images.forEach(img => {
      gsap.killTweensOf(img.DOM.el);
      img.destroy();
    });
  }

  onImageActivated() {
    this.activeImagesCount++;
    this.isIdle = false;
  }
  onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) this.isIdle = true;
  }
}

const variantMap: Record<number, any> = {
  1: ImageTrailVariant1,
  2: ImageTrailVariant2,
};

export interface ImageTrailProps {
  items?: string[];
  variant?: 1 | 2 | number;
  className?: string;
  itemClassName?: string;
}

export const DEFAULT_TECH_IMAGES = [
  "/icons/react.svg",
  "/icons/typescript.svg",
  "/icons/nextjs.svg",
  "/icons/python.svg",
  "/icons/nodejs.svg",
  "/icons/docker.svg",
  "/icons/postgresql.svg",
  "/icons/aws.svg",
  "/icons/git.svg",
  "/icons/fastapi.svg",
  "/icons/tailwind.svg",
  "/icons/mongodb.svg",
];

export default function ImageTrail({
  items = DEFAULT_TECH_IMAGES,
  variant = 1,
  className = "",
  itemClassName = "",
}: ImageTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const Cls = variantMap[variant] || variantMap[1];
    const instance = new Cls(containerRef.current);

    return () => {
      instance.destroy();
    };
  }, [variant, items]);

  return (
    <div
      className={`w-full h-full relative z-[10] rounded-lg bg-transparent overflow-visible pointer-events-none ${className}`}
      ref={containerRef}
    >
      {items.map((url, i) => (
        <div
          className={`content__img w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] rounded-[22px] absolute top-0 left-0 opacity-0 overflow-hidden [will-change:transform,filter] pointer-events-none bg-white/95 p-3.5 border border-black/10 shadow-[0_16px_36px_-6px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.04)] backdrop-blur-xl flex items-center justify-center ${itemClassName}`}
          key={i}
        >
          <div
            className="content__img-inner bg-center bg-no-repeat bg-contain w-full h-full"
            style={{ backgroundImage: `url(${url})` }}
          />
        </div>
      ))}
    </div>
  );
}

export { ImageTrail };
