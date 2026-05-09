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

export default Icon;
