"use client";
import { useState } from "react";
import Background from "@/components/Background";
import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";
import { StreakWidget, TrendingWidget, HydrationWidget, MacrosWidget, CalendarWidget } from "@/components/Widgets";
import { Avatar } from "@/components/Avatar";
import * as Icon from "@/components/Icons";
import { ME, TRENDING, WEEKLY } from "@/lib/data";
import { BACKEND_URL } from "@/lib/constants";

export default function Home() {
  const [active, setActive] = useState("feed");
  const [healthResult, setHealthResult] = useState<string>("");
  const [healthLoading, setHealthLoading] = useState(false);

  const checkHealth = async () => {
    setHealthLoading(true);
    setHealthResult("");
    try {
      const res = await fetch(`${BACKEND_URL}/health/v1/healthcheck`);
      const text = await res.text();
      try {
        setHealthResult(JSON.stringify(JSON.parse(text), null, 2));
      } catch {
        setHealthResult(text);
      }
    } catch (err) {
      setHealthResult(`Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setHealthLoading(false);
    }
  };
  return (
    <>
      <Background />
      <div className="app">
        <header className="topbar">
          <div className="brand">
            <div className="logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="#0e2a5b" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/>
                <path d="M2 17c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/>
              </svg>
            </div>
            FlowFeed
          </div>
          <div className="search">
            <Icon.Search/>
            <input placeholder="Search routines, diets, people…"/>
            <span className="kbd">⌘K</span>
          </div>
          <div className="topbar-right">
            <button
              onClick={checkHealth}
              disabled={healthLoading}
              style={{
                background: "#22c55e",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 13,
                cursor: healthLoading ? "not-allowed" : "pointer",
                opacity: healthLoading ? 0.7 : 1,
              }}
            >
              {healthLoading ? "Checking…" : "Check"}
            </button>
            <button className="icon-btn" title="Messages"><Icon.Msg/></button>
            <button className="icon-btn" title="Notifications"><Icon.Bell/><span className="dot"/></button>
            <div className="avatar-pill">
              <Avatar name={ME.name} size={32} online/>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{ME.name.split(" ")[0]}</span>
              <Icon.Chev/>
            </div>
          </div>
        </header>

        {healthResult && (
          <div
            style={{
              margin: "12px 24px 0",
              padding: 12,
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.4)",
              borderRadius: 8,
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 13,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {healthResult}
          </div>
        )}

        <div className="layout">
          <Sidebar active={active} onSelect={setActive} me={ME}/>
          <Feed me={ME}/>
          <aside className="rail">
            <StreakWidget days={24} target={28} weekly={WEEKLY}/>
            <TrendingWidget items={TRENDING}/>
            <HydrationWidget/>
            <MacrosWidget/>
            <CalendarWidget/>
          </aside>
        </div>
      </div>
    </>
  );
}
