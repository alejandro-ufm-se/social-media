"use client";
import { Avatar } from "./Avatar";
import * as Icon from "./Icons";

type Item = { id: string; label: string; icon: React.ReactNode; badge?: string };

export default function Sidebar({ active, onSelect, me }: { active: string; onSelect: (id: string) => void; me: { name: string; handle: string } }) {
  const items: Item[] = [
    { id: "feed", label: "Feed", icon: <Icon.Home /> },
    { id: "discover", label: "Discover", icon: <Icon.Spark />, badge: "NEW" },
    { id: "routines", label: "Routines", icon: <Icon.Dumbbell /> },
    { id: "diets", label: "Diets", icon: <Icon.Apple /> },
    { id: "streaks", label: "Streaks", icon: <Icon.Flame /> },
    { id: "saved", label: "Saved", icon: <Icon.Bookmark /> },
    { id: "profile", label: "Profile", icon: <Icon.Trophy /> },
  ];
  return (
    <aside className="sidebar glass">
      <div className="me">
        <Avatar name={me.name} online shimmer />
        <div>
          <div className="name">{me.name}</div>
          <div className="handle">@{me.handle}</div>
        </div>
      </div>
      <nav className="nav">
        {items.map(it => (
          <a key={it.id} className={active === it.id ? "active" : ""} onClick={(e) => { e.preventDefault(); onSelect(it.id); }}>
            {it.icon}<span>{it.label}</span>
            {it.badge && <span className="badge">{it.badge}</span>}
          </a>
        ))}
      </nav>
      <button className="compose-btn"><Icon.Plus /> Share a routine</button>
    </aside>
  );
}
