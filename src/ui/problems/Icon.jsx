const R = (props) => <rect {...props} />;

const Icon = ({ name, size = 16, color = "currentColor" }) => {
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

export default Icon;
