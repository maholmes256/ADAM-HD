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

export default STYLES;
