import { useState, useEffect, useRef, useCallback } from "react";
import { generateProblem, evalExpr, exprToString } from "../services/mathProblem/generator"
import { GRADE_TO_SPEC } from "../services/mathProblem/specMap";

// ── TYPES & LOGIC (mirrors your TS files) ─────────────────────────────────
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate wrong-but-plausible distractors for multiple choice
function generateChoices(correct, maxNum) {
  const choices = new Set([correct]);
  const deltas = [1, 2, 3, 5, 10, -1, -2, -3];
  let tries = 0;
  while (choices.size < 4 && tries < 40) {
    const delta = deltas[randInt(0, deltas.length - 1)];
    const wrong = correct + delta;
    if (wrong > 0 && wrong !== correct) choices.add(wrong);
    tries++;
  }
  while (choices.size < 4) choices.add(correct + choices.size * 3);
  return [...choices].sort(() => Math.random() - 0.5);
}

// ── MINI-GAME NAMES ───────────────────────────────────────────────────────
const MINI_GAMES = ["boulder", "temple", "relic", "idol"];
const MINI_GAME_LABELS = {
  boulder: "BOULDER CHASE",
  temple: "TEMPLE LOCK",
  relic: "RELIC DIG",
  idol: "IDOL MATCH",
};

// ── PIXEL ICONS ───────────────────────────────────────────────────────────
const Icon = ({ name, size = 16, color = "currentColor" }) => {
  const R = (props) => <rect {...props} />;
  const wrap = (children) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      style={{ imageRendering: "pixelated", display: "block", flexShrink: 0 }}
    >
      {children}
    </svg>
  );
  const icons = {
    boulder: wrap(
      <>
        <R x="5" y="1" width="6" height="2" fill={color} />
        <R x="3" y="3" width="10" height="2" fill={color} />
        <R x="2" y="5" width="12" height="6" fill={color} />
        <R x="3" y="11" width="10" height="2" fill={color} />
        <R x="5" y="13" width="6" height="2" fill={color} />
        <R x="4" y="4" width="3" height="2" fill="rgba(255,255,255,0.2)" />
      </>,
    ),
    lock: wrap(
      <>
        <R x="5" y="1" width="6" height="2" fill={color} />
        <R x="3" y="3" width="2" height="4" fill={color} />
        <R x="11" y="3" width="2" height="4" fill={color} />
        <R x="2" y="7" width="12" height="7" fill={color} />
        <R x="7" y="9" width="2" height="2" fill="rgba(0,0,0,0.4)" />
        <R x="6" y="11" width="4" height="2" fill="rgba(0,0,0,0.3)" />
      </>,
    ),
    shovel: wrap(
      <>
        <R x="7" y="1" width="4" height="2" fill={color} />
        <R x="6" y="3" width="4" height="4" fill={color} />
        <R x="7" y="7" width="2" height="6" fill={color} />
        <R x="5" y="12" width="6" height="2" fill={color} />
        <R x="7" y="2" width="2" height="1" fill="rgba(255,255,255,0.3)" />
      </>,
    ),
    idol: wrap(
      <>
        <R x="6" y="1" width="4" height="3" fill={color} />
        <R x="5" y="4" width="6" height="2" fill={color} />
        <R x="4" y="6" width="8" height="4" fill={color} />
        <R x="3" y="10" width="10" height="2" fill={color} />
        <R x="5" y="12" width="6" height="2" fill={color} />
        <R x="6" y="5" width="4" height="1" fill="rgba(255,255,255,0.25)" />
      </>,
    ),
    check: wrap(
      <>
        <R x="1" y="8" width="2" height="2" fill={color} />
        <R x="3" y="10" width="2" height="2" fill={color} />
        <R x="5" y="12" width="2" height="2" fill={color} />
        <R x="7" y="10" width="2" height="2" fill={color} />
        <R x="9" y="8" width="2" height="2" fill={color} />
        <R x="11" y="6" width="2" height="2" fill={color} />
        <R x="13" y="4" width="2" height="2" fill={color} />
      </>,
    ),
    cross: wrap(
      <>
        <R x="2" y="2" width="3" height="3" fill={color} />
        <R x="5" y="5" width="2" height="2" fill={color} />
        <R x="7" y="7" width="2" height="2" fill={color} />
        <R x="9" y="5" width="2" height="2" fill={color} />
        <R x="11" y="2" width="3" height="3" fill={color} />
        <R x="5" y="9" width="2" height="2" fill={color} />
        <R x="9" y="9" width="2" height="2" fill={color} />
        <R x="2" y="11" width="3" height="3" fill={color} />
        <R x="11" y="11" width="3" height="3" fill={color} />
      </>,
    ),
    star: wrap(
      <>
        <R x="7" y="1" width="2" height="3" fill={color} />
        <R x="7" y="12" width="2" height="3" fill={color} />
        <R x="1" y="7" width="3" height="2" fill={color} />
        <R x="12" y="7" width="3" height="2" fill={color} />
        <R x="3" y="3" width="2" height="2" fill={color} />
        <R x="11" y="3" width="2" height="2" fill={color} />
        <R x="3" y="11" width="2" height="2" fill={color} />
        <R x="11" y="11" width="2" height="2" fill={color} />
        <R x="6" y="4" width="4" height="8" fill={color} />
        <R x="4" y="6" width="8" height="4" fill={color} />
      </>,
    ),
    hat: wrap(
      <>
        <R x="3" y="8" width="10" height="2" fill={color} />
        <R x="2" y="10" width="12" height="1" fill={color} />
        <R x="5" y="4" width="6" height="4" fill={color} />
        <R x="4" y="5" width="1" height="3" fill={color} />
        <R x="11" y="5" width="1" height="3" fill={color} />
      </>,
    ),
    heart: wrap(
      <>
        <R x="1" y="4" width="4" height="4" fill={color} />
        <R x="5" y="2" width="3" height="3" fill={color} />
        <R x="8" y="2" width="3" height="3" fill={color} />
        <R x="11" y="4" width="4" height="4" fill={color} />
        <R x="2" y="8" width="12" height="3" fill={color} />
        <R x="4" y="11" width="8" height="2" fill={color} />
        <R x="6" y="13" width="4" height="2" fill={color} />
      </>,
    ),
    skip: wrap(
      <>
        <R x="2" y="4" width="2" height="8" fill={color} />
        <R x="4" y="6" width="2" height="4" fill={color} />
        <R x="6" y="7" width="2" height="2" fill={color} />
        <R x="10" y="4" width="2" height="8" fill={color} />
        <R x="12" y="4" width="2" height="8" fill={color} />
      </>,
    ),
  };
  return icons[name] || null;
};

