"use client";
import { useState } from "react";
import { Avatar } from "./Avatar";
import * as Icon from "./Icons";

export default function Composer({ me }: { me: { name: string } }) {
  const [type, setType] = useState<"routine"|"diet"|"tip">("routine");
  const [text, setText] = useState("");
  const types = [
    { id: "routine" as const, label: "Routine",   icon: <Icon.Dumbbell size={14}/> },
    { id: "diet"    as const, label: "Meal plan", icon: <Icon.Apple size={14}/> },
    { id: "tip"     as const, label: "Tip",       icon: <Icon.Spark size={14}/> },
  ];
  const placeholder = type === "routine" ? "Share what you trained today — sets, reps, the burn…" : type === "diet" ? "What did you eat today? Drop a meal plan or recipe…" : "Drop a tip the community needs to hear.";
  return (
    <div className="composer glass glass-strong">
      <Avatar name={me.name} shimmer />
      <div>
        <textarea placeholder={placeholder} value={text} onChange={e => setText(e.target.value)} rows={2}/>
        <div className="composer-row">
          <div className="types">
            {types.map(t => (
              <button key={t.id} className={`type-btn ${type === t.id ? "active" : ""}`} onClick={() => setType(t.id)}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
          <button className="post-btn">Post</button>
        </div>
      </div>
    </div>
  );
}
