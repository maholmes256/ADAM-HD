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

export default STYLES;