// ── STYLES ────────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --black:    #0d0a06;
    --darkest:  #1a1208;
    --panel:    #2a1e0e;
    --panel2:   #1e1508;
    --panel3:   #120e04;
    --sand:     #c8a456;
    --sand2:    #9a7a38;
    --sand3:    #e0bc78;
    --leather:  #7a4e28;
    --leather2: #5a3618;
    --parch:    #d4b878;
    --border:   #5a4020;
    --border2:  #7a5a30;
    --white:    #e8dcc0;
    --offwhite: #c8b890;
    --gray:     #8a7050;
    --red:      #c03818;
    --red2:     #e85030;
    --green:    #5a8c28;
    --green2:   #88c840;
    --teal:     #287860;
    --teal2:    #38a880;
    --rust:     #a04828;
    --rust2:    #c86030;
    --fp: 'Press Start 2P', monospace;
    --fv: 'VT323', monospace;
  }

  /* ── OVERLAY ── */
  .overlay-backdrop {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(10,6,2,0.92);
    display: flex; align-items: center; justify-content: center;
    animation: bdFade 0.2s steps(4);
    padding: 16px;
  }
  @keyframes bdFade { from{opacity:0} to{opacity:1} }

  .overlay-card {
    width: 100%; max-width: 860px;
    background: var(--panel);
    border: 6px solid var(--border2);
    box-shadow: 8px 8px 0 0 var(--black), inset 2px 2px 0 0 rgba(255,220,120,0.05);
    display: flex; flex-direction: column;
    max-height: 96vh; overflow: hidden;
    animation: cardPop 0.22s steps(4);
    position: relative;
  }
  @keyframes cardPop { from{transform:scale(0.88) translateY(16px);opacity:0} to{transform:scale(1) translateY(0);opacity:1} }

  /* Corner decorations */
  .overlay-card::before, .overlay-card::after {
    content:''; position:absolute; width:20px; height:20px; border-color:var(--sand); border-style:solid; opacity:0.4;
  }
  .overlay-card::before { top:8px; left:8px; border-width:3px 0 0 3px; }
  .overlay-card::after  { top:8px; right:8px; border-width:3px 3px 0 0; }

  /* ── HEADER ── */
  .ov-header {
    background: var(--darkest);
    border-bottom: 4px solid var(--border2);
    padding: 12px 20px;
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
    flex-shrink: 0;
  }
  .ov-game-badge {
    display: flex; align-items: center; gap: 8px;
    font-family: var(--fp); font-size: 9px; color: var(--sand);
    text-shadow: 1px 1px 0 var(--sand2); letter-spacing: 1px;
  }
  .ov-lives { display: flex; gap: 6px; align-items: center; }
  .ov-grade-badge {
    font-family: var(--fp); font-size: 7px;
    padding: 4px 8px; border: 2px solid var(--sand2);
    background: rgba(200,164,86,0.15); color: var(--sand);
  }

  /* ── BODY ── */
  .ov-body {
    flex: 1; overflow-y: auto; padding: 24px 28px;
    display: flex; flex-direction: column; gap: 20px;
    image-rendering: pixelated;
  }

  /* ── PROBLEM DISPLAY ── */
  .problem-stage {
    background: var(--panel3);
    border: 4px solid var(--border2);
    box-shadow: 4px 4px 0 0 var(--black), inset 2px 2px 0 0 rgba(200,164,86,0.04);
    padding: 28px 24px; text-align: center;
    position: relative; flex-shrink: 0;
  }
  .problem-stage::before {
    content:''; position:absolute; inset:4px; border:2px solid var(--border); pointer-events:none;
  }
  .problem-expr {
    font-family: var(--fp); color: var(--parch);
    text-shadow: 1px 1px 0 var(--sand2); letter-spacing: 2px; line-height: 1.8;
  }
  .problem-expr.sz-lg { font-size: 28px; }
  .problem-expr.sz-md { font-size: 20px; }
  .problem-expr.sz-sm { font-size: 15px; }
  .problem-label {
    font-family: var(--fp); font-size: 7px; color: var(--gray);
    letter-spacing: 2px; margin-bottom: 10px;
  }

  /* ── FEEDBACK BANNER ── */
  .feedback-banner {
    padding: 10px 16px; text-align: center;
    font-family: var(--fp); font-size: 10px; letter-spacing: 1px;
    border: 3px solid; flex-shrink: 0;
    animation: bannerSlide 0.15s steps(3);
  }
  @keyframes bannerSlide { from{transform:translateY(-8px);opacity:0} to{transform:translateY(0);opacity:1} }
  .feedback-banner.correct { background:rgba(88,200,64,0.12); border-color:var(--green); color:var(--green2); }
  .feedback-banner.wrong   { background:rgba(200,48,24,0.12); border-color:var(--red);   color:var(--red2); }

  /* ── FOOTER BUTTONS ── */
  .ov-footer {
    border-top: 3px solid var(--border);
    padding: 12px 20px;
    display: flex; gap: 10px; align-items: center; flex-shrink: 0;
    background: var(--panel2);
  }

  /* ── PIXEL BUTTONS ── */
  .px-btn {
    font-family: var(--fp); font-size: 8px; letter-spacing: 0.5px;
    padding: 10px 16px; cursor: pointer; border: none; outline: none;
    display: inline-flex; align-items: center; justify-content: center; gap: 6px;
    transition: transform 0.06s, box-shadow 0.06s; line-height: 1.4; flex-shrink: 0;
  }
  .px-btn:active:not(:disabled) { transform:translate(3px,3px); box-shadow:none!important; }
  .px-btn:disabled { opacity:0.4; cursor:not-allowed; }
  .px-btn-gold   { background:var(--sand); color:var(--black); box-shadow:4px 4px 0 0 var(--sand2); border:2px solid var(--sand2); }
  .px-btn-gold:hover:not(:disabled) { background:var(--sand3); }
  .px-btn-ghost  { background:var(--panel2); color:var(--gray); box-shadow:3px 3px 0 0 var(--black); border:2px solid var(--border); font-size:7px; padding:8px 12px; }
  .px-btn-ghost:hover:not(:disabled) { color:var(--white); border-color:var(--border2); }
  .px-btn-red    { background:var(--red); color:var(--white); box-shadow:3px 3px 0 0 #601808; border:2px solid #801808; }

  /* ── STAT BAR ── */
  .stat-bar-track { height:12px; background:#060401; border:2px solid var(--border); overflow:hidden; }
  .stat-bar-fill  { height:100%; transition:width 0.3s steps(6); }
  .bar-sand  { background:var(--sand); }
  .bar-green { background:var(--green); }
  .bar-red   { background:var(--red); }
  .bar-teal  { background:var(--teal); }

  /* ── MINI GAME SELECTOR ── */
  .mg-selector {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;
    flex-shrink: 0;
  }
  .mg-card {
    background: var(--panel2); border: 3px solid var(--border);
    box-shadow: 3px 3px 0 0 var(--black);
    padding: 14px 8px; text-align: center; cursor: pointer;
    transition: all 0.06s;
    display: flex; flex-direction: column; align-items: center; gap: 8px;
  }
  .mg-card:hover { border-color: var(--border2); background: var(--panel); }
  .mg-card.selected { border-color: var(--sand); background: rgba(200,164,86,0.1); box-shadow: 3px 3px 0 0 var(--sand2); }
  .mg-card-label { font-family: var(--fp); font-size: 6px; color: var(--gray); letter-spacing: 0.5px; line-height: 1.6; }
  .mg-card.selected .mg-card-label { color: var(--sand); }

  /* ── DIALOGUE BOX ── */
  .dialogue-box {
    background: var(--darkest); border: 4px solid var(--offwhite);
    box-shadow: 4px 4px 0 0 var(--black); padding: 14px 16px; position: relative;
  }
  .dialogue-box::before { content:''; position:absolute; inset:4px; border:2px solid var(--border); pointer-events:none; }

  /* ══════════════════════════════════════════════════════════════
     MINI-GAME SPECIFIC STYLES
  ══════════════════════════════════════════════════════════════ */

  /* ── BOULDER CHASE ── */
  .boulder-arena {
    background: var(--panel3); border: 4px solid var(--border);
    box-shadow: inset 3px 3px 0 0 rgba(0,0,0,0.5);
    height: 80px; position: relative; overflow: hidden;
    display: flex; align-items: center;
  }
  .boulder-track {
    position: absolute; inset: 0;
    display: flex; align-items: center;
  }
  .boulder-sprite {
    position: absolute; left: 0; top: 50%; transform: translateY(-50%);
    width: 40px; height: 40px; transition: left 0.1s linear;
    display: flex; align-items: center; justify-content: center;
  }
  .boulder-pixel {
    width: 36px; height: 36px;
    background: var(--rust);
    border: 3px solid var(--rust2);
    box-shadow: 3px 3px 0 0 var(--black), inset -2px -2px 0 0 rgba(0,0,0,0.3);
    border-radius: 0;
    animation: boulderRoll 0.4s steps(4) infinite;
  }
  @keyframes boulderRoll { 0%{box-shadow:3px 3px 0 0 var(--black), inset -2px -2px 0 0 rgba(0,0,0,0.3)} 50%{box-shadow:-3px 3px 0 0 var(--black), inset 2px -2px 0 0 rgba(0,0,0,0.3)} }
  .player-sprite {
    position: absolute; right: 24px; top: 50%; transform: translateY(-50%);
    width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
    animation: playerRun 0.5s steps(2) infinite;
  }
  @keyframes playerRun { 0%{transform:translateY(-50%) scaleX(1)} 50%{transform:translateY(-46%) scaleX(1)} }
  .boulder-timer-bar {
    position: absolute; bottom: 0; left: 0; height: 5px;
    background: var(--sand); transition: width 0.1s linear;
  }
  .boulder-timer-bar.danger { background: var(--red2); animation: timerPulse 0.3s steps(2) infinite; }
  @keyframes timerPulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
  .boulder-input-wrap {
    display: flex; gap: 10px; align-items: stretch; margin-top: 14px;
  }
  .boulder-input {
    font-family: var(--fp); font-size: 18px;
    background: var(--panel3); border: 4px solid var(--border2);
    box-shadow: inset 2px 2px 0 0 var(--black);
    color: var(--sand); padding: 12px 16px; outline: none; flex: 1; text-align: center;
    caret-color: var(--sand);
  }
  .boulder-input:focus { border-color: var(--sand); }
  .boulder-input.shake { animation: boulderShake 0.3s steps(4); }
  @keyframes boulderShake { 0%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} 100%{transform:translateX(0)} }

  /* ── TEMPLE LOCK ── */
  .temple-door-wrap {
    display: flex; gap: 20px; align-items: center; justify-content: center;
  }
  .temple-door {
    width: 120px; flex-shrink: 0;
    display: flex; flex-direction: column; align-items: center; gap: 6px;
  }
  .door-panel {
    width: 100px; height: 130px;
    background: var(--leather2); border: 4px solid var(--border2);
    box-shadow: 4px 4px 0 0 var(--black);
    position: relative; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    transition: transform 0.4s steps(8);
  }
  .door-panel.open-left  { transform-origin: left; }
  .door-panel.open-right { transform-origin: right; }
  .door-panel.opening-left  { animation: openLeft 0.5s steps(8) forwards; }
  .door-panel.opening-right { animation: openRight 0.5s steps(8) forwards; }
  @keyframes openLeft  { from{transform:scaleX(1)} to{transform:scaleX(0)} }
  @keyframes openRight { from{transform:scaleX(1)} to{transform:scaleX(0)} }
  .door-plank {
    position: absolute; width: 100%; height: 20px;
    background: var(--leather); border-top: 2px solid var(--border2); border-bottom: 2px solid var(--border);
  }
  .door-lock-icon {
    position: relative; z-index: 2;
    background: var(--sand2); border: 3px solid var(--sand);
    width: 36px; height: 36px;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 2px 2px 0 0 var(--black);
    transition: all 0.2s;
  }
  .door-lock-icon.unlocked { background: var(--green); border-color: var(--green2); }
  .temple-numpad {
    flex: 1; display: flex; flex-direction: column; gap: 8px;
  }
  .numpad-display {
    font-family: var(--fp); font-size: 20px; color: var(--sand);
    background: var(--panel3); border: 3px solid var(--border2);
    padding: 12px 16px; text-align: center; letter-spacing: 3px;
    box-shadow: inset 2px 2px 0 0 var(--black); min-height: 52px;
  }
  .numpad-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px;
  }
  .numpad-key {
    font-family: var(--fp); font-size: 11px; color: var(--white);
    background: var(--panel2); border: 3px solid var(--border2);
    box-shadow: 3px 3px 0 0 var(--black); padding: 12px 8px;
    cursor: pointer; text-align: center; transition: all 0.06s;
  }
  .numpad-key:hover { background: var(--leather); color: var(--sand); }
  .numpad-key:active { transform: translate(2px,2px); box-shadow: 1px 1px 0 0 var(--black); }
  .numpad-key.clr { background: var(--rust); border-color: var(--rust2); font-size: 8px; }
  .numpad-key.enter { background: var(--sand2); border-color: var(--sand); color: var(--black); font-size: 8px; }
  .numpad-key.enter:hover { background: var(--sand); }

  /* ── RELIC DIG ── */
  .relic-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
  }
  .relic-choice {
    background: var(--panel2); border: 4px solid var(--border);
    box-shadow: 4px 4px 0 0 var(--black);
    padding: 18px 14px; cursor: pointer;
    display: flex; align-items: center; gap: 12px;
    transition: all 0.06s; position: relative; overflow: hidden;
  }
  .relic-choice:hover:not(.revealed) { border-color: var(--border2); background: var(--panel); }
  .relic-choice:active:not(.revealed) { transform: translate(3px,3px); box-shadow: 1px 1px 0 0 var(--black); }
  .relic-choice.revealed.correct { border-color: var(--green); background: rgba(88,200,64,0.1); box-shadow: 4px 4px 0 0 var(--green); }
  .relic-choice.revealed.wrong   { border-color: var(--red);   background: rgba(200,48,24,0.1); }
  .relic-choice.revealed.missed  { border-color: var(--green); background: rgba(88,200,64,0.06); }
  .relic-letter {
    font-family: var(--fp); font-size: 11px; color: var(--sand);
    width: 28px; height: 28px; border: 2px solid var(--sand2);
    background: rgba(200,164,86,0.12);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .relic-choice.revealed.correct .relic-letter { color:var(--green2); border-color:var(--green); background:rgba(88,200,64,0.15); }
  .relic-choice.revealed.wrong .relic-letter { color:var(--red2); border-color:var(--red); background:rgba(200,48,24,0.15); }
  .relic-num {
    font-family: var(--fp); font-size: 16px; color: var(--parch);
  }
  .relic-dust {
    position: absolute; inset: 0; pointer-events: none;
    background: repeating-linear-gradient(45deg, rgba(200,164,86,0.05) 0px, rgba(200,164,86,0.05) 2px, transparent 2px, transparent 8px);
    animation: dustSettle 0.6s steps(6) forwards;
  }
  @keyframes dustSettle { from{opacity:1} to{opacity:0} }

  /* ── IDOL MATCH (drag & drop) ── */
  .idol-equation {
    display: flex; align-items: center; justify-content: center;
    gap: 12px; flex-wrap: wrap; padding: 8px 0;
  }
  .idol-token {
    font-family: var(--fp); font-size: 18px; color: var(--parch);
    padding: 10px 14px; background: var(--panel2);
    border: 3px solid var(--border2); box-shadow: 3px 3px 0 0 var(--black);
    min-width: 52px; text-align: center;
  }
  .idol-blank {
    font-family: var(--fp); font-size: 14px; color: var(--gray);
    padding: 10px 14px; background: var(--panel3);
    border: 3px dashed var(--border2);
    min-width: 60px; text-align: center; position: relative;
    transition: border-color 0.1s;
  }
  .idol-blank.drag-over { border-color: var(--sand); background: rgba(200,164,86,0.1); }
  .idol-blank.filled {
    border-style: solid; border-color: var(--sand2);
    background: rgba(200,164,86,0.08); color: var(--sand);
  }
  .idol-blank.correct-fill { border-color: var(--green); color: var(--green2); background: rgba(88,200,64,0.1); }
  .idol-blank.wrong-fill   { border-color: var(--red);   color: var(--red2);   background: rgba(200,48,24,0.1); }
  .idol-tiles {
    display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-top: 16px;
  }
  .idol-tile {
    font-family: var(--fp); font-size: 16px; color: var(--black);
    padding: 12px 16px; background: var(--sand); border: 3px solid var(--sand2);
    box-shadow: 4px 4px 0 0 var(--sand2); cursor: grab; min-width: 56px;
    text-align: center; transition: all 0.06s; user-select: none;
  }
  .idol-tile:hover { background: var(--sand3); transform: translateY(-2px); }
  .idol-tile:active { cursor: grabbing; transform: translateY(0); }
  .idol-tile.used { opacity: 0.3; cursor: not-allowed; pointer-events: none; }
  .idol-tile.dragging { opacity: 0.5; }

  /* ── RESULT SCREEN ── */
  .result-screen {
    text-align: center; padding: 20px 0;
    animation: cardPop 0.25s steps(4);
  }
  .result-icon { margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; }
  .result-stars { display: flex; gap: 10px; justify-content: center; margin: 16px 0; }
  .result-star { opacity: 0.2; transition: opacity 0.2s; }
  .result-star.earned { opacity: 1; animation: starPop 0.3s steps(4); }
  @keyframes starPop { from{transform:scale(0)} to{transform:scale(1)} }

  /* ── MISC ── */
  .vt   { font-family: var(--fv); }
  .fp   { font-family: var(--fp); }
  .blink { animation: blink 1s step-end infinite; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  .flex { display:flex; }
  .flex-center { display:flex; align-items:center; justify-content:center; }
  .flex-between { display:flex; align-items:center; justify-content:space-between; }
  .gap-8{gap:8px} .gap-10{gap:10px} .gap-12{gap:12px}
  .mt-8{margin-top:8px} .mt-12{margin-top:12px} .mt-16{margin-top:16px}
  .w-full{width:100%}

  /* scrollbar */
  .ov-body::-webkit-scrollbar { width: 6px; }
  .ov-body::-webkit-scrollbar-track { background: var(--panel3); }
  .ov-body::-webkit-scrollbar-thumb { background: var(--border2); }
`;

// ══════════════════════════════════════════════════════════════════════════
// MINI-GAME COMPONENTS
// ══════════════════════════════════════════════════════════════════════════

// ── 1. BOULDER CHASE ──────────────────────────────────────────────────────
function BoulderChase({ problem, exprStr, correctAnswer, onResult }) {
  const DURATION = 18; // seconds
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [answer, setAnswer] = useState("");
  const [shaking, setShaking] = useState(false);
  const [done, setDone] = useState(false);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          if (!done) {
            setDone(true);
            onResult(false, null);
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  function submit(e) {
    e?.preventDefault();
    if (done) return;
    const val = parseFloat(answer);
    if (isNaN(val)) return;
    clearInterval(timerRef.current);
    setDone(true);
    onResult(val === correctAnswer, val);
  }

  function handleWrong() {
    setShaking(true);
    setAnswer("");
    setTimeout(() => setShaking(false), 400);
  }

  const pct = (timeLeft / DURATION) * 100;
  const danger = pct < 30;
  // Boulder travels from ~5% to ~70% of track
  const boulderLeft = `${5 + (1 - pct / 100) * 60}%`;

  return (
    <div>
      {/* Arena */}
      <div className="boulder-arena">
        <div className="boulder-track">
          <div className="boulder-sprite" style={{ left: boulderLeft }}>
            <div className="boulder-pixel" />
          </div>
          <div className="player-sprite">
            <Icon name="hat" size={28} color="var(--sand)" />
          </div>
        </div>
        <div
          className={`boulder-timer-bar ${danger ? "danger" : ""}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Timer label */}
      <div className="flex-between mt-8">
        <span
          style={{ fontFamily: "var(--fp)", fontSize: 7, color: "var(--gray)" }}
        >
          BOULDER DISTANCE
        </span>
        <span
          style={{
            fontFamily: "var(--fp)",
            fontSize: 8,
            color: danger ? "var(--red2)" : "var(--sand)",
          }}
        >
          {timeLeft}s
        </span>
      </div>

      {/* Dialogue */}
      <div className="dialogue-box mt-12">
        <div
          className="vt"
          style={{ fontSize: 18, color: "var(--offwhite)", lineHeight: 1.5 }}
        >
          {done
            ? "..."
            : "The boulder is gaining! Solve it FAST or get flattened!"}
        </div>
      </div>

      {/* Input */}
      <form onSubmit={submit} className="boulder-input-wrap">
        <input
          ref={inputRef}
          type="number"
          step="any"
          className={`boulder-input ${shaking ? "shake" : ""}`}
          placeholder="TYPE ANSWER FAST..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={done}
        />
        <button
          className="px-btn px-btn-gold"
          type="submit"
          disabled={done || !answer.trim()}
          style={{ fontSize: 10, padding: "12px 20px" }}
        >
          GO!
        </button>
      </form>
    </div>
  );
}

