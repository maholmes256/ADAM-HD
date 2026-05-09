import { useAuth } from '../../firebase/AuthContext';
import Icon from './Icon';
import PixelBar from './PixelBar';
import QueryNotice from './QueryNotice';
import { SHOW_ACHIEVEMENTS_UI, xpForLevel } from './data';

export default function StudentDashScreen({ firebaseState }) {
  const { currentUser } = useAuth();
  const displayName = currentUser?.displayName || currentUser?.email || "Explorer";
  const email = currentUser?.email || "";
  const level = Number(currentUser?.level || 1);
  const xp = Number(currentUser?.xp || 0);
  const grade = Number(currentUser?.grade || 1);
  const currentLevelXp = xpForLevel(level);
  const nextLevelXp = xpForLevel(level + 1);
  const xpIntoLevel = Math.max(0, xp - currentLevelXp);
  const xpNeeded = nextLevelXp - currentLevelXp;
  const xpPct = Math.min(100, Math.round((xpIntoLevel / xpNeeded) * 100));

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
          {/* {SHOW_ACHIEVEMENTS_UI && (
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
          )} */}

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
