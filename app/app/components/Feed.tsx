"use client";
import { useState } from "react";
import Composer from "./Composer";
import Post from "./Posts";
import * as Icon from "./Icons";
import { useCountUp } from "@/lib/useCountUp";
import { POSTS } from "@/lib/data";

export default function Feed({ me }: { me: { name: string } }) {
  const [filter, setFilter] = useState<"all"|"routine"|"diet"|"tip"|"friends">("all");
  const filters = [
    { id: "all"     as const, label: "For you",  icon: <Icon.Spark size={12}/> },
    { id: "routine" as const, label: "Routines", icon: <Icon.Dumbbell size={12}/> },
    { id: "diet"    as const, label: "Diets",    icon: <Icon.Apple size={12}/> },
    { id: "tip"     as const, label: "Tips",     icon: <Icon.Wave size={12}/> },
    { id: "friends" as const, label: "Friends" },
  ];
  const visible = POSTS.filter(p => filter === "all" || filter === "friends" || p.type === filter);
  const [feedRef, postsCount]   = useCountUp(POSTS.length * 412, 1300);
  const [streakRef, streakDays] = useCountUp(24, 1400);
  const [followersRef, followers] = useCountUp(8420, 1500);

  return (
    <main className="feed">
      <section className="hero glass">
        <div>
          <h1 className="title">Good morning, <em>Alex</em>. The water&apos;s calm today.</h1>
          <div className="sub">{POSTS.length} new posts from people you follow · 4 friends just hit a streak.</div>
        </div>
        <div className="stats">
          <div className="stat" ref={feedRef as React.RefObject<HTMLDivElement>}><div className="n">{postsCount}</div><div className="l">Min trained</div></div>
          <div className="stat" ref={streakRef as React.RefObject<HTMLDivElement>}><div className="n">{streakDays}</div><div className="l">Day streak</div></div>
          <div className="stat" ref={followersRef as React.RefObject<HTMLDivElement>}><div className="n">{followers.toLocaleString()}</div><div className="l">Followers</div></div>
        </div>
      </section>

      <div className="chips">
        {filters.map(f => (
          <button key={f.id} className={`chip ${filter === f.id ? "active" : ""}`} onClick={() => setFilter(f.id)}>
            {f.icon}{f.label}
          </button>
        ))}
      </div>

      <Composer me={me}/>
      {visible.map(p => <Post key={p.id} post={p}/>)}
    </main>
  );
}
