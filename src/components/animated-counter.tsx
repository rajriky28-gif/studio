"use client";

import { useEffect, useState, useRef } from 'react';

export function AnimatedCounter({ 
  target, 
  duration = 2000,
  className
}: { 
  target: number;
  duration?: number;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const end = target;
          if (start === end) return;

          let startTime: number | null = null;
          
          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentCount = Math.floor(progress * (end - start) + start);
            setCount(currentCount);

            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };

          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref} className={className}>{count.toLocaleString()}</span>;
}
