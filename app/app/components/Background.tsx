export default function Background() {
  return (
    <div className="bg-stage" aria-hidden>
      <div className="glow" />
      <svg className="wave w1" viewBox="0 0 2400 360" preserveAspectRatio="none">
        <defs><linearGradient id="wgrad1" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#a8d4e8" stopOpacity="0.7"/><stop offset="1" stopColor="#1474c4" stopOpacity="0"/></linearGradient></defs>
        <path fill="url(#wgrad1)" d="M0 200 C 200 120, 400 280, 600 200 S 1000 120, 1200 200 S 1600 280, 1800 200 S 2200 120, 2400 200 L2400 360 L0 360 Z"/>
      </svg>
      <svg className="wave w2" viewBox="0 0 2400 360" preserveAspectRatio="none">
        <defs><linearGradient id="wgrad2" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#ffffff" stopOpacity="0.5"/><stop offset="1" stopColor="#1474c4" stopOpacity="0"/></linearGradient></defs>
        <path fill="url(#wgrad2)" d="M0 220 C 250 140, 500 300, 750 220 S 1250 140, 1500 220 S 2000 300, 2250 220 L2400 220 L2400 360 L0 360 Z"/>
      </svg>
      <svg className="wave w3" viewBox="0 0 2400 360" preserveAspectRatio="none">
        <defs><linearGradient id="wgrad3" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#ffffff" stopOpacity="0.85"/><stop offset="1" stopColor="#a8d4e8" stopOpacity="0"/></linearGradient></defs>
        <path fill="url(#wgrad3)" d="M0 180 C 220 100, 440 260, 660 180 S 1100 100, 1320 180 S 1760 260, 1980 180 S 2400 100, 2400 180 L2400 360 L0 360 Z"/>
      </svg>
      <svg className="wave w4" viewBox="0 0 2400 360" preserveAspectRatio="none">
        <defs><linearGradient id="wgrad4" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#143d7e" stopOpacity="0"/><stop offset="1" stopColor="#06173a" stopOpacity="0.85"/></linearGradient></defs>
        <path fill="url(#wgrad4)" d="M0 240 C 200 160, 400 320, 600 240 S 1000 160, 1200 240 S 1600 320, 1800 240 S 2200 160, 2400 240 L2400 360 L0 360 Z"/>
      </svg>
      <div className="caustic" />
    </div>
  );
}
