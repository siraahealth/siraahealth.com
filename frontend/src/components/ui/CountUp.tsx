"use client";

import { useEffect, useState, useRef } from "react";

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export function CountUp({ end, duration = 2000, suffix = "", prefix = "" }: CountUpProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTimestamp: number | null = null;
          
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * end));
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={countRef}>
      {prefix}{count}{suffix}
    </span>
  );
}
