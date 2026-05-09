import { useState } from 'react';
import Icon from './Icon';

export default function LoginScreen({ onLogin }) {
  const [creating, setCreating] = useState(false);
  const role = "student";
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
