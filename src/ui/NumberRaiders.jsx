import { useState, useEffect, useRef } from "react";
import {
  getChildrenByParent,
  getStudentsByGrade,
  getUsersByRole,
  resetAchievements,
} from "../firebase/userQueries";
import { useAuth } from "../firebase/AuthContext";

const Icon = ({ name, size = 20, color = "currentColor" }) => {
  const icons = {
    hat: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ imageRendering: "pixelated" }}
      >
        <rect x="3" y="8" width="10" height="2" fill={color} />
        <rect x="2" y="10" width="12" height="1" fill={color} />
        <rect x="5" y="4" width="6" height="4" fill={color} />
        <rect x="4" y="5" width="1" height="3" fill={color} />
        <rect x="11" y="5" width="1" height="3" fill={color} />
        <rect x="1" y="10" width="1" height="1" fill={color} />
        <rect x="14" y="10" width="1" height="1" fill={color} />
        <rect x="3" y="11" width="10" height="1" fill={color} opacity="0.5" />
      </svg>
    ),
    chest: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ imageRendering: "pixelated" }}
      >
        <rect x="2" y="5" width="12" height="8" fill={color} />
        <rect x="2" y="5" width="12" height="2" fill={color} opacity="0.7" />
        <rect x="3" y="6" width="10" height="1" fill="rgba(0,0,0,0.3)" />
        <rect x="7" y="8" width="2" height="2" fill="#c89800" />
        <rect x="2" y="4" width="12" height="2" fill={color} opacity="0.9" />
        <rect x="1" y="5" width="1" height="8" fill={color} opacity="0.6" />
        <rect x="14" y="5" width="1" height="8" fill={color} opacity="0.6" />
      </svg>
    ),
    pickaxe: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ imageRendering: "pixelated" }}
      >
        <rect x="2" y="2" width="3" height="2" fill={color} />
        <rect x="1" y="3" width="2" height="2" fill={color} />
        <rect x="3" y="4" width="2" height="2" fill={color} />
        <rect x="4" y="5" width="2" height="2" fill={color} opacity="0.7" />
        <rect x="5" y="6" width="2" height="2" fill={color} opacity="0.6" />
        <rect x="6" y="7" width="2" height="2" fill={color} opacity="0.5" />
        <rect x="7" y="8" width="2" height="2" fill={color} opacity="0.45" />
        <rect x="8" y="9" width="2" height="2" fill={color} opacity="0.4" />
        <rect x="9" y="10" width="2" height="2" fill={color} opacity="0.35" />
        <rect x="10" y="11" width="3" height="2" fill={color} opacity="0.3" />
        <rect x="11" y="3" width="3" height="3" fill={color} />
        <rect x="12" y="2" width="2" height="2" fill={color} />
      </svg>
    ),
    snake: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ imageRendering: "pixelated" }}
      >
        <rect x="2" y="8" width="3" height="2" fill={color} />
        <rect x="5" y="7" width="2" height="3" fill={color} />
        <rect x="7" y="6" width="3" height="2" fill={color} />
        <rect x="10" y="6" width="2" height="4" fill={color} />
        <rect x="8" y="9" width="3" height="2" fill={color} />
        <rect x="6" y="10" width="3" height="2" fill={color} />
        <rect x="4" y="11" width="3" height="2" fill={color} />
        <rect x="1" y="8" width="2" height="2" fill={color} />
        <rect x="1" y="7" width="1" height="1" fill={color} />
        <rect x="12" y="7" width="2" height="1" fill={color} />
        <rect x="13" y="6" width="1" height="1" fill={color} />
      </svg>
    ),
    gem: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ imageRendering: "pixelated" }}
      >
        <rect x="5" y="2" width="6" height="2" fill={color} />
        <rect x="3" y="4" width="2" height="2" fill={color} />
        <rect x="11" y="4" width="2" height="2" fill={color} />
        <rect x="2" y="6" width="12" height="1" fill={color} />
        <rect x="3" y="7" width="10" height="2" fill={color} opacity="0.9" />
        <rect x="4" y="9" width="8" height="2" fill={color} opacity="0.7" />
        <rect x="5" y="11" width="6" height="2" fill={color} opacity="0.5" />
        <rect x="7" y="13" width="2" height="1" fill={color} opacity="0.4" />
        <rect x="6" y="4" width="4" height="2" fill="rgba(255,255,255,0.3)" />
      </svg>
    ),
    map: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ imageRendering: "pixelated" }}
      >
        <rect x="2" y="2" width="12" height="12" fill={color} opacity="0.15" />
        <rect
          x="2"
          y="2"
          width="12"
          height="12"
          fill="none"
          stroke={color}
          strokeWidth="1"
        />
        <rect x="1" y="3" width="1" height="10" fill={color} />
        <rect x="14" y="3" width="1" height="10" fill={color} />
        <rect x="5" y="2" width="1" height="12" fill={color} opacity="0.5" />
        <rect x="10" y="2" width="1" height="12" fill={color} opacity="0.5" />
        <rect x="2" y="6" width="12" height="1" fill={color} opacity="0.5" />
        <rect x="2" y="10" width="12" height="1" fill={color} opacity="0.5" />
        <rect x="7" y="4" width="3" height="3" fill={color} opacity="0.8" />
        <rect x="8" y="3" width="1" height="1" fill={color} />
      </svg>
    ),
    sword: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ imageRendering: "pixelated" }}
      >
        <rect x="7" y="1" width="2" height="10" fill={color} />
        <rect x="8" y="2" width="1" height="9" fill="rgba(255,255,255,0.25)" />
        <rect x="4" y="10" width="8" height="2" fill={color} opacity="0.8" />
        <rect x="7" y="12" width="2" height="3" fill={color} opacity="0.7" />
        <rect x="6" y="13" width="4" height="1" fill={color} opacity="0.5" />
      </svg>
    ),
    scroll: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ imageRendering: "pixelated" }}
      >
        <rect x="3" y="2" width="10" height="12" fill={color} opacity="0.2" />
        <rect
          x="3"
          y="2"
          width="10"
          height="12"
          fill="none"
          stroke={color}
          strokeWidth="1"
        />
        <rect x="2" y="3" width="2" height="10" fill={color} opacity="0.6" />
        <rect x="12" y="3" width="2" height="10" fill={color} opacity="0.6" />
        <rect x="5" y="5" width="6" height="1" fill={color} opacity="0.8" />
        <rect x="5" y="7" width="6" height="1" fill={color} opacity="0.8" />
        <rect x="5" y="9" width="4" height="1" fill={color} opacity="0.8" />
      </svg>
    ),
    star: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ imageRendering: "pixelated" }}
      >
        <rect x="7" y="1" width="2" height="3" fill={color} />
        <rect x="7" y="12" width="2" height="3" fill={color} />
        <rect x="1" y="7" width="3" height="2" fill={color} />
        <rect x="12" y="7" width="3" height="2" fill={color} />
        <rect x="3" y="3" width="2" height="2" fill={color} />
        <rect x="11" y="3" width="2" height="2" fill={color} />
        <rect x="3" y="11" width="2" height="2" fill={color} />
        <rect x="11" y="11" width="2" height="2" fill={color} />
        <rect x="6" y="4" width="4" height="8" fill={color} />
        <rect x="4" y="6" width="8" height="4" fill={color} />
      </svg>
    ),
    shield: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ imageRendering: "pixelated" }}
      >
        <rect x="3" y="2" width="10" height="2" fill={color} />
        <rect x="2" y="4" width="12" height="6" fill={color} />
        <rect x="3" y="10" width="10" height="2" fill={color} />
        <rect x="4" y="12" width="8" height="2" fill={color} opacity="0.8" />
        <rect x="6" y="14" width="4" height="1" fill={color} opacity="0.6" />
        <rect x="7" y="15" width="2" height="1" fill={color} opacity="0.4" />
        <rect x="4" y="5" width="3" height="3" fill="rgba(255,255,255,0.15)" />
      </svg>
    ),
    user: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ imageRendering: "pixelated" }}
      >
        <rect x="5" y="2" width="6" height="5" fill={color} />
        <rect x="4" y="3" width="1" height="4" fill={color} />
        <rect x="11" y="3" width="1" height="4" fill={color} />
        <rect x="5" y="7" width="6" height="2" fill={color} opacity="0.8" />
        <rect x="3" y="9" width="10" height="5" fill={color} opacity="0.7" />
        <rect x="2" y="10" width="2" height="4" fill={color} opacity="0.6" />
        <rect x="12" y="10" width="2" height="4" fill={color} opacity="0.6" />
        <rect x="6" y="3" width="4" height="1" fill="rgba(255,255,255,0.2)" />
      </svg>
    ),
    trophy: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ imageRendering: "pixelated" }}
      >
        <rect x="4" y="2" width="8" height="6" fill={color} />
        <rect x="3" y="3" width="2" height="4" fill={color} opacity="0.7" />
        <rect x="11" y="3" width="2" height="4" fill={color} opacity="0.7" />
        <rect x="2" y="3" width="1" height="3" fill={color} opacity="0.5" />
        <rect x="13" y="3" width="1" height="3" fill={color} opacity="0.5" />
        <rect x="6" y="8" width="4" height="3" fill={color} opacity="0.8" />
        <rect x="4" y="11" width="8" height="2" fill={color} opacity="0.7" />
        <rect x="3" y="13" width="10" height="1" fill={color} opacity="0.6" />
        <rect x="5" y="3" width="3" height="2" fill="rgba(255,255,255,0.25)" />
      </svg>
    ),
  };
  return icons[name] || null;
};

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; image-rendering: pixelated; }

  :root {
    --black:      #0d0a06;
    --darkest:    #1a1208;
    --dark:       #221a0c;
    --panel:      #2a1e0e;
    --panel2:     #1e1508;
    --sand:       #c8a456;
    --sand2:      #9a7a38;
    --sand3:      #e0bc78;
    --leather:    #7a4e28;
    --leather2:   #5a3618;
    --parch:      #d4b878;
    --parch2:     #b89850;
    --border:     #5a4020;
    --border2:    #7a5a30;
    --white:      #e8dcc0;
    --offwhite:   #c8b890;
    --gray:       #8a7050;
    --red:        #c03818;
    --red2:       #e04828;
    --green:      #5a8c28;
    --green2:     #78b840;
    --rust:       #a04828;
    --rust2:      #c86030;
    --teal:       #287860;
    --teal2:      #38a880;
    --hp-green:   #60a030;
    --hp-red:     #c02818;
    --font-pixel: 'Press Start 2P', monospace;
    --font-vt:    'VT323', monospace;
  }

  /* ── PIXEL BOXES ── */
  .px-box {
    background: var(--panel);
    border: 4px solid var(--border2);
    box-shadow: 4px 4px 0 0 var(--black), inset 2px 2px 0 0 rgba(255,220,150,0.05), inset -2px -2px 0 0 rgba(0,0,0,0.35);
  }
  .px-box-dark {
    background: var(--panel2);
    border: 4px solid var(--border);
    box-shadow: 4px 4px 0 0 var(--black);
  }

  /* ── PIXEL BUTTONS ── */
  .px-btn {
    font-family: var(--font-pixel);
    font-size: 9px; letter-spacing: 0.5px;
    padding: 10px 16px; cursor: pointer;
    border: none; outline: none;
    display: inline-flex; align-items: center; justify-content: center; gap: 6px;
    transition: transform 0.06s, box-shadow 0.06s;
    line-height: 1.4;
  }
  .px-btn:active { transform: translate(3px,3px); box-shadow: none !important; }

  .px-btn-gold {
    background: var(--sand);
    color: var(--black);
    box-shadow: 4px 4px 0 0 var(--sand2);
    border: 2px solid var(--sand2);
  }
  .px-btn-gold:hover { background: var(--sand3); }

  .px-btn-leather {
    background: var(--leather);
    color: var(--white);
    box-shadow: 4px 4px 0 0 var(--leather2);
    border: 2px solid var(--leather2);
  }
  .px-btn-leather:hover { background: #8a5e38; }

  .px-btn-red {
    background: var(--red);
    color: var(--white);
    box-shadow: 4px 4px 0 0 #601808;
    border: 2px solid #801808;
  }
  .px-btn-red:hover { background: var(--red2); }

  .px-btn-ghost {
    background: var(--panel2);
    color: var(--gray);
    box-shadow: 3px 3px 0 0 var(--black);
    border: 2px solid var(--border);
    font-size: 8px; padding: 8px 12px;
  }
  .px-btn-ghost:hover { color: var(--white); border-color: var(--border2); }

  .px-btn-sm { font-size: 7px; padding: 7px 10px; box-shadow: 3px 3px 0 0 var(--black); }

  /* ── DIALOGUE BOX ── */
  .dialogue-box {
    background: var(--darkest);
    border: 4px solid var(--offwhite);
    box-shadow: 4px 4px 0 0 var(--black), inset 2px 2px 0 0 rgba(255,220,150,0.04);
    padding: 16px 20px; position: relative;
  }
  .dialogue-box::before {
    content: ''; position: absolute; inset: 4px;
    border: 2px solid var(--border); pointer-events: none;
  }

  /* ── STAT BAR ── */
  .stat-bar-track {
    height: 14px; background: #060401;
    border: 2px solid var(--border);
    box-shadow: inset 2px 2px 0 0 rgba(0,0,0,0.6);
    position: relative; overflow: hidden;
  }
  .stat-bar-fill {
    height: 100%; transition: width 0.4s steps(8); position: relative;
  }
  .stat-bar-fill::after {
    content: ''; position: absolute;
    top: 1px; left: 2px; right: 2px; height: 3px;
    background: rgba(255,255,255,0.22);
  }
  .bar-sand    { background: var(--sand); }
  .bar-green   { background: var(--hp-green); }
  .bar-red     { background: var(--hp-red); }
  .bar-teal    { background: var(--teal); }
  .bar-rust    { background: var(--rust); }

  /* ── BADGE ── */
  .px-badge {
    font-family: var(--font-pixel); font-size: 7px;
    padding: 4px 8px; border: 2px solid; display: inline-block; letter-spacing: 0.5px;
  }
  .badge-sand   { background: rgba(200,164,86,0.18);  color: var(--sand);   border-color: var(--sand2); }
  .badge-green  { background: rgba(90,140,40,0.18);   color: var(--green2); border-color: var(--green); }
  .badge-teal   { background: rgba(40,120,96,0.18);   color: var(--teal2);  border-color: var(--teal); }
  .badge-red    { background: rgba(192,56,24,0.18);   color: var(--red2);   border-color: var(--red); }
  .badge-rust   { background: rgba(160,72,40,0.18);   color: var(--rust2);  border-color: var(--rust); }

  /* ── INPUT ── */
  .px-input {
    font-family: var(--font-pixel); font-size: 13px;
    background: #0a0702;
    border: 4px solid var(--border2);
    box-shadow: inset 2px 2px 0 0 var(--black), 3px 3px 0 0 var(--black);
    color: var(--sand); padding: 12px 16px;
    outline: none; width: 100%; text-align: center;
    caret-color: var(--sand); transition: border-color 0.1s;
  }
  .px-input:focus { border-color: var(--sand); }
  .px-input::placeholder { color: var(--border2); }
  .px-input.correct { border-color: var(--green); color: var(--green2); animation: flashGreen 0.3s steps(3); }
  .px-input.wrong   { border-color: var(--red);   color: var(--red2);   animation: pixelShake 0.3s steps(4); }

  @keyframes flashGreen { 0%,100%{background:#0a0702} 50%{background:#0a1a06} }
  @keyframes pixelShake { 0%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} 100%{transform:translateX(0)} }
  @keyframes blink      { 0%,100%{opacity:1} 50%{opacity:0} }

  /* ── SELECT ── */
  select {
    font-family: var(--font-pixel); font-size: 8px;
    background: var(--panel2); border: 3px solid var(--border2);
    color: var(--white); padding: 7px 10px; cursor: pointer;
    box-shadow: 3px 3px 0 0 var(--black); outline: none; appearance: none;
  }

  /* ── GAME ROOT ── */
  .game-root {
    min-height: 100vh;
    background:
      repeating-linear-gradient(0deg,  rgba(200,164,86,0.025) 0px, rgba(200,164,86,0.025) 1px, transparent 1px, transparent 16px),
      repeating-linear-gradient(90deg, rgba(200,164,86,0.025) 0px, rgba(200,164,86,0.025) 1px, transparent 1px, transparent 16px),
      #0d0a06;
    font-family: var(--font-vt);
    color: var(--white);
  }
  .game-root::after {
    content: ''; position: fixed; inset: 0;
    background: repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px);
    pointer-events: none; z-index: 9999;
  }

  /* ── NAV ── */
  .nav {
    background: var(--darkest);
    border-bottom: 4px solid var(--border2);
    box-shadow: 0 4px 0 0 var(--black);
    padding: 0 24px; height: 56px;
    display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 0; z-index: 100;
  }
  .nav-logo {
    font-family: var(--font-pixel); font-size: 11px;
    color: var(--sand);
    text-shadow: 1px 1px 0 var(--sand2);
    letter-spacing: 1px; line-height: 1.5;
  }
  .nav-logo small { display: block; font-size: 7px; color: var(--gray); letter-spacing: 2px; }

  .profile-btn {
    width: 40px; height: 40px;
    background: var(--leather);
    border: 3px solid var(--border2);
    box-shadow: 3px 3px 0 0 var(--black);
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    font-family: var(--font-pixel); font-size: 12px; color: var(--sand);
    transition: transform 0.06s;
  }
  .profile-btn:hover { border-color: var(--sand); }
  .profile-btn:active { transform: translate(2px,2px); box-shadow: 1px 1px 0 0 var(--black); }

  .dropdown {
    position: absolute; top: 48px; right: 0;
    background: var(--darkest);
    border: 4px solid var(--border2);
    box-shadow: 6px 6px 0 0 var(--black);
    min-width: 200px; z-index: 200;
    animation: pixelDrop 0.12s steps(3);
  }
  @keyframes pixelDrop { from{transform:translateY(-12px);opacity:0} to{transform:translateY(0);opacity:1} }

  .dropdown-item {
    display: block; width: 100%; padding: 12px 16px;
    font-family: var(--font-pixel); font-size: 8px;
    color: var(--white); background: none; border: none; cursor: pointer;
    text-align: left; border-bottom: 2px solid var(--border); letter-spacing: 0.5px;
    transition: background 0.05s;
  }
  .dropdown-item:last-child { border-bottom: none; }
  .dropdown-item:hover { background: var(--leather); color: var(--sand); }

  /* ── SCREEN NAV ── */
  .screen-nav {
    display: flex; gap: 12px; flex-wrap: wrap;
    padding: 10px 24px; border-bottom: 2px solid var(--border);
    background: var(--panel2);
    justify-content: center;
  }
  .snav-btn {
    font-family: var(--font-pixel); font-size: 7px;
    padding: 6px 10px; cursor: pointer; border: 2px solid;
    letter-spacing: 0.5px; transition: all 0.06s;
    box-shadow: 2px 2px 0 0 var(--black);
  }
  .snav-btn.active { background: var(--sand); color: var(--black); border-color: var(--sand2); }
  .snav-btn:not(.active) { background: var(--panel2); color: var(--gray); border-color: var(--border); }
  .snav-btn:not(.active):hover { color: var(--white); border-color: var(--border2); }

  /* ── LAYOUT ── */
  .container { max-width: 960px; margin: 0 auto; padding: 0 20px; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
  .grid-4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 10px; }
  @media(max-width:700px){ .grid-2,.grid-3,.grid-4 { grid-template-columns: 1fr; } }
  .flex { display: flex; }
  .flex-center { display: flex; align-items: center; justify-content: center; }
  .flex-between { display: flex; align-items: center; justify-content: space-between; }
  .gap-8{gap:8px} .gap-12{gap:12px} .gap-16{gap:16px}
  .mt-8{margin-top:8px} .mt-12{margin-top:12px}
  .mt-16{margin-top:16px} .mt-20{margin-top:20px} .mt-24{margin-top:24px}

  /* ── SECTION HEADER ── */
  .section-header {
    font-family: var(--font-pixel); font-size: 10px;
    color: var(--sand); letter-spacing: 1px;
    padding-bottom: 8px; border-bottom: 3px solid var(--border);
    margin-bottom: 16px;
    text-shadow: 1px 1px 0 var(--sand2);
  }

  /* ── DIVIDER ── */
  .px-divider { display: flex; align-items: center; gap: 8px; margin: 16px 0; }
  .px-divider-line { flex: 1; height: 2px; background: var(--border); }
  .px-divider-icon { font-family: var(--font-pixel); font-size: 10px; color: var(--sand); }

  /* ── STAT CARD ── */
  .stat-card {
    background: var(--panel2);
    border: 3px solid var(--border);
    box-shadow: 3px 3px 0 0 var(--black);
    padding: 12px 10px; text-align: center;
  }
  .stat-value {
    font-family: var(--font-pixel); font-size: 18px;
    color: var(--sand);
    text-shadow: 1px 1px 0 var(--sand2);
    line-height: 1;
  }
  .stat-label {
    font-family: var(--font-pixel); font-size: 7px;
    color: var(--gray); margin-top: 6px; letter-spacing: 0.5px;
  }

  /* ── OVERLAY / MODAL ── */
  .overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.88);
    display: flex; align-items: center; justify-content: center;
    z-index: 500; animation: fadeIn 0.15s steps(3);
  }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }

  .achievement-popup {
    max-width: 420px; width: 90%;
    background: var(--darkest);
    border: 6px solid var(--sand);
    box-shadow: 8px 8px 0 0 var(--sand2), 16px 16px 0 0 var(--black);
    padding: 32px 28px; text-align: center;
    animation: achievePop 0.2s steps(4); position: relative;
  }
  @keyframes achievePop { from{transform:scale(0.5);opacity:0} to{transform:scale(1);opacity:1} }
  .achievement-popup::before {
    content: ''; position: absolute; inset: 6px;
    border: 2px solid rgba(200,164,86,0.2); pointer-events: none;
  }
  .achieve-icon {
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 16px;
    animation: iconBounce 0.6s steps(4) infinite alternate;
  }
  @keyframes iconBounce { from{transform:translateY(0)} to{transform:translateY(-6px)} }

  /* ── TOGGLE ── */
  .toggle-group { display: flex; border: 3px solid var(--border2); box-shadow: 4px 4px 0 0 var(--black); }
  .toggle-btn {
    flex: 1; padding: 10px 12px;
    font-family: var(--font-pixel); font-size: 8px; letter-spacing: 0.5px;
    cursor: pointer; border: none; transition: all 0.06s; line-height: 1.5;
  }
  .toggle-btn.active { background: var(--sand); color: var(--black); }
  .toggle-btn:not(.active) { background: var(--panel2); color: var(--gray); border-right: 2px solid var(--border); }
  .toggle-btn:not(.active):hover { background: var(--leather); color: var(--white); }

  /* ── PROBLEM PANEL ── */
  .problem-panel {
    background: #060401;
    border: 6px solid var(--offwhite);
    box-shadow: 6px 6px 0 0 var(--black), inset 3px 3px 0 0 rgba(200,164,86,0.04);
    padding: 40px 28px; text-align: center; position: relative;
  }
  .problem-panel::before {
    content: ''; position: absolute; inset: 6px;
    border: 2px solid var(--border2); pointer-events: none;
  }
  .problem-text {
    font-family: var(--font-pixel); font-size: 32px;
    color: var(--parch);
    text-shadow: 1px 1px 0 var(--sand2);
    letter-spacing: 4px; line-height: 1.4;
  }
  .problem-flavor {
    font-family: var(--font-vt); font-size: 20px; color: var(--gray);
    margin-bottom: 16px; letter-spacing: 1px;
  }

  /* ── STUDENT ROW ── */
  .student-row {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 0; border-bottom: 2px solid var(--border);
  }
  .student-row:last-child { border-bottom: none; }
  .student-avatar {
    width: 34px; height: 34px;
    background: var(--leather); border: 3px solid var(--border2);
    box-shadow: 2px 2px 0 0 var(--black);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-pixel); font-size: 9px; color: var(--sand); flex-shrink: 0;
  }

  /* ── TABS ── */
  .tab-group { display: flex; border-bottom: 3px solid var(--border); margin-bottom: 20px; }
  .tab {
    font-family: var(--font-pixel); font-size: 8px; padding: 10px 16px;
    cursor: pointer; border: none; background: none;
    color: var(--gray); border-bottom: 3px solid transparent; margin-bottom: -3px;
    letter-spacing: 0.5px; transition: all 0.1s;
  }
  .tab.active { color: var(--sand); border-bottom-color: var(--sand); background: rgba(200,164,86,0.06); }
  .tab:hover:not(.active) { color: var(--white); }

  /* ── HUD ── */
  .hud-bar { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
  .hud-label { font-family: var(--font-pixel); font-size: 8px; color: var(--gray); margin-bottom: 3px; letter-spacing: 0.5px; }

  /* ── PORTRAIT ── */
  .portrait {
    width: 56px; height: 56px;
    background: var(--leather);
    border: 4px solid var(--border2);
    box-shadow: 3px 3px 0 0 var(--black);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  /* ── MENU LIST ── */
  .menu-list { display: flex; flex-direction: column; gap: 2px; }
  .menu-item {
    display: flex; align-items: center; gap: 8px;
    padding: 10px 14px;
    font-family: var(--font-pixel); font-size: 8px;
    cursor: pointer; border: 2px solid transparent;
    transition: all 0.06s; letter-spacing: 0.5px;
  }
  .menu-item:hover, .menu-item.selected {
    background: rgba(200,164,86,0.1);
    border-color: var(--border2); color: var(--sand);
  }
  .menu-item .arrow { color: var(--sand); opacity: 0; font-size: 9px; }
  .menu-item:hover .arrow, .menu-item.selected .arrow { opacity: 1; }

  .vt { font-family: var(--font-vt); }
  .blink { animation: blink 1s step-end infinite; }
  .px-stars { font-family: var(--font-pixel); font-size: 8px; color: var(--sand); letter-spacing: 4px; }
`;

const STUDENTS = [
  {
    id: 1,
    name: "A. CARTER",
    init: "AC",
    level: 7,
    xp: 840,
    acc: 87,
    streak: 5,
  },
  {
    id: 2,
    name: "M. PATEL",
    init: "MP",
    level: 5,
    xp: 520,
    acc: 92,
    streak: 12,
  },
  { id: 3, name: "J. LEE", init: "JL", level: 9, xp: 1100, acc: 78, streak: 3 },
  {
    id: 4,
    name: "S. RIVERA",
    init: "SR",
    level: 4,
    xp: 320,
    acc: 95,
    streak: 8,
  },
];

const ACHIEVEMENTS = [
  {
    id: 1,
    icon: "chest",
    name: "ARTIFACT HUNTER",
    desc: "10 correct in a row",
    earned: true,
  },
  {
    id: 2,
    icon: "pickaxe",
    name: "TEMPLE DELVER",
    desc: "Reached Level 5",
    earned: true,
  },
  {
    id: 3,
    icon: "snake",
    name: "SNAKE CHARMER",
    desc: "Mastered multiply",
    earned: false,
  },
  {
    id: 4,
    icon: "gem",
    name: "JEWEL OF NILE",
    desc: "100% accuracy",
    earned: false,
  },
  {
    id: 5,
    icon: "map",
    name: "THE LOST ARK",
    desc: "All zones complete",
    earned: false,
  },
  {
    id: 6,
    icon: "trophy",
    name: "DR. JONES",
    desc: "Reach Level 10",
    earned: false,
  },
];

const SHOW_ACHIEVEMENTS_UI = false;

function initialsFor(name = "", email = "") {
  const source = name || email || "Explorer";
  return source
    .split(/[ ._@-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function normalizeStudentProfile(user, index = 0) {
  const displayName = user.displayName || user.name || user.email || `Student ${index + 1}`;
  const accuracy = user.accuracy ?? user.acc ?? 0;

  return {
    id: user.id || user.userID || index + 1,
    name: displayName.toUpperCase(),
    init: initialsFor(displayName, user.email),
    level: Number(user.level || user.grade || 1),
    xp: Number(user.xp || 0),
    acc: Number(accuracy),
    streak: Number(user.streak || 0),
    achievements: user.achievements || [],
  };
}

function screenForRole(role) {
  return role === "parent" ? "parent" : role === "teacher" ? "teacher" : "student";
}

function xpForLevel(level) {
  return Math.max(0, (Number(level || 1) - 1) * 200);
}

function QueryNotice({ loading, error, fallback }) {
  if (!loading && !error && !fallback) return null;

  return (
    <div
      className="px-badge badge-rust"
      style={{ marginBottom: 12, lineHeight: 1.6 }}
    >
      {loading
        ? "SYNCING FIREBASE..."
        : error
          ? "FIREBASE UNAVAILABLE - SHOWING LOCAL DATA"
          : "NO FIREBASE DATA YET - SHOWING LOCAL DATA"}
    </div>
  );
}

function PixelBar({ pct, colorClass = "bar-sand", label, showPct = true }) {
  return (
    <div>
      {label && (
        <div className="flex-between mt-8" style={{ marginBottom: 4 }}>
          <span
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: 7,
              color: "var(--gray)",
              letterSpacing: "0.5px",
            }}
          >
            {label}
          </span>
          {showPct && (
            <span
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: 7,
                color: "var(--sand)",
              }}
            >
              {pct}%
            </span>
          )}
        </div>
      )}
      <div className="stat-bar-track">
        <div
          className={`stat-bar-fill ${colorClass}`}
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
    </div>
  );
}

function StudentRow({ s, showReset, onReset }) {
  return (
    <div className="student-row">
      <div className="student-avatar">{s.init}</div>
      <div style={{ flex: 1 }}>
        <div className="flex-between">
          <span
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: 8,
              color: "var(--white)",
            }}
          >
            {s.name}
          </span>
          <span className="px-badge badge-sand">LV {s.level}</span>
        </div>
        <div className="mt-8">
          <PixelBar pct={Math.round((s.xp % 200) / 2)} colorClass="bar-sand" />
        </div>
        <div className="flex gap-12 mt-8">
          <span
            style={{
              fontFamily: "var(--font-vt)",
              fontSize: 16,
              color: "var(--gray)",
            }}
          >
            ACC <span style={{ color: "var(--sand)" }}>{s.acc}%</span>
          </span>
          <span
            style={{
              fontFamily: "var(--font-vt)",
              fontSize: 16,
              color: "var(--gray)",
            }}
          >
            STREAK <span style={{ color: "var(--green2)" }}>{s.streak}</span>
          </span>
        </div>
      </div>
      {showReset && (
        <button
          className="px-btn px-btn-red px-btn-sm"
          onClick={() => onReset?.(s.id)}
        >
          RESET
        </button>
      )}
    </div>
  );
}

function StudentDashScreen({ firebaseState }) {
  const { currentUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const displayName = currentUser?.displayName || currentUser?.email || "Dr. Henry Jones Jr.";
  const email = currentUser?.email || "indy@marshall.edu";
  const level = Number(currentUser?.level || 1);
  const xp = Number(currentUser?.xp || 0);
  const grade = Number(currentUser?.grade || 1);
  const currentLevelXp = xpForLevel(level);
  const nextLevelXp = xpForLevel(level + 1);
  const xpIntoLevel = Math.max(0, xp - currentLevelXp);
  const xpNeeded = nextLevelXp - currentLevelXp;
  const xpPct = Math.min(100, Math.round((xpIntoLevel / xpNeeded) * 100));
  const earned = new Set(currentUser?.achievements || []);
  const achievements = ACHIEVEMENTS.map((achievement) => ({
    ...achievement,
    earned: achievement.earned || earned.has(achievement.name) || earned.has(achievement.id),
  }));

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 40 }}>
      <QueryNotice {...firebaseState} />
      {/* Hero dialogue */}
      <div
        className="dialogue-box"
        style={{ marginBottom: 24, padding: "20px 24px" }}
      >
        <div className="flex gap-16" style={{ alignItems: "flex-start" }}>
          <div className="portrait">
            <Icon name="hat" size={32} color="var(--sand)" />
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: 10,
                color: "var(--sand)",
                marginBottom: 12,
                textShadow: "1px 1px 0 var(--sand2)",
              }}
            >
              NUMBER RAIDERS
            </div>
            <div
              className="vt"
              style={{ fontSize: 20, color: "var(--white)", lineHeight: 1.5 }}
            >
              Danger and equations await. Choose your expedition and press
              onward. Relics will not solve themselves!
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gap: 20 }}>
        <div className="px-box" style={{ padding: 24 }}>
          <div className="flex-between" style={{ marginBottom: 14 }}>
            <div
              className="section-header"
              style={{ marginBottom: 0, border: "none", paddingBottom: 0 }}
            >
              EXPEDITION RANK
            </div>
            <span className="px-badge badge-sand" style={{ fontSize: 8 }}>
              GRADE {grade}
            </span>
          </div>
          <div className="flex-between" style={{ gap: 18, alignItems: "center" }}>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-pixel)",
                  fontSize: 22,
                  color: "var(--sand)",
                  textShadow: "2px 2px 0 var(--sand2)",
                  lineHeight: 1.4,
                }}
              >
                LV {level}
              </div>
              <div className="vt" style={{ color: "var(--gray)", fontSize: 18 }}>
                {xpIntoLevel} / {xpNeeded} XP TO NEXT LEVEL
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <PixelBar pct={xpPct} colorClass="bar-sand" />
              <div
                className="flex-between"
                style={{
                  marginTop: 8,
                  fontFamily: "var(--font-pixel)",
                  fontSize: 7,
                  color: "var(--gray)",
                }}
              >
                <span>{xp} TOTAL XP</span>
                <span>NEXT LV {level + 1}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: relic vault */}
        <div className="px-box" style={{ padding: 24 }}>
          {SHOW_ACHIEVEMENTS_UI && (
            <>
          <div className="flex-between" style={{ marginBottom: 16 }}>
            <div
              className="section-header"
              style={{ marginBottom: 0, border: "none", paddingBottom: 0 }}
            >
              ★ RELIC VAULT
            </div>
            <span
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: 7,
                color: "var(--gray)",
              }}
            >
              {achievements.filter((a) => a.earned).length} / {achievements.length}
            </span>
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            {achievements.map((a) => (
              <div
                key={a.id}
                style={{
                  background: a.earned ? "rgba(200,164,86,0.07)" : "#060401",
                  border: `3px solid ${a.earned ? "var(--sand2)" : "var(--border)"}`,
                  boxShadow: a.earned
                    ? "3px 3px 0 0 var(--sand2)"
                    : "2px 2px 0 0 var(--black)",
                  padding: "12px 10px",
                  textAlign: "center",
                  opacity: a.earned ? 1 : 0.4,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 8,
                  }}
                >
                  <Icon
                    name={a.icon}
                    size={24}
                    color={a.earned ? "var(--sand)" : "var(--gray)"}
                  />
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-pixel)",
                    fontSize: 7,
                    color: a.earned ? "var(--sand)" : "var(--gray)",
                    letterSpacing: "0.5px",
                    lineHeight: 1.6,
                  }}
                >
                  {a.name}
                </div>
                <div
                  className="vt"
                  style={{ fontSize: 14, color: "var(--gray)", marginTop: 4 }}
                >
                  {a.desc}
                </div>
              </div>
            ))}
          </div>
            </>
          )}

          <div className="px-divider mt-20" style={{ marginTop: 20 }}>
            <div className="px-divider-line" />
            <div className="px-divider-icon">★ ACCOUNT INFO</div>
            <div className="px-divider-line" />
          </div>

          <div style={{ marginTop: 16 }}>
            <div style={{ display: "grid", gap: 12 }}>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-pixel)",
                    fontSize: 7,
                    color: "var(--gray)",
                    marginBottom: 6,
                    letterSpacing: "0.5px",
                  }}
                >
                  DISPLAY NAME
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-pixel)",
                    fontSize: 9,
                    color: "var(--sand)",
                  }}
                >
                  {displayName}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-pixel)",
                    fontSize: 7,
                    color: "var(--gray)",
                    marginBottom: 6,
                    letterSpacing: "0.5px",
                  }}
                >
                  EMAIL ADDRESS
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-pixel)",
                    fontSize: 9,
                    color: "var(--sand)",
                  }}
                >
                  {email}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GameScreen({ onNavigate }) {
  const [answer, setAnswer] = useState("");
  const [state, setState] = useState("idle");
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [hp, setHp] = useState(100);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showAchieve, setShowAchieve] = useState(false);
  const [turn, setTurn] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setTimeLeft((p) => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function submit(e) {
    e.preventDefault();
    const val = parseInt(answer.trim(), 10);
    if (isNaN(val)) return;
    const isCorrect = true;
    setTurn((t) => t + 1);
    if (isCorrect) {
      setState("correct");
      setFeedback("CORRECT! +100 XP");
      const ns = score + 1;
      setScore(ns);
      if (ns === 3) setTimeout(() => setShowAchieve(true), 700);
      setTimeout(() => {
        setState("idle");
        setFeedback(null);
        setAnswer("");
      }, 900);
    } else {
      setState("wrong");
      setFeedback("WRONG! -20 HP");
      setHp((h) => Math.max(0, h - 20));
      setTimeout(() => {
        setState("idle");
        setFeedback(null);
        setAnswer("");
      }, 900);
    }
  }

  const hpColor = hp > 50 ? "bar-green" : hp > 25 ? "bar-sand" : "bar-red";

  return (
    <div className="container" style={{ paddingTop: 24, paddingBottom: 40 }}>
      {SHOW_ACHIEVEMENTS_UI && showAchieve && (
        <div className="overlay">
          <div className="achievement-popup">
            <div className="achieve-icon">
              <Icon name="chest" size={48} color="var(--sand)" />
            </div>
            <div
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: 7,
                color: "var(--gray)",
                marginBottom: 8,
              }}
            >
              ★ ACHIEVEMENT UNLOCKED ★
            </div>
            <div
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: 14,
                color: "var(--sand)",
                textShadow: "1px 1px 0 var(--sand2)",
                marginBottom: 12,
                lineHeight: 1.6,
              }}
            >
              ARTIFACT
              <br />
              HUNTER!
            </div>
            <div
              className="vt"
              style={{
                fontSize: 20,
                color: "var(--white)",
                marginBottom: 24,
                lineHeight: 1.5,
              }}
            >
              3 problems solved! The relic is yours.
            </div>
            <div className="px-stars">★ ★ ★</div>
            <button
              className="px-btn px-btn-gold mt-20"
              onClick={() => setShowAchieve(false)}
            >
              ▶ CONTINUE QUEST
            </button>
          </div>
        </div>
      )}

      {/* HUD */}
      <div
        className="px-box-dark"
        style={{ padding: "14px 18px", marginBottom: 18 }}
      >
        <div className="hud-bar">
          <button
            className="px-btn px-btn-ghost"
            onClick={() => onNavigate("student")}
          >
            ◀ RETREAT
          </button>
          <div style={{ flex: 1 }}>
            <div className="hud-label">HP</div>
            <PixelBar pct={hp} colorClass={hpColor} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="hud-label">QUEST PROGRESS</div>
            <PixelBar pct={Math.min(score * 20, 100)} colorClass="bar-teal" />
          </div>
          <div
            className="stat-card"
            style={{ padding: "8px 14px", minWidth: 64 }}
          >
            <div className="stat-value" style={{ fontSize: 16 }}>
              {score}
            </div>
            <div className="stat-label">SCORE</div>
          </div>
          <div
            className="stat-card"
            style={{ padding: "8px 14px", minWidth: 64 }}
          >
            <div
              className="stat-value"
              style={{
                fontSize: 16,
                color: timeLeft < 15 ? "var(--red2)" : "var(--sand)",
              }}
            >
              {timeLeft}
            </div>
            <div className="stat-label">TIME</div>
          </div>
        </div>
      </div>

      {/* Battle */}
      <div className="grid-2" style={{ gap: 18 }}>
        <div>
          <div className="dialogue-box" style={{ padding: "14px 16px" }}>
            <div className="flex gap-12" style={{ alignItems: "center" }}>
              <div style={{ flexShrink: 0 }}>
                <Icon name="hat" size={28} color="var(--sand)" />
              </div>
              <div
                className="vt"
                style={{ fontSize: 18, color: "var(--white)", lineHeight: 1.5 }}
              >
                {feedback ? (
                  <span
                    style={{
                      color:
                        state === "correct" ? "var(--green2)" : "var(--red2)",
                    }}
                  >
                    {feedback}
                  </span>
                ) : (
                  "Solve the inscription to open the temple door!"
                )}
              </div>
            </div>
            <div
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: 6,
                color: "var(--gray)",
                marginTop: 8,
              }}
            >
              TURN {String(turn + 1).padStart(3, "0")}
            </div>
          </div>
        </div>

        <div>
          <div
            className="px-box"
            style={{ padding: 20, textAlign: "center", marginBottom: 16 }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 8,
                animation:
                  state === "wrong" ? "pixelShake 0.3s steps(4)" : "none",
              }}
            >
              {state === "correct" ? (
                <Icon name="star" size={52} color="var(--sand)" />
              ) : (
                <Icon name="shield" size={52} color="var(--rust)" />
              )}
            </div>
            <div
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: 8,
                color: "var(--gray)",
                marginBottom: 8,
              }}
            >
              TEMPLE GUARDIAN
            </div>
            <div className="hud-label">SHIELD</div>
            <PixelBar
              pct={Math.max(100 - score * 20, 0)}
              colorClass="bar-rust"
            />
          </div>

          <form onSubmit={submit}>
            <input
              ref={inputRef}
              className={`px-input ${state}`}
              type="number"
              placeholder="ENTER ANSWER..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={state !== "idle"}
            />
            <button
              className="px-btn px-btn-gold mt-12"
              style={{ width: "100%", fontSize: 10, padding: "14px" }}
              type="submit"
            >
              ▶ SUBMIT ANSWER
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function ParentDashboard({ onNavigate, students, firebaseState }) {
  const [sel, setSel] = useState(0);
  const roster = students.length ? students : STUDENTS.slice(0, 2);
  const s = roster[Math.min(sel, roster.length - 1)] || STUDENTS[0];

  return (
    <div className="container" style={{ paddingTop: 28, paddingBottom: 40 }}>
      <QueryNotice {...firebaseState} fallback={!students.length} />
      <div className="flex-between" style={{ marginBottom: 20 }}>
        <div
          style={{
            fontFamily: "var(--font-pixel)",
            fontSize: 12,
            color: "var(--sand)",
            textShadow: "1px 1px 0 var(--sand2)",
          }}
        >
          PARENT HQ
        </div>
        <button
          className="px-btn px-btn-leather"
          onClick={() => onNavigate("game")}
        >
          ▶ PREVIEW GAME
        </button>
      </div>

      <div className="grid-2" style={{ gap: 18 }}>
        <div className="px-box" style={{ padding: 22 }}>
          <div className="section-header">MANAGE CHILDREN</div>
          <div className="menu-list">
            {roster.map((st, i) => (
              <div
                key={st.id}
                className={`menu-item ${sel === i ? "selected" : ""}`}
                onClick={() => setSel(i)}
              >
                <span className="arrow">▶</span>
                <div
                  className="student-avatar"
                  style={{ width: 28, height: 28, fontSize: 7 }}
                >
                  {st.init}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-pixel)",
                      fontSize: 8,
                      color: "var(--white)",
                    }}
                  >
                    {st.name}
                  </div>
                  <div
                    className="vt"
                    style={{ fontSize: 15, color: "var(--gray)" }}
                  >
                    Level {st.level} Explorer
                  </div>
                </div>
                <span className="px-badge badge-sand">LV{st.level}</span>
              </div>
            ))}
          </div>

          <div className="px-divider mt-16">
            <div className="px-divider-line" />
            <div className="px-divider-icon">OPTIONS</div>
            <div className="px-divider-line" />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button
              className="px-btn px-btn-leather"
              style={{ width: "100%", justifyContent: "flex-start" }}
              onClick={() => onNavigate("account")}
            >
              ★ MANAGE ACCOUNT DATA
            </button>
            <button
              className="px-btn px-btn-ghost"
              style={{ width: "100%", justifyContent: "flex-start" }}
            >
              + ADD CHILD
            </button>
            <button
              className="px-btn px-btn-red px-btn-sm"
              style={{ width: "100%" }}
            >
              ✖ RESET PROGRESS
            </button>
          </div>
        </div>

        <div className="px-box" style={{ padding: 22 }}>
          <div className="section-header">TRACK PROGRESS — {s.name}</div>
          <div className="grid-2" style={{ gap: 10, marginBottom: 18 }}>
            <div className="stat-card">
              <div className="stat-value">{s.level}</div>
              <div className="stat-label">LEVEL</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{s.xp}</div>
              <div className="stat-label">TOTAL XP</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{s.acc}%</div>
              <div className="stat-label">ACCURACY</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{s.streak}</div>
              <div className="stat-label">STREAK</div>
            </div>
          </div>

          <div
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: 7,
              color: "var(--gray)",
              marginBottom: 12,
              letterSpacing: "0.5px",
            }}
          >
            SKILL BREAKDOWN
          </div>
          <PixelBar pct={88} label="ADDITION" colorClass="bar-green" />
          <div className="mt-12">
            <PixelBar pct={72} label="MULTIPLICATION" colorClass="bar-teal" />
          </div>
          <div className="mt-12">
            <PixelBar pct={55} label="DIVISION" colorClass="bar-sand" />
          </div>
          <div className="mt-12">
            <PixelBar pct={40} label="FRACTIONS" colorClass="bar-rust" />
          </div>
        </div>
      </div>
    </div>
  );
}

function TeacherDashboard({ onNavigate, students, firebaseState, onResetAchievements }) {
  const [tab, setTab] = useState("class");
  const [cls, setCls] = useState("PERIOD 3");
  const roster = students.length ? students : STUDENTS;
  const avgAcc = Math.round(
    roster.reduce((s, x) => s + x.acc, 0) / roster.length,
  );
  const avgLv = Math.round(
    roster.reduce((s, x) => s + x.level, 0) / roster.length,
  );

  return (
    <div className="container" style={{ paddingTop: 28, paddingBottom: 40 }}>
      <QueryNotice {...firebaseState} fallback={!students.length} />
      <div className="flex-between" style={{ marginBottom: 20 }}>
        <div
          style={{
            fontFamily: "var(--font-pixel)",
            fontSize: 12,
            color: "var(--sand)",
            textShadow: "1px 1px 0 var(--sand2)",
          }}
        >
          TEACHER HQ
        </div>
        <div className="flex gap-12">
          <button
            className="px-btn px-btn-leather"
            onClick={() => onNavigate("game")}
          >
            ▶ PREVIEW GAME
          </button>
          <select value={cls} onChange={(e) => setCls(e.target.value)}>
            <option>PERIOD 3</option>
            <option>PERIOD 5</option>
            <option>PERIOD 7</option>
          </select>
        </div>
      </div>

      <div className="grid-4" style={{ marginBottom: 20 }}>
        <div className="stat-card">
          <div className="stat-value">{roster.length}</div>
          <div className="stat-label">STUDENTS</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{avgAcc}%</div>
          <div className="stat-label">AVG ACC</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{avgLv}</div>
          <div className="stat-label">AVG LEVEL</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">3</div>
          <div className="stat-label">ACTIVE</div>
        </div>
      </div>

      <div className="px-box" style={{ padding: 24 }}>
        <div className="tab-group">
          {[
            ["class", "MANAGE CLASS"],
            ["students", "VIEW STUDENTS"],
            ["data", "STUDENT DATA"],
          ].map(([id, lbl]) => (
            <button
              key={id}
              className={`tab ${tab === id ? "active" : ""}`}
              onClick={() => setTab(id)}
            >
              {lbl}
            </button>
          ))}
        </div>

        {tab === "class" && (
          <>
            <div className="flex-between" style={{ marginBottom: 18 }}>
              <div
                style={{
                  fontFamily: "var(--font-pixel)",
                  fontSize: 8,
                  color: "var(--gray)",
                }}
              >
                AVERAGE CLASS PROGRESS
              </div>
              <div className="flex gap-8">
                <button className="px-btn px-btn-ghost px-btn-sm">
                  EXPORT
                </button>
                <button className="px-btn px-btn-red px-btn-sm">
                  RESET CLASS
                </button>
              </div>
            </div>
            <PixelBar
              pct={avgAcc}
              label="OVERALL MASTERY"
              colorClass="bar-sand"
            />
            <div className="mt-12">
              <PixelBar pct={82} label="ADDITION" colorClass="bar-green" />
            </div>
            <div className="mt-12">
              <PixelBar pct={67} label="MULTIPLICATION" colorClass="bar-teal" />
            </div>
            <div className="mt-12">
              <PixelBar pct={48} label="DIVISION" colorClass="bar-rust" />
            </div>
            <div className="mt-12">
              <PixelBar pct={31} label="FRACTIONS" colorClass="bar-red" />
            </div>
          </>
        )}

        {tab === "students" && (
          <>
            {roster.map((s) => (
              <StudentRow
                key={s.id}
                s={s}
                showReset={SHOW_ACHIEVEMENTS_UI}
                onReset={onResetAchievements}
              />
            ))}
            <button
              className="px-btn px-btn-leather mt-16"
              style={{ width: "100%" }}
            >
              + ADD STUDENT
            </button>
          </>
        )}

        {tab === "data" &&
          roster.map((s) => (
            <div key={s.id} className="student-row">
              <div className="student-avatar">{s.init}</div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "var(--font-pixel)",
                    fontSize: 8,
                    color: "var(--white)",
                  }}
                >
                  {s.name}
                </div>
                <div className="flex gap-12 mt-8">
                  <span
                    className="vt"
                    style={{ fontSize: 15, color: "var(--gray)" }}
                  >
                    XP <span style={{ color: "var(--sand)" }}>{s.xp}</span>
                  </span>
                  <span
                    className="vt"
                    style={{ fontSize: 15, color: "var(--gray)" }}
                  >
                    ACC <span style={{ color: "var(--sand)" }}>{s.acc}%</span>
                  </span>
                  <span
                    className="vt"
                    style={{ fontSize: 15, color: "var(--gray)" }}
                  >
                    STK{" "}
                    <span style={{ color: "var(--green2)" }}>{s.streak}</span>
                  </span>
                </div>
              </div>
              <div className="flex gap-8">
                <button className="px-btn px-btn-ghost px-btn-sm">VIEW</button>
                {SHOW_ACHIEVEMENTS_UI && (
                  <button
                    className="px-btn px-btn-red px-btn-sm"
                    onClick={() => onResetAchievements?.(s.id)}
                  >
                    RESET
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function AccountScreen({ onNavigate }) {
  const { currentUser, userType } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const accountRole =
    userType === "teacher"
      ? "TEACHER"
      : userType === "parent"
        ? "PARENT"
        : "STUDENT";

  const labelStyle = {
    fontFamily: "var(--font-pixel)",
    fontSize: 7,
    color: "var(--gray)",
    marginBottom: 6,
    letterSpacing: "0.5px",
  };

  const inputStyle = {
    width: "100%",
    background: "#060401",
    border: "3px solid var(--border2)",
    padding: "11px 14px",
    color: "var(--sand)",
    fontFamily: "var(--font-pixel)",
    fontSize: 9,
    outline: "none",
    boxShadow: "inset 2px 2px 0 0 var(--black)",
  };

  const renderField = (label, field, key) => (
    <div key={key} style={{ marginBottom: 16 }}>
      <div style={labelStyle}>{label}</div>
      {field}
    </div>
  );

  const defaultFields = [
    {
      label: "DISPLAY NAME",
      type: "text",
      value: currentUser?.displayName || "Dr. Henry Jones Jr.",
    },
    {
      label: "EMAIL ADDRESS",
      type: "email",
      value: currentUser?.email || "indy@marshall.edu",
    },
  ];

  return (
    <div
      className="container"
      style={{ paddingTop: 28, paddingBottom: 40, maxWidth: 580 }}
    >
      <div className="flex-between" style={{ marginBottom: 20 }}>
        <div
          style={{
            fontFamily: "var(--font-pixel)",
            fontSize: 12,
            color: "var(--sand)",
            textShadow: "1px 1px 0 var(--sand2)",
          }}
        >
          ACCOUNT INFO
        </div>
        <button
          className="px-btn px-btn-ghost"
          onClick={() =>
            onNavigate(
              userType === "parent"
                ? "parent"
                : userType === "teacher"
                  ? "teacher"
                  : "student",
            )
          }
        >
          ◀ BACK
        </button>
      </div>

      <div className="px-box" style={{ padding: 28 }}>
        <div
          className="flex-center"
          style={{ flexDirection: "column", marginBottom: 24 }}
        >
          <div
            className="portrait"
            style={{ width: 72, height: 72, marginBottom: 12 }}
          >
            <Icon name="user" size={40} color="var(--sand)" />
          </div>
          <span className="px-badge badge-sand" style={{ fontSize: 8 }}>
            {accountRole} ACCOUNT
          </span>
        </div>

        {defaultFields.map((field) =>
          renderField(
            field.label,
            <input
              type={field.type}
              defaultValue={field.value}
              style={inputStyle}
            />,
            field.label,
          ),
        )}

        {renderField(
          "PASSWORD",
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type={showPassword ? "text" : "password"}
              defaultValue="MySecurePass123"
              style={inputStyle}
            />
            <button
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                background: "var(--leather)",
                border: "3px solid var(--border2)",
                padding: "8px 12px",
                color: "var(--sand)",
                cursor: "pointer",
                fontFamily: "var(--font-pixel)",
                fontSize: 9,
                boxShadow: "2px 2px 0 0 var(--black)",
                transition: "all 0.06s",
              }}
              onMouseDown={(e) => e.preventDefault()}
            >
              {showPassword ? "●" : "○"}
            </button>
          </div>,
        )}

        {userType === "student" &&
          renderField(
            "LINK PARENT ACCOUNT",
            <input
              type="email"
              placeholder="PARENT EMAIL..."
              style={inputStyle}
            />,
          )}

        <div className="px-divider mt-20">
          <div className="px-divider-line" />
          <div className="px-divider-icon">★</div>
          <div className="px-divider-line" />
        </div>
        <div className="flex gap-12">
          <button className="px-btn px-btn-gold" style={{ flex: 1 }}>
            ▶ SAVE CHANGES
          </button>
          <button className="px-btn px-btn-red">✖ DELETE</button>
        </div>
      </div>
    </div>
  );
}

function LoginScreen({ onLogin }) {
  const [creating, setCreating] = useState(false);
  const [role, setRole] = useState("student");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [grade, setGrade] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function submitLogin() {
    setSubmitting(true);
    setError(null);

    try {
      await onLogin(creating ? role : null, {
        creating,
        displayName: displayName.trim(),
        email: email.trim(),
        password,
        grade,
      });
    } catch (loginError) {
      setError(loginError);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="container flex-center"
      style={{ paddingTop: 48, paddingBottom: 48, maxWidth: 480 }}
    >
      <div style={{ width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <Icon name="hat" size={56} color="var(--sand)" />
          </div>
          <div
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: 14,
              color: "var(--sand)",
              textShadow: "1px 1px 0 var(--sand2)",
              lineHeight: 1.8,
            }}
          >
            NUMBER
            <br />
            RAIDERS
          </div>
          <div
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: 7,
              color: "var(--gray)",
              marginTop: 8,
              letterSpacing: "2px",
            }}
          >
            AN EDUCATIONAL ADVENTURE
          </div>
          <div className="px-stars" style={{ marginTop: 12 }}>
            ★ ★ ★ ★ ★
          </div>
        </div>

        <div className="px-box" style={{ padding: 28 }}>
          {creating && (
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  fontFamily: "var(--font-pixel)",
                  fontSize: 7,
                  color: "var(--gray)",
                  marginBottom: 10,
                  letterSpacing: "0.5px",
                }}
              >
                SELECT ROLE
              </div>
              <div className="toggle-group">
                {["student", "parent", "teacher"].map((r) => (
                  <button
                    key={r}
                    className={`toggle-btn ${role === r ? "active" : ""}`}
                    onClick={() => setRole(r)}
                  >
                    {r.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {creating && (
              <input
                placeholder="DISPLAY NAME"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                style={{
                  background: "#060401",
                  border: "3px solid var(--border2)",
                  padding: "11px 14px",
                  color: "var(--sand)",
                  fontFamily: "var(--font-pixel)",
                  fontSize: 9,
                  outline: "none",
                  boxShadow: "inset 2px 2px 0 0 var(--black)",
                  width: "100%",
                }}
              />
            )}
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                background: "#060401",
                border: "3px solid var(--border2)",
                padding: "11px 14px",
                color: "var(--sand)",
                fontFamily: "var(--font-pixel)",
                fontSize: 9,
                outline: "none",
                boxShadow: "inset 2px 2px 0 0 var(--black)",
                width: "100%",
              }}
            />
            <input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                background: "#060401",
                border: "3px solid var(--border2)",
                padding: "11px 14px",
                color: "var(--sand)",
                fontFamily: "var(--font-pixel)",
                fontSize: 9,
                outline: "none",
                boxShadow: "inset 2px 2px 0 0 var(--black)",
                width: "100%",
              }}
            />
            {creating && role === "student" && (
              <select value={grade} onChange={(e) => setGrade(e.target.value)}>
                <option value={1}>GRADE 1</option>
                <option value={2}>GRADE 2</option>
                <option value={3}>GRADE 3</option>
                <option value={4}>GRADE 4</option>
                <option value={5}>GRADE 5</option>
              </select>
            )}
          </div>

          {error && (
            <div
              className="px-badge badge-rust mt-12"
              style={{ lineHeight: 1.6 }}
            >
              {error.message || "SIGN IN FAILED"}
            </div>
          )}

          <button
            className="px-btn px-btn-gold mt-20"
            style={{ width: "100%", fontSize: 11, padding: "14px" }}
            onClick={submitLogin}
            disabled={submitting}
          >
            ▶ {creating ? "CREATE ACCOUNT" : "SIGN IN"}
          </button>
          <button
            className="px-btn px-btn-ghost mt-8"
            style={{ width: "100%", fontSize: 7 }}
            onClick={() => setCreating(!creating)}
          >
            {creating
              ? "◀ ALREADY HAVE ACCOUNT"
              : "★ NEW EXPLORER — CREATE ACCOUNT"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NumberRaiders({
  initialScreen = "home",
  onStartGame,
}) {
  const { authReady, currentUser, userType, login, logout } = useAuth();
  const [students, setStudents] = useState([]);
  const [firebaseState, setFirebaseState] = useState({
    loading: false,
    error: null,
    fallback: false,
  });
  const [screen, setScreen] = useState(initialScreen);
  const [ddOpen, setDdOpen] = useState(false);

  useEffect(() => {
    if (!authReady) return;
    if (!userType || !currentUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStudents([]);
      setScreen("home");
      return;
    }

    setScreen((currentScreen) =>
      currentScreen === "home" ? screenForRole(userType) : currentScreen,
    );
    loadStudents(userType, currentUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authReady, userType, currentUser?.id, currentUser?.grade]);

  async function loadStudents(role, user = currentUser) {
    setFirebaseState({ loading: true, error: null, fallback: false });

    try {
      const docs =
        role === "parent" && user?.id
          ? await getChildrenByParent(user.id)
          : role === "teacher"
            ? await getUsersByRole("Student")
            : await getStudentsByGrade(user?.grade || 1);

      setStudents(docs.map(normalizeStudentProfile));
      setFirebaseState({
        loading: false,
        error: null,
        fallback: docs.length === 0,
      });
    } catch (error) {
      console.warn("Firebase user query failed", error);
      setStudents([]);
      setFirebaseState({ loading: false, error, fallback: true });
    }
  }

  async function handleResetAchievements(userId) {
    try {
      await resetAchievements(userId);
      await loadStudents(userType);
    } catch (error) {
      console.warn("Firebase reset failed", error);
      setFirebaseState({ loading: false, error, fallback: true });
    }
  }

  function navigate(nextScreen) {
    if (userType && nextScreen === "home") {
      setScreen(screenForRole(userType));
      setDdOpen(false);
      return;
    }

    if (!userType && nextScreen !== "home") {
      setScreen("home");
      setDdOpen(false);
      return;
    }

    if (nextScreen === "game") {
      if (userType) {
        onStartGame?.();
      } else {
        setScreen("home");
      }
      setDdOpen(false);
      return;
    }

    setScreen(nextScreen);
    setDdOpen(false);
  }

  const SCREENS = ["home", "student", "game", "parent", "teacher"];
  const visibleScreens = !authReady
    ? []
    : userType
      ? SCREENS.filter(
          (s) =>
            s === "game" ||
            s === userType ||
            (userType === "student" && s === "student"),
        )
      : ["home"];
  const LABELS = {
    home: "HOME",
    student: "STUDENT DASH",
    game: "GAME",
    parent: "PARENT DASH",
    teacher: "TEACHER DASH",
  };
  const activeScreen = !authReady
    ? null
    : userType
      ? screen === "home"
        ? screenForRole(userType)
        : screen
      : "home";

  async function handleLogout() {
    await logout();
    setStudents([]);
    setScreen("home");
    setDdOpen(false);
  }

  return (
    <>
      <style>{STYLES}</style>
      <div className="game-root">
        <nav className="nav">
          <div className="nav-logo">
            NUMBER RAIDERS
            <small>AN EDUCATIONAL ADVENTURE</small>
          </div>
          <div
            className="flex gap-12"
            style={{ alignItems: "center", position: "relative" }}
          >
            {userType && (
              <span className="px-badge badge-sand" style={{ fontSize: 7 }}>
                {userType.toUpperCase()}
              </span>
            )}
            <div style={{ position: "relative" }}>
              <div className="profile-btn" onClick={() => setDdOpen((o) => !o)}>
                {userType ? "HJ" : "?"}
              </div>
              {ddOpen && (
                <div className="dropdown">
                  {!userType ? (
                    <button
                      className="dropdown-item"
                      onClick={() => navigate("home")}
                    >
                      ▶ SIGN IN
                    </button>
                  ) : (
                    <>
                      <button
                        className="dropdown-item"
                        onClick={() =>
                          navigate(
                            userType === "parent"
                              ? "parent"
                              : userType === "teacher"
                                ? "teacher"
                                : "student",
                          )
                        }
                      >
                        ★ DASHBOARD
                      </button>
                      <button className="dropdown-item" onClick={handleLogout}>
                        ✖ SIGN OUT
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>

        <div className="screen-nav">
          {visibleScreens.map((s) => (
            <button
              key={s}
              className={`snav-btn ${activeScreen === s ? "active" : ""}`}
              onClick={() => navigate(s)}
            >
              {LABELS[s]}
            </button>
          ))}
        </div>

        {activeScreen === "home" && <LoginScreen onLogin={login} />}
        {activeScreen === "student" && (
          <StudentDashScreen
            firebaseState={firebaseState}
          />
        )}
        {activeScreen === "parent" && (
          <ParentDashboard
            onNavigate={navigate}
            students={students}
            firebaseState={firebaseState}
          />
        )}
        {activeScreen === "teacher" && (
          <TeacherDashboard
            onNavigate={navigate}
            students={students}
            firebaseState={firebaseState}
            onResetAchievements={handleResetAchievements}
          />
        )}
        {activeScreen === "account" && (
          <AccountScreen
            onNavigate={navigate}
          />
        )}
      </div>
    </>
  );
}