// ── 2. TEMPLE LOCK ────────────────────────────────────────────────────────
function TempleLock({ problem, exprStr, correctAnswer, onResult }) {
  const [display, setDisplay] = useState("");
  const [opening, setOpening] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [done, setDone] = useState(false);
  const maxLen = String(correctAnswer).length + 1;

  function pressKey(val) {
    if (done) return;
    if (val === "CLR") {
      setDisplay("");
      setWrong(false);
      return;
    }
    if (val === "DEL") {
      setDisplay((d) => d.slice(0, -1));
      return;
    }
    if (val === "OK") {
      submit();
      return;
    }
    if (display.length >= maxLen) return;
    setDisplay((d) => d + val);
  }

  function submit() {
    if (done || !display) return;
    const val = parseFloat(display);
    if (val === correctAnswer) {
      setOpening(true);
      setDone(true);
      setTimeout(() => onResult(true, val), 900);
    } else {
      setWrong(true);
      setDisplay("");
      setTimeout(() => setWrong(false), 600);
      setTimeout(() => onResult(false, val), 600);
    }
  }

  const keys = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "CLR", "0", "DEL"];

  return (
    <div className="temple-door-wrap">
      {/* Left door */}
      <div className="temple-door">
        <div
          className={`door-panel ${opening ? "opening-left" : ""}`}
          style={{ borderRight: "2px solid var(--border)" }}
        >
          {[0, 40, 80].map((top) => (
            <div key={top} className="door-plank" style={{ top }} />
          ))}
          <div
            className={`door-lock-icon ${opening ? "unlocked" : wrong ? "" : ""}`}
            style={{
              borderColor: wrong
                ? "var(--red)"
                : opening
                  ? "var(--green)"
                  : undefined,
              background: wrong
                ? "var(--red)"
                : opening
                  ? "var(--green)"
                  : undefined,
            }}
          >
            <Icon
              name={opening ? "check" : "lock"}
              size={18}
              color={
                opening
                  ? "var(--green2)"
                  : wrong
                    ? "var(--red2)"
                    : "var(--sand)"
              }
            />
          </div>
        </div>
        <span
          style={{ fontFamily: "var(--fp)", fontSize: 6, color: "var(--gray)" }}
        >
          DOOR A
        </span>
      </div>

      {/* Right door */}
      <div className="temple-door">
        <div
          className={`door-panel ${opening ? "opening-right" : ""}`}
          style={{ borderLeft: "2px solid var(--border)" }}
        >
          {[0, 40, 80].map((top) => (
            <div key={top} className="door-plank" style={{ top }} />
          ))}
          <div
            className={`door-lock-icon ${opening ? "unlocked" : ""}`}
            style={{
              borderColor: opening ? "var(--green)" : undefined,
              background: opening ? "var(--green)" : undefined,
            }}
          >
            <Icon
              name={opening ? "check" : "lock"}
              size={18}
              color={opening ? "var(--green2)" : "var(--sand)"}
            />
          </div>
        </div>
        <span
          style={{ fontFamily: "var(--fp)", fontSize: 6, color: "var(--gray)" }}
        >
          DOOR B
        </span>
      </div>

      {/* Numpad */}
      <div className="temple-numpad">
        <div
          className="numpad-display"
          style={{
            color: wrong
              ? "var(--red2)"
              : display
                ? "var(--sand)"
                : "var(--border2)",
          }}
        >
          {wrong ? "WRONG!" : display || "_ _ _"}
        </div>
        <div className="numpad-grid">
          {keys.map((k) => (
            <div
              key={k}
              className={`numpad-key ${k === "CLR" || k === "DEL" ? "clr" : ""}`}
              onClick={() => pressKey(k)}
            >
              {k}
            </div>
          ))}
        </div>
        <div
          className="numpad-key enter w-full mt-8"
          onClick={submit}
          style={{ marginTop: 6 }}
        >
          UNLOCK DOOR
        </div>
      </div>
    </div>
  );
}

