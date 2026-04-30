"use client";
export function Avatar({ name, online, shimmer, size }: { name: string; online?: boolean; shimmer?: boolean; size?: number }) {
  const initials = name.split(/\s+/).map(s => s[0]).slice(0, 2).join("").toUpperCase();
  const style = size ? { width: size, height: size, fontSize: size * 0.36 } : undefined;
  let h = 0; for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
  const hue1 = 195 + (h % 30); const hue2 = 215 + ((h * 3) % 30);
  const bg = `linear-gradient(135deg, hsl(${hue1} 60% 75%), hsl(${hue2} 70% 45%))`;
  return (
    <div className={`avatar${shimmer ? " shimmer" : ""}`} style={{ ...style, background: bg }}>
      {initials}
      {online && <span className="online" />}
    </div>
  );
}
