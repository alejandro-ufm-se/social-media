"use client";
import { useEffect, useRef, useState } from "react";
import { Avatar } from "./Avatar";
import * as Icon from "./Icons";
import { useCountUp } from "@/lib/useCountUp";
import type { Post as PostT } from "@/lib/data";

function LikeButton({ initial = 0, initiallyLiked = false }: { initial?: number; initiallyLiked?: boolean }) {
  const [liked, setLiked] = useState(initiallyLiked);
  const [count, setCount] = useState(initial);
  const [splashes, setSplashes] = useState<{ id: number; drops: { dx: number; dy: number; delay: number }[] }[]>([]);
  const toggle = () => {
    const next = !liked; setLiked(next); setCount(c => c + (next ? 1 : -1));
    if (next) {
      const id = Math.random();
      const drops = Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2; const r = 14 + Math.random() * 10;
        return { dx: Math.cos(a) * r, dy: Math.sin(a) * r, delay: Math.random() * 60 };
      });
      setSplashes(s => [...s, { id, drops }]);
      setTimeout(() => setSplashes(s => s.filter(x => x.id !== id)), 800);
    }
  };
  return (
    <button className={`action-btn ${liked ? "liked" : ""}`} onClick={toggle}>
      <Icon.Heart filled={liked} />
      <span className="count">{count.toLocaleString()}</span>
      {splashes.map(s => (
        <span className="splash" key={s.id}>
          <span className="ring" />
          {s.drops.map((d, i) => (
            <span key={i} className="drop" style={{ ["--dx" as never]: `${d.dx}px`, ["--dy" as never]: `${d.dy}px`, animationDelay: `${d.delay}ms` } as React.CSSProperties}/>
          ))}
        </span>
      ))}
    </button>
  );
}

function PostShell({ post, children }: { post: PostT; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el); return () => io.disconnect();
  }, []);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `translateY(-3px) rotateX(${(-y*1.2).toFixed(2)}deg) rotateY(${(x*1.4).toFixed(2)}deg)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ""; };
  const tagInfo = { routine: { cls: "routine", label: "Routine", icon: <Icon.Dumbbell size={11}/> },
                    diet:    { cls: "diet",    label: "Meal plan", icon: <Icon.Apple size={11}/> },
                    tip:     { cls: "tip",     label: "Tip",       icon: <Icon.Spark size={11}/> } }[post.type];
  return (
    <article ref={ref} className={`post glass reveal ${vis ? "in" : ""}`} style={{ transformStyle: "preserve-3d" }} onMouseMove={onMove} onMouseLeave={onLeave}>
      <header className="post-head">
        <Avatar name={post.author} online={post.online} shimmer={post.shimmer}/>
        <div className="who">
          <span className="name">{post.author}{post.verified && <span title="verified" style={{ color: "#a8d4e8" }}>◆</span>}</span>
          <span className="meta">@{post.handle} · {post.time}</span>
        </div>
        <span className={`tag ${tagInfo.cls}`}>{tagInfo.icon} {tagInfo.label}</span>
      </header>
      {children}
      <footer className="post-actions">
        <LikeButton initial={post.likes} initiallyLiked={post.liked}/>
        <button className="action-btn"><Icon.Comment/><span className="count">{post.comments}</span></button>
        <button className="action-btn"><Icon.Share/> Share</button>
        <span className="spacer"/>
        <button className="action-btn"><Icon.Bookmark/> Save</button>
      </footer>
    </article>
  );
}

function MacroBox({ label, value, unit, pct }: { label: string; value: number; unit: string; pct: number }) {
  const [ref, v] = useCountUp(value, 1100);
  return (
    <div className="macro" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className="label">{label}</div>
      <div className="value">{v}<span className="unit">{unit}</span></div>
      <div className="bar"><span style={{ width: `${pct}%` }}/></div>
    </div>
  );
}

export default function Post({ post }: { post: PostT }) {
  if (post.type === "routine") return (
    <PostShell post={post}>
      <h2 className="post-title">{post.title}</h2>
      <p className="post-body">{post.body}</p>
      <div className="exercises">
        {post.exercises.map((ex, i) => (
          <div key={i} className="exercise">
            <div className="n">{i + 1}</div>
            <div><div className="name">{ex.name}</div><div className="detail">{ex.detail}</div></div>
            <div className="reps">{ex.reps}</div>
            <div className="duration">{ex.duration}</div>
          </div>
        ))}
      </div>
    </PostShell>
  );
  if (post.type === "diet") return (
    <PostShell post={post}>
      <h2 className="post-title">{post.title}</h2>
      <p className="post-body">{post.body}</p>
      <div className="macros">{post.macros.map(m => <MacroBox key={m.label} {...m}/>)}</div>
      <div className="meal-list">
        {post.meals.map((m, i) => (
          <div className="meal" key={i}>
            <div className="when">{m.when}</div>
            <div><div className="name">{m.name}</div><div className="desc">{m.desc}</div></div>
            <div className="kcal">{m.kcal} kcal</div>
          </div>
        ))}
      </div>
    </PostShell>
  );
  return (
    <PostShell post={post}>
      <p className="post-body" style={{ marginTop: 6 }}>{post.body}</p>
      <div className="tip-quote">&ldquo;{post.quote}&rdquo;</div>
    </PostShell>
  );
}
