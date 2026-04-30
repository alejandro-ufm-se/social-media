"use client";
import { useEffect, useRef, useState } from "react";

export function useCountUp(target: number, duration = 1400) {
  const ref = useRef<HTMLDivElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const tick = (t: number) => {
            const k = Math.min(1, (t - t0) / duration);
            const eased = 1 - Math.pow(1 - k, 3);
            setVal(target * eased);
            if (k < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.3 });
    io.observe(el); return () => io.disconnect();
  }, [target, duration]);
  return [ref, Math.round(val)] as const;
}
