"use client";
import { useState } from "react";
import * as Icon from "./Icons";
import { useCountUp } from "@/lib/useCountUp";

export function StreakWidget({ days, target = 7, weekly }: { days: number; target?: number; weekly: readonly string[] }) {
  const pct = Math.min(1, days / target);
  const C = 2 * Math.PI * 46;
  const [ringRef, animatedDays] = useCountUp(days, 1400);
  const offset = C * (1 - pct);
  return (
    <div className="widget glass">
      <h3><span className="live"/> Weekly streak</h3>
      <div className="ring-wrap">
        <div className="ring" ref={ringRef as React.RefObject<HTMLDivElement>}>
          <svg viewBox="0 0 110 110">
            <defs><linearGradient id="ringGrad" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#a8d4e8"/><stop offset="1" stopColor="#1474c4"/></linearGradient></defs>
            <circle className="track" cx="55" cy="55" r="46" fill="none" strokeWidth="8"/>
            <circle className="fill"  cx="55" cy="55" r="46" fill="none" strokeWidth="8" strokeDasharray={C} strokeDashoffset={offset}/>
          </svg>
          <div className="center"><div><div>{animatedDays}</div><small style={{display:"block", textAlign:"center"}}>day{animatedDays===1?"":"s"}</small></div></div>
        </div>
        <div className="ring-info">
          <div className="pct">You&apos;re on a <em>{days}-day</em> roll</div>
          <div className="desc">Train tomorrow to keep the wave going.</div>
        </div>
      </div>
      <div className="weekdays">
        {["M","T","W","T","F","S","S"].map((d, i) => (
          <div key={i} className={`weekday ${weekly[i]==="done"?"done":""} ${weekly[i]==="today"?"today":""}`}>
            <span className="pip"/><span>{d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TrendingWidget({ items }: { items: { id: string; name: string; by: string; cat: string; saves: string }[] }) {
  return (
    <div className="widget glass">
      <h3><Icon.Flame size={12}/> Trending routines</h3>
      <div className="trending">
        {items.map((t, i) => (
          <div className="trend" key={t.id}>
            <div className="rank">{i + 1}</div>
            <div><div className="name">{t.name}</div><div className="by">by @{t.by} · {t.cat}</div></div>
            <div className="saves"><Icon.Bookmark size={11}/> {t.saves}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HydrationWidget() {
  const TARGET = 2500;
  const [ml, setMl] = useState(1450);
  const pct = Math.min(1, ml / TARGET);
  const [boxRef, animMl] = useCountUp(ml, 1200);
  const add = (n: number) => setMl(v => Math.min(TARGET + 500, v + n));
  return (
    <div className="widget glass">
      <h3><Icon.Drop size={12}/> Hydration today</h3>
      <div className="hydro">
        <div className="bottle"><div className="water" style={{ height: `${pct * 100}%` }}/></div>
        <div className="hydro-info" ref={boxRef as React.RefObject<HTMLDivElement>}>
          <div className="big"><em>{animMl}</em> <span style={{ fontSize: 14, color: "rgba(234,243,248,0.6)" }}>/ {TARGET}ml</span></div>
          <div className="desc">{Math.round(pct * 100)}% of your goal · {Math.max(0, TARGET - ml)}ml to go</div>
        </div>
      </div>
      <div className="hydro-add">
        <button onClick={() => add(150)}>+150</button>
        <button onClick={() => add(250)}>+250</button>
        <button onClick={() => add(500)}>+500</button>
        <button onClick={() => setMl(0)}>reset</button>
      </div>
    </div>
  );
}

function MacroRow({ label, cur, max, unit }: { label: string; cur: number; max: number; unit: string }) {
  const [r, v] = useCountUp(cur, 1100);
  return (
    <div className="mw" ref={r as React.RefObject<HTMLDivElement>}>
      <div className="label">{label}</div>
      <div className="barwrap"><span style={{ width: `${(cur / max) * 100}%` }}/></div>
      <div className="num">{v}<span style={{ opacity: .5 }}>/{max}{unit==="kcal"?"":""}</span></div>
    </div>
  );
}
export function MacrosWidget() {
  const macros = [
    { label: "Protein",  cur: 132, max: 160, unit: "g" },
    { label: "Carbs",    cur: 210, max: 280, unit: "g" },
    { label: "Fats",     cur:  58, max:  80, unit: "g" },
    { label: "Calories", cur:1820, max:2400, unit: "kcal" },
  ];
  return (
    <div className="widget glass">
      <h3><Icon.Apple size={12}/> Today&apos;s macros</h3>
      <div className="mw-list">{macros.map(m => <MacroRow key={m.label} {...m}/>)}</div>
    </div>
  );
}

export function CalendarWidget() {
  const today = 17;
  const has = new Set([3, 5, 8, 10, 12, 15, 17, 20, 22, 25]);
  const cells: { day: number; muted: boolean }[] = [];
  const start = -1;
  for (let i = 0; i < 35; i++) {
    const day = i + start + 1;
    const muted = day < 1 || day > 30;
    cells.push({ day: muted ? (day < 1 ? 30 + day : day - 30) : day, muted });
  }
  return (
    <div className="widget glass">
      <h3><Icon.Cal size={12}/> April · workout calendar</h3>
      <div className="cal">
        <div className="cal-head">
          <span>April 2026</span>
          <div className="arrows"><button>‹</button><button>›</button></div>
        </div>
        <div className="cal-grid">
          {["M","T","W","T","F","S","S"].map((d, i) => <div key={i} className="dow">{d}</div>)}
          {cells.map((c, i) => (
            <div key={i} className={`cal-day ${c.muted?"muted":""} ${has.has(c.day)&&!c.muted?"has":""} ${c.day===today&&!c.muted?"today":""}`}>{c.day}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