// ── 3. RELIC DIG ─────────────────────────────────────────────────────────
function RelicDig({ problem, exprStr, correctAnswer, grade, onResult }) {
  const [choices] = useState(() =>
    generateChoices(correctAnswer, GRADE_TO_SPEC[grade]?.maxNum || 40),
  );
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const letters = ["A", "B", "C", "D"];

  function pick(val) {
    if (revealed) return;
    setSelected(val);
    setRevealed(true);
    const correct = val === correctAnswer;
    setTimeout(() => onResult(correct, val), 900);
  }

  return (
    <div>
      <div className="dialogue-box mt-8" style={{ marginBottom: 16 }}>
        <div
          className="vt"
          style={{ fontSize: 18, color: "var(--offwhite)", lineHeight: 1.5 }}
        >
          Excavate the correct answer from the rubble! Choose wisely — only one
          relic is genuine.
        </div>
      </div>
      <div className="relic-grid">
        {choices.map((val, i) => {
          let state = "";
          if (revealed) {
            if (val === correctAnswer) state = "correct";
            else if (val === selected) state = "wrong";
            else state = "missed";
          }
          return (
            <div
              key={val}
              className={`relic-choice ${revealed ? `revealed ${(state=="correct" && val==correctAnswer)?"correct" : "wrong"}` : ""}`}
              onClick={() => pick(val)}
            >
              {!revealed && <div className="relic-dust" />}
              <div className="relic-letter">{letters[i]}</div>
              <div className="relic-num">{val}</div>
              {revealed && state === "correct" && (
                <Icon name="check" size={16} color="var(--green2)" />
              )}
              {revealed && state === "wrong" && (
                <Icon name="cross" size={16} color="var(--red2)" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── 4. IDOL MATCH (drag & drop) ───────────────────────────────────────────
function IdolMatch({ problem, exprStr, correctAnswer, grade, onResult }) {
  // Build the equation as tokens with one blank slot
  // e.g. "14 + __ = 21"  or  "__ + 7 = 12"
  const spec = GRADE_TO_SPEC[grade];
  const [tiles] = useState(() => {
    const wrong = generateChoices(correctAnswer, spec?.maxNum || 40).filter(
      (v) => v !== correctAnswer,
    );
    return [correctAnswer, ...wrong.slice(0, 3)].sort(
      () => Math.random() - 0.5,
    );
  });

  const [filled, setFilled] = useState(null); // value in blank
  const [draggingTile, setDraggingTile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [usedTile, setUsedTile] = useState(null);

  // Touch drag state
  const touchTile = useRef(null);

  function handleDrop(e) {
    e.preventDefault();
    const val = parseInt(e.dataTransfer.getData("tile"), 10);
    if (!revealed) {
      setFilled(val);
      setUsedTile(val);
    }
    setDragOver(false);
    setDraggingTile(null);
  }

  function handleSubmit() {
    if (filled === null || revealed) return;
    setRevealed(true);
    const correct = filled === correctAnswer;
    setTimeout(() => onResult(correct, filled), 900);
  }

  function handleTileClick(val) {
    if (revealed) return;
    setFilled(val);
    setUsedTile(val);
  }

  const blankState = !revealed
    ? dragOver
      ? "drag-over"
      : filled !== null
        ? "filled"
        : ""
    : filled === correctAnswer
      ? "correct-fill"
      : "wrong-fill";

  return (
    <div>
      <div className="dialogue-box mt-8" style={{ marginBottom: 16 }}>
        <div
          className="vt"
          style={{ fontSize: 18, color: "var(--offwhite)", lineHeight: 1.5 }}
        >
          Drag the golden idol tile into the blank to complete the equation!
        </div>
      </div>

      {/* Equation display with blank */}
      <div
        style={{
          background: "var(--panel3)",
          border: "4px solid var(--border2)",
          padding: "20px 16px",
          boxShadow: "inset 3px 3px 0 0 rgba(0,0,0,0.4)",
        }}
      >
        <div className="idol-equation">
          <div className="idol-token">{exprStr}</div>
          <div className="idol-token">=</div>
          {/* Drop zone */}
          <div
            className={`idol-blank ${blankState}`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            {filled !== null ? filled : <span className="blink">?</span>}
            {revealed && (
              <div style={{ position: "absolute", top: -10, right: -10 }}>
                <Icon
                  name={filled === correctAnswer ? "check" : "cross"}
                  size={16}
                  color={
                    filled === correctAnswer ? "var(--green2)" : "var(--red2)"
                  }
                />
              </div>
            )}
          </div>
        </div>

        {/* Tiles */}
        <div className="idol-tiles">
          {tiles.map((val) => (
            <div
              key={val}
              className={`idol-tile ${usedTile === val ? "used" : ""} ${draggingTile === val ? "dragging" : ""}`}
              draggable={!revealed && usedTile !== val}
              onDragStart={(e) => {
                e.dataTransfer.setData("tile", val);
                setDraggingTile(val);
              }}
              onDragEnd={() => setDraggingTile(null)}
              onClick={() => handleTileClick(val)}
              title="Click or drag to place"
            >
              {val}
            </div>
          ))}
        </div>
      </div>

      <button
        className="px-btn px-btn-gold w-full mt-12"
        onClick={handleSubmit}
        disabled={filled === null || revealed}
        style={{ fontSize: 9 }}
      >
        <Icon name="idol" size={14} color="var(--black)" />
        PLACE THE IDOL
      </button>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// RESULT SCREEN
// ══════════════════════════════════════════════════════════════════════════
function ResultScreen({
  correct,
  gameName,
  exprStr,
  correctAnswer,
  userAnswer,
  onNext,
  onRetry,
}) {
  const stars = correct ? 3 : userAnswer !== null ? 1 : 0;
  return (
    <div className="result-screen">
      <div className="result-icon">
        <Icon
          name={correct ? "star" : "cross"}
          size={56}
          color={correct ? "var(--sand)" : "var(--red2)"}
        />
      </div>
      <div
        style={{
          fontFamily: "var(--fp)",
          fontSize: 14,
          color: correct ? "var(--sand)" : "var(--red2)",
          textShadow: "1px 1px 0 var(--sand2)",
          lineHeight: 1.8,
          marginBottom: 8,
        }}
      >
        {correct ? "CORRECT!" : "WRONG!"}
      </div>
      <div
        className="vt"
        style={{ fontSize: 20, color: "var(--offwhite)", marginBottom: 16 }}
      >
        {correct
          ? "The temple doors swing open. Well done, adventurer!"
          : `The answer was ${correctAnswer}. Study your relics and try again!`}
      </div>

      <div className="result-stars">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`result-star ${s <= stars ? "earned" : ""}`}
            style={{ animationDelay: `${s * 0.15}s` }}
          >
            <Icon name="star" size={36} color="var(--sand)" />
          </div>
        ))}
      </div>

      <div
        style={{
          background: "var(--panel3)",
          border: "3px solid var(--border)",
          padding: "12px 20px",
          marginBottom: 20,
          display: "inline-block",
        }}
      >
        <div
          style={{
            fontFamily: "var(--fp)",
            fontSize: 8,
            color: "var(--gray)",
            marginBottom: 6,
          }}
        >
          EQUATION
        </div>
        <div
          style={{
            fontFamily: "var(--fp)",
            fontSize: 14,
            color: "var(--parch)",
          }}
        >
          {exprStr} = {correctAnswer}
        </div>
      </div>

      <div className="flex gap-10" style={{ justifyContent: "center" }}>
        {!correct && (
          <button className="px-btn px-btn-ghost" onClick={onRetry}>
            RETRY
          </button>
        )}
        <button
          className="px-btn px-btn-gold"
          onClick={onNext}
          style={{ fontSize: 10 }}
        >
          {correct ? "NEXT PROBLEM ▶" : "CONTINUE ▶"}
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// MAIN OVERLAY COMPONENT
// ══════════════════════════════════════════════════════════════════════════
export default function ProblemOverlay({
  grade = 1,
  onClose, // called when player dismisses (e.g. back to world)
  onProblemSolved, // callback(problemId, correct, grade)
}) {
  const [problem, setProblem] = useState(() => generateProblem(grade));
  const [miniGame, setMiniGame] = useState(
    MINI_GAMES[randInt(0, MINI_GAMES.length - 1)],
  );
  const [phase, setPhase] = useState("select"); // select | play | result
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [result, setResult] = useState(null); // { correct, userAnswer }
  const [problemNum, setProblemNum] = useState(1);
  const [animKey, setAnimKey] = useState(0);

  const exprStr = exprToString(problem.expr);
  const correctAnswer = evalExpr(problem.expr);
  const exprLen = exprStr.length;
  const exprSize = exprLen > 20 ? "sz-sm" : exprLen > 12 ? "sz-md" : "sz-lg";

  // ── Start playing selected mini-game ────────────────────────────────────
  function startGame() {
    setPhase("play");
    setAnimKey((k) => k + 1);
  }

  // ── Handle mini-game result ──────────────────────────────────────────────
  function handleResult(correct, userAnswer) {
    setResult({ correct, userAnswer });
    setPhase("result");

    if (correct) {
      setScore((s) => s + (streak >= 2 ? 150 : 100));
      setStreak((s) => s + 1);
    } else {
      setLives((l) => l - 1);
      setStreak(0);
    }

    onProblemSolved?.(problem.problemId, correct, grade);
  }

  // ── Next problem ─────────────────────────────────────────────────────────
  function nextProblem() {
    if (result?.correct) {
      onClose?.();
      return;
    }

    if (lives <= 0 && !result?.correct) {
      onClose?.();
      return;
    }
    setProblem(generateProblem(grade));
    setMiniGame(MINI_GAMES[randInt(0, MINI_GAMES.length - 1)]);
    setPhase("select");
    setResult(null);
    setProblemNum((n) => n + 1);
    setAnimKey((k) => k + 1);
  }

  function retryProblem() {
    setPhase("select");
    setResult(null);
    setAnimKey((k) => k + 1);
  }

  // ── Render mini-game ─────────────────────────────────────────────────────
  function renderMiniGame() {
    const props = {
      problem,
      exprStr,
      correctAnswer,
      grade,
      onResult: handleResult,
    };
    switch (miniGame) {
      case "boulder":
        return <BoulderChase {...props} />;
      case "temple":
        return <TempleLock {...props} />;
      case "relic":
        return <RelicDig {...props} />;
      case "idol":
        return <IdolMatch {...props} />;
      default:
        return null;
    }
  }

  const mgIconMap = {
    boulder: "boulder",
    temple: "lock",
    relic: "shovel",
    idol: "idol",
  };

  return (
    <>
      <style>{STYLES}</style>
      <div
        className="overlay-backdrop"
        onClick={(e) => e.target === e.currentTarget && onClose?.()}
      >
        <div className="overlay-card">
          {/* ── HEADER ── */}
          <div className="ov-header">
            <div className="ov-game-badge">
              <Icon name={mgIconMap[miniGame]} size={16} color="var(--sand)" />
              {phase === "select"
                ? "CHOOSE YOUR CHALLENGE"
                : phase === "result"
                  ? "RESULT"
                  : MINI_GAME_LABELS[miniGame]}
            </div>

            <div className="flex gap-12" style={{ alignItems: "center" }}>
              {/* Score */}
              <div
                style={{
                  fontFamily: "var(--fp)",
                  fontSize: 8,
                  color: "var(--sand)",
                }}
              >
                {score} XP
              </div>

              {/* Streak */}
              {streak >= 2 && (
                <div
                  style={{
                    fontFamily: "var(--fp)",
                    fontSize: 7,
                    color: "var(--sand3)",
                    border: "2px solid var(--sand2)",
                    padding: "3px 7px",
                    background: "rgba(200,164,86,0.15)",
                    animation: "blink 1s step-end infinite",
                  }}
                >
                  {streak}x STREAK
                </div>
              )}

              {/* Lives */}
              <div className="ov-lives">
                {[1, 2, 3].map((i) => (
                  <Icon
                    key={i}
                    name="heart"
                    size={16}
                    color={i <= lives ? "var(--red2)" : "var(--border)"}
                  />
                ))}
              </div>

              {/* Grade */}
              <div className="ov-grade-badge">GR.{grade}</div>

              {/* Problem counter */}
              <div
                style={{
                  fontFamily: "var(--fp)",
                  fontSize: 7,
                  color: "var(--gray)",
                }}
              >
                #{problemNum}
              </div>

              {/* Close */}
              <button
                className="px-btn px-btn-ghost px-btn-sm"
                style={{ padding: "6px 10px", fontSize: 7 }}
                onClick={onClose}
              >
                ✖ FLEE
              </button>
            </div>
          </div>

          {/* ── BODY ── */}
          <div className="ov-body">
            {/* Problem Stage — always visible */}
            {phase !== "result" && (
              <div
                key={animKey}
                className="problem-stage"
                style={{ animation: "cardPop 0.2s steps(4)" }}
              >
                <div className="problem-label">★ SOLVE THIS INSCRIPTION ★</div>
                <div className={`problem-expr ${exprSize}`}>{exprStr}</div>
                <div
                  className="problem-expr sz-md"
                  style={{ color: "var(--gray)", marginTop: 8 }}
                >
                  = ?
                </div>
              </div>
            )}

            {/* SELECT PHASE — choose mini-game */}
            {phase === "select" && (
              <>
                <div
                  style={{
                    fontFamily: "var(--fp)",
                    fontSize: 7,
                    color: "var(--gray)",
                    textAlign: "center",
                    letterSpacing: "2px",
                  }}
                >
                  CHOOSE YOUR CHALLENGE MODE
                </div>
                <div className="mg-selector">
                  {MINI_GAMES.map((mg) => (
                    <div
                      key={mg}
                      className={`mg-card ${miniGame === mg ? "selected" : ""}`}
                      onClick={() => setMiniGame(mg)}
                    >
                      <Icon
                        name={mgIconMap[mg]}
                        size={28}
                        color={miniGame === mg ? "var(--sand)" : "var(--gray)"}
                      />
                      <div className="mg-card-label">
                        {MINI_GAME_LABELS[mg]}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mini-game description */}
                <div className="dialogue-box">
                  <div
                    className="flex gap-12"
                    style={{ alignItems: "flex-start" }}
                  >
                    <Icon name="hat" size={24} color="var(--sand)" />
                    <div
                      className="vt"
                      style={{
                        fontSize: 18,
                        color: "var(--offwhite)",
                        lineHeight: 1.5,
                      }}
                    >
                      {
                        {
                          boulder:
                            "A massive boulder is rolling your way! Type the answer before it flattens you. Speed is everything!",
                          temple:
                            "A locked temple door blocks your path. Use the number pad to punch in the combination and open it!",
                          relic:
                            "Four relics are buried in the rubble, but only one holds the true answer. Excavate wisely!",
                          idol: "Drag the correct golden idol tile into the blank slot to complete the ancient equation!",
                        }[miniGame]
                      }
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* PLAY PHASE — render mini-game */}
            {phase === "play" && (
              <div
                key={`play-${animKey}`}
                style={{ animation: "cardPop 0.18s steps(3)" }}
              >
                {renderMiniGame()}
              </div>
            )}

            {/* RESULT PHASE */}
            {phase === "result" && result && (
              <ResultScreen
                correct={result.correct}
                gameName={MINI_GAME_LABELS[miniGame]}
                exprStr={exprStr}
                correctAnswer={correctAnswer}
                userAnswer={result.userAnswer}
                onNext={nextProblem}
                onRetry={retryProblem}
              />
            )}
          </div>

          {/* ── FOOTER ── */}
          {phase === "select" && (
            <div className="ov-footer">
              <button
                className="px-btn px-btn-ghost"
                onClick={onClose}
                style={{ fontSize: 7 }}
              >
                <Icon name="skip" size={12} color="var(--gray)" />
                BACK TO WORLD
              </button>
              <div style={{ flex: 1 }} />
              <div
                style={{
                  fontFamily: "var(--fp)",
                  fontSize: 7,
                  color: "var(--gray)",
                }}
              >
                GR.{grade} ·{" "}
                {exprStr.length > 16 ? exprStr.slice(0, 16) + "…" : exprStr}
              </div>
              <button
                className="px-btn px-btn-gold"
                onClick={startGame}
                style={{ fontSize: 10, padding: "12px 24px" }}
              >
                <Icon name="boulder" size={14} color="var(--black)" />
                START CHALLENGE
              </button>
            </div>
          )}

          {phase === "play" && (
            <div className="ov-footer">
              <span
                style={{
                  fontFamily: "var(--fp)",
                  fontSize: 7,
                  color: "var(--gray)",
                }}
              >
                {MINI_GAME_LABELS[miniGame]}
              </span>
              <div style={{ flex: 1 }} />
              <span
                style={{
                  fontFamily: "var(--fp)",
                  fontSize: 7,
                  color: "var(--border2)",
                }}
              >
                GRADE {grade} · PROBLEM #{problemNum}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}